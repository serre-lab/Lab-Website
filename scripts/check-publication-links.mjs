// Verify that each publication's on-site link points to a page whose title
// matches the title shown on the lab website.
//
// Resolves the link exactly like src/pages/Publications/Publications.jsx:
//   1. officialPublicationUrls[title]  (case-insensitive)  wins
//   2. else pub.url if it is not a local PDF / /papers/ / /publications
//   3. else no link (rendered as plain text)
//
// For each resolved URL it fetches the page, extracts the publisher's title
// (citation_title > og:title > <title>) and compares it to the site title.
//
// Usage: node scripts/check-publication-links.mjs [--limit N] [--only-mismatch]

import fs from "fs";

const CONCURRENCY = 3;
const TIMEOUT_MS = 20000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/125.0 Safari/537.36";

const pubs = JSON.parse(
    fs.readFileSync("src/data/publications_by_year.json", "utf8")
);

// Parse officialPublicationUrls.js
const officialSrc = fs.readFileSync(
    "src/data/officialPublicationUrls.js",
    "utf8"
);
const m = officialSrc.match(/export const officialPublicationUrls = (\{[\s\S]*?\n\});/);
let official = {};
if (m) official = eval("(" + m[1] + ")");
const officialLower = Object.fromEntries(
    Object.entries(official).map(([k, v]) => [k.toLowerCase(), v])
);

function resolveUrl(pub) {
    const mapped = official[pub.title] ?? officialLower[pub.title?.toLowerCase()];
    if (mapped) return mapped;
    if (
        pub.url &&
        !pub.url.endsWith(".pdf") &&
        !pub.url.includes("/papers/") &&
        pub.url !== "/publications"
    )
        return pub.url;
    return null;
}

