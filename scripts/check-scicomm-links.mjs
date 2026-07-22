// Check the Media / News article links in src/data/scicomm.json.
// News titles on the site are lab-written summaries, so this focuses on
// reachability (dead vs live links) with a loose title-overlap signal.
//
// Usage: node scripts/check-scicomm-links.mjs

import fs from "fs";

const CONCURRENCY = 4;
const TIMEOUT_MS = 20000;
const UA =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
    "(KHTML, like Gecko) Chrome/125.0 Safari/537.36";

const items = JSON.parse(fs.readFileSync("src/data/scicomm.json", "utf8"));

function decode(s) {
    return (s || "")
        .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;|&#x27;/g, "'")
        .replace(/&#8217;|&#x2019;/g, "'").replace(/&#8216;/g, "'")
        .replace(/&nbsp;/g, " ");
}
function norm(s) {
    return decode(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
const STOP = new Set(["a","an","the","of","for","and","in","on","to","with","is","via","how","why","at","by","as","new","study","research","brown","university"]);
function overlap(siteTitle, pageText) {
    const toks = norm(siteTitle).split(" ").filter((t) => t && !STOP.has(t));
    if (!toks.length) return 1;
    const hay = " " + norm(pageText) + " ";
    let f = 0;
    for (const t of toks) if (hay.includes(" " + t + " ")) f++;
    return f / toks.length;
}
function extractTitle(html) {
    const og = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
    if (og) return decode(og[1].trim());
    const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    return t ? decode(t[1].replace(/\s+/g, " ").trim()) : "";
}
function looksLikeChallenge(t) {
    return /Client Challenge|Verifying your browser|Bot Manager Captcha|Just a moment|Checking your browser|Attention Required|enable javascript|not a robot/i.test(t || "");
}

async function httpGet(url) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
        const res = await fetch(url, {
            redirect: "follow",
            signal: ctrl.signal,
            headers: {
                "User-Agent": UA,
                Accept: "text/html,application/xhtml+xml",
                "Accept-Language": "en-US,en;q=0.9",
            },
        });
        const body = await res.text();
        return { status: res.status, finalUrl: res.url, body };
    } catch (e) {
        return { status: 0, error: e.name === "AbortError" ? "timeout" : String(e) };
    } finally {
        clearTimeout(timer);
    }
}

const results = [];
let idx = 0;
async function worker() {
    while (idx < items.length) {
        const it = items[idx++];
        const r = await httpGet(it.link);
        let verdict, pageTitle, score;
        if (r.status === 0) verdict = "UNREACHABLE";
        else if (r.status === 404 || r.status === 410) verdict = "BROKEN";
        else if (r.status >= 500) verdict = "SERVER_ERR";
        else if (r.status === 403 || r.status === 401 || r.status === 429) verdict = "BLOCKED";
        else if (!r.body || looksLikeChallenge(r.body)) verdict = "BLOCKED";
        else {
            pageTitle = extractTitle(r.body);
            score = overlap(it.title, pageTitle);
            if (!pageTitle) verdict = "BLOCKED";
            else if (score >= 0.5) verdict = "OK";
            else if (score >= 0.25) verdict = "PARTIAL";
            else verdict = "LOW_MATCH";
        }
        const redirected = r.finalUrl && r.finalUrl.replace(/\/$/, "") !== it.link.replace(/\/$/, "");
        results.push({
            siteTitle: it.title,
            link: it.link,
            status: r.status,
            finalUrl: r.finalUrl,
            redirected,
            verdict,
            pageTitle,
            score,
            error: r.error,
        });
        process.stderr.write(`[${results.length}/${items.length}] ${verdict} ${it.link}\n`);
    }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const order = ["BROKEN", "UNREACHABLE", "SERVER_ERR", "LOW_MATCH", "PARTIAL", "BLOCKED", "OK"];
results.sort((a, b) => order.indexOf(a.verdict) - order.indexOf(b.verdict));
const by = (v) => results.filter((r) => r.verdict === v);

console.log("\n================ MEDIA / NEWS LINK REPORT ================\n");
console.log(`Total media items: ${items.length}`);
for (const v of order) console.log(`  ${v.padEnd(12)} ${by(v).length}`);

for (const v of ["BROKEN", "UNREACHABLE", "SERVER_ERR", "LOW_MATCH", "PARTIAL"]) {
    const rows = by(v);
    if (!rows.length) continue;
    console.log(`\n---------- ${v} (${rows.length}) ----------`);
    for (const r of rows) {
        console.log(`\n• site : ${r.siteTitle}`);
        console.log(`  url  : ${r.link}`);
        console.log(`  http : ${r.status}${r.error ? " (" + r.error + ")" : ""}${r.redirected ? "  -> " + r.finalUrl : ""}`);
        console.log(`  page : ${r.pageTitle ?? ""}  (score ${r.score !== undefined ? r.score.toFixed(2) : "n/a"})`);
    }
}

console.log(`\n---------- REDIRECTED (${results.filter(r=>r.redirected).length}) [link works but URL moved] ----------`);
for (const r of results.filter((r) => r.redirected))
    console.log(`  ${r.link}\n     -> ${r.finalUrl}`);

console.log(`\n---------- BLOCKED (${by("BLOCKED").length}) [could not verify content] ----------`);
for (const r of by("BLOCKED")) console.log(`  [${r.status}] ${r.link}`);

fs.writeFileSync("/tmp/scicomm_link_report.json", JSON.stringify(results, null, 2));
console.log("\nFull JSON: /tmp/scicomm_link_report.json");