function decode(s) {
    return (s || "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;|&apos;|&#x27;/g, "'")
        .replace(/&#x2010;|&#8208;/g, "-")
        .replace(/&nbsp;/g, " ");
}

function norm(s) {
    return decode(s)
        .toLowerCase()
        .replace(/[\u2010-\u2015\u2212]/g, "-") // dashes
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

const STOP = new Set(["a", "an", "the", "of", "for", "and", "in", "on", "to", "with", "is", "via"]);

function overlap(siteTitle, pageText) {
    const siteTokens = norm(siteTitle).split(" ").filter((t) => t && !STOP.has(t));
    if (siteTokens.length === 0) return 1;
    const hay = " " + norm(pageText) + " ";
    let found = 0;
    for (const t of siteTokens) if (hay.includes(" " + t + " ")) found++;
    return found / siteTokens.length;
}

function extractTitles(html) {
    const grab = (re) => {
        const mm = html.match(re);
        return mm ? decode(mm[1].trim()) : null;
    };
    const citation = grab(
        /<meta[^>]+name=["']citation_title["'][^>]+content=["']([^"']+)["']/i
    ) || grab(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']citation_title["']/i);
    const og = grab(
        /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i
    ) || grab(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i);
    const title = grab(/<title[^>]*>([\s\S]*?)<\/title>/i);
    return { citation, og, title };
}

async function httpGetOnce(url, headers = {}) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
        const res = await fetch(url, {
            redirect: "follow",
            signal: ctrl.signal,
            headers: {
                "User-Agent": UA,
                Accept: "text/html,application/xhtml+xml,application/json",
                "Accept-Language": "en-US,en;q=0.9",
                ...headers,
            },
        });
        const body = await res.text();
        return { status: res.status, body };
    } catch (e) {
        return { status: 0, error: e.name === "AbortError" ? "timeout" : String(e) };
    } finally {
        clearTimeout(timer);
    }
}

// Retry on transient rate-limiting (429) / server errors (503).
async function httpGet(url, headers = {}) {
    const backoff = [800, 2500, 5000];
    let r;
    for (let i = 0; i <= backoff.length; i++) {
        r = await httpGetOnce(url, headers);
        if (r.status !== 429 && r.status !== 503) return r;
        if (i < backoff.length) await sleep(backoff[i]);
    }
    return r;
}

function looksLikeChallenge(text) {
    return /Client Challenge|Verifying your browser|Bot Manager Captcha|Just a moment|Checking your browser|Attention Required/i.test(
        text || ""
    );
}

// --- DOI-based verification via Crossref (not bot-blocked) ---
function doiFromUrl(u) {
    let m = u.match(/nature\.com\/articles\/([^/?#]+)/i);
    if (m) return "10.1038/" + m[1];
    m = u.match(/(10\.\d{4,9}\/[^\s"'?#]+)/); // generic DOI in path/query
    if (m) return decodeURIComponent(m[1].replace(/[.)]+$/, ""));
    return null;
}

async function titleFromCrossref(doi) {
    const r = await httpGet(
        `https://api.crossref.org/works/${encodeURIComponent(doi)}?mailto=serre-lab@brown.edu`
    );
    if (r.status !== 200 || !r.body) return null;
    try {
        const j = JSON.parse(r.body);
        const t = j?.message?.title?.[0];
        return t ? { source: "crossref", title: t } : null;
    } catch {
        return null;
    }
}

// --- OpenReview verification via its API ---
function openreviewId(u) {
    const m = u.match(/openreview\.net\/(?:forum|pdf)\?[^#]*\bid=([^&#]+)/i);
    return m ? m[1] : null;
}
async function titleFromOpenReview(id) {
    for (const base of ["https://api2.openreview.net", "https://api.openreview.net"]) {
        const r = await httpGet(`${base}/notes?id=${encodeURIComponent(id)}`);
        if (r.status !== 200 || !r.body) continue;
        try {
            const j = JSON.parse(r.body);
            const note = j?.notes?.[0];
            const t = note?.content?.title?.value ?? note?.content?.title;
            if (t) return { source: "openreview", title: t };
        } catch {
            /* try next */
        }
    }
    return null;
}

// --- arXiv verification via export API ---
function arxivId(u) {
    const m = u.match(/arxiv\.org\/(?:abs|pdf)\/([0-9]+\.[0-9]+)/i);
    return m ? m[1] : null;
}
async function titleFromArxiv(id) {
    const r = await httpGet(`http://export.arxiv.org/api/query?id_list=${id}`);
    if (r.status !== 200 || !r.body) return null;
    const m = r.body.match(/<entry>[\s\S]*?<title>([\s\S]*?)<\/title>/i);
    return m ? { source: "arxiv", title: m[1].replace(/\s+/g, " ").trim() } : null;
}

async function fetchUrl(url) {
    // 1. Structured APIs first (reliable, not bot-blocked)
    const orId = openreviewId(url);
    if (orId) {
        const t = await titleFromOpenReview(orId);
        if (t) return { status: 200, api: t };
    }
    const axId = arxivId(url);
    if (axId) {
        const t = await titleFromArxiv(axId);
        if (t) return { status: 200, api: t };
    }
    const doi = doiFromUrl(url);
    if (doi) {
        const t = await titleFromCrossref(doi);
        if (t) return { status: 200, api: t };
    }
    // 2. Fall back to fetching the page HTML
    const r = await httpGet(url);
    return { status: r.status, html: r.body, error: r.error };
}

// Build task list
const tasks = [];
for (const [year, list] of Object.entries(pubs)) {
    for (const pub of list) {
        const url = resolveUrl(pub);
        tasks.push({ year, title: pub.title, url });
    }
}

const args = process.argv.slice(2);
const limit = args.includes("--limit")
    ? parseInt(args[args.indexOf("--limit") + 1], 10)
    : Infinity;
const onlyMismatch = args.includes("--only-mismatch");

const withUrl = tasks.filter((t) => t.url).slice(0, limit);
const noUrl = tasks.filter((t) => !t.url);

const results = [];
let idx = 0;
async function worker() {
    while (idx < withUrl.length) {
        const t = withUrl[idx++];
        const r = await fetchUrl(t.url);
        let verdict, best, score, source;
        if (r.api) {
            score = overlap(t.title, r.api.title);
            best = r.api.title;
            source = r.api.source;
            if (score >= 0.7) verdict = "OK";
            else if (score >= 0.4) verdict = "PARTIAL";
            else verdict = "MISMATCH";
        } else if (r.status === 0) {
            verdict = "UNREACHABLE";
        } else if (r.status === 404 || r.status === 410) {
            verdict = "BROKEN";
        } else if (
            r.status === 403 ||
            r.status === 401 ||
            r.status === 429 ||
            r.status === 202 // IEEE serves a JS bot-wall with 202
        ) {
            verdict = "BLOCKED";
        } else if (!r.html || r.html.length < 50 || looksLikeChallenge(r.html)) {
            verdict = "BLOCKED";
        } else {
            const { citation, og, title } = extractTitles(r.html);
            const cands = [citation, og, title].filter(Boolean);
            score = 0;
            for (const c of cands) score = Math.max(score, overlap(t.title, c));
            best = citation || og || title || "";
            source = "html";
            if (!best) verdict = "BLOCKED"; // no title metadata -> can't verify
            else if (score >= 0.7) verdict = "OK";
            else if (score >= 0.4) verdict = "PARTIAL";
            else verdict = "MISMATCH";
        }
        results.push({ ...t, status: r.status, verdict, score, best, source, error: r.error });
        process.stderr.write(
            `[${results.length}/${withUrl.length}] ${verdict} ${t.url}\n`
        );
    }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

// Report
const by = (v) => results.filter((r) => r.verdict === v);
const order = ["MISMATCH", "PARTIAL", "BROKEN", "UNREACHABLE", "BLOCKED", "OK"];
results.sort((a, b) => order.indexOf(a.verdict) - order.indexOf(b.verdict));

console.log("\n================ PUBLICATION LINK REPORT ================\n");
console.log(`Total publications:       ${tasks.length}`);
console.log(`With on-site link:        ${tasks.length - noUrl.length}`);
console.log(`Without link (plain text):${noUrl.length}`);
console.log(`Checked:                  ${withUrl.length}`);
for (const v of order) console.log(`  ${v.padEnd(12)} ${by(v).length}`);

for (const v of ["MISMATCH", "PARTIAL", "BROKEN", "UNREACHABLE"]) {
    const rows = by(v);
    if (!rows.length) continue;
    console.log(`\n---------- ${v} (${rows.length}) ----------`);
    for (const r of rows) {
        console.log(`\n• [${r.year}] ${r.title}`);
        console.log(`  url:  ${r.url}`);
        console.log(`  http: ${r.status}${r.error ? " (" + r.error + ")" : ""}`);
        if (r.best !== undefined)
            console.log(`  page: [${r.source}] ${r.best}  (score ${r.score?.toFixed(2)})`);
    }
}

if (!onlyMismatch) {
    console.log(`\n---------- BLOCKED (${by("BLOCKED").length}) [could not verify, publisher blocked bot] ----------`);
    for (const r of by("BLOCKED")) console.log(`  [${r.year}] ${r.title}  <- ${r.url}`);
}

fs.writeFileSync(
    "/tmp/publication_link_report.json",
    JSON.stringify(results, null, 2)
);
console.log("\nFull JSON: /tmp/publication_link_report.json");
