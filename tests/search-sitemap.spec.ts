import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE = "https://serre.lab.brown.edu";
const STATIC_ROUTES = ["/", "/research", "/publications", "/people", "/resources", "/lab-links", "/sci-comm"];
const UNLISTED = new Set(["/resources/joining-the-lab"]);
const STANDALONE_PAGES = ["/hmdb51.html", "/breakfast-actions-dataset.html"];
const STALE_LOCS = [
    `${BASE}/#/resources/joining-the-lab`,
    `${BASE}/#/resources/a-feedforward-architecture-accounts-for-rapid-categorization`,
    `${BASE}/#/resources/action-recognition`,
    `${BASE}/#/resources/color-processing`,
    `${BASE}/#/resources/faculty-with-computational-neuroscience-research`,
    `${BASE}/#/resources/hmdb-a-large-human-motion-database`,
    `${BASE}/#/resources/lab-github-repository`,
    `${BASE}/#/resources/object-recognition`,
    `${BASE}/#/resources/recommended-coursework-for-undergraduate-students`,
];

function hashLoc(routePath: string) {
    return routePath === "/" ? `${BASE}/` : `${BASE}/#${routePath}`;
}

function markdownRoutes(dir: string, base = ""): string[] {
    const routes: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const relative = base ? `${base}/${entry.name}` : entry.name;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            routes.push(...markdownRoutes(full, relative));
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
            routes.push(`/${relative.replace(/\.md$/, "")}`);
        }
    }
    return routes;
}

function yearRank(label: string) {
    if (label === "Work in progress") return 10000;
    if (label === "In press") return 9999;
    const year = Number.parseInt(label, 10);
    expect(Number.isNaN(year), `unexpected year heading "${label}"`).toBe(false);
    return year;
}

test.describe("publication and media search", () => {
    test("publications search is a trimmed substring and keeps year order", async ({ page }) => {
        const pageErrors: string[] = [];
        page.on("pageerror", (error) => pageErrors.push(error.message));

        await page.goto("/#/publications");
        await expect(page.getByRole("heading", { level: 1 })).toContainText(/publications/i);
        await expect(page.getByLabel("Search publications")).toBeVisible();
        await expect(page.getByRole("textbox", { name: "Filter by year" })).toBeVisible();

        const unfilteredYears = await page.locator("h2.year-heading").allTextContents();
        expect(unfilteredYears.length).toBeGreaterThan(1);

        await page.getByLabel("Search publications").fill("  Ser  ");
        const status = page.getByRole("status");
        await expect(status).toContainText(/Showing \d+ publications\./);
        await expect(page.locator(".publication-authors").first()).toBeVisible();

        const shown = Number((await status.innerText()).match(/Showing (\d+)/)?.[1]);
        expect(shown).toBeGreaterThan(0);
        await expect(page.locator(".publication-item")).toHaveCount(shown);
        await expect(page.locator(".results-section")).toContainText(/Serre/);

        const filteredYears = await page.locator("h2.year-heading").allTextContents();
        expect(filteredYears.length).toBeGreaterThan(0);
        let cursor = 0;
        for (const year of filteredYears) {
            const at = unfilteredYears.indexOf(year, cursor);
            expect(at, `${year} should keep its original order`).toBeGreaterThanOrEqual(0);
            cursor = at + 1;
        }
        for (let i = 1; i < filteredYears.length; i++) {
            expect(yearRank(filteredYears[i - 1])).toBeGreaterThan(yearRank(filteredYears[i]));
        }

        await page.getByLabel("Search publications").fill("(.*+?");
        await expect(status).toBeVisible();
        expect(pageErrors).toEqual([]);

        await page.getByLabel("Search publications").fill("qqqq-no-such-publication");
        await expect(status).toContainText('No publications match "qqqq-no-such-publication".');
        await expect(page.locator("h2.year-heading")).toHaveCount(0);
        await expect(page.locator(".publication-item")).toHaveCount(0);
    });

    test("year filter limits headings and canonical url beats a stale override", async ({ page }) => {
        await page.goto("/#/publications");
        await page.getByLabel("Search publications").fill("");
        await page.getByRole("textbox", { name: "Filter by year" }).click();
        await page.getByRole("option", { name: "2024", exact: true }).click();
        await expect(page.locator("h2.year-heading")).toHaveText(["2024"]);
        await expect(page.getByRole("status")).toContainText(/Showing \d+ publications?\./);

        await page.getByRole("textbox", { name: "Filter by year" }).click();
        await page.getByRole("option", { name: "All", exact: true }).click();
        await page.getByLabel("Search publications").fill("Choosing the right basis");
        const link = page.getByRole("link", { name: /Choosing the right basis/i });
        await expect(link).toHaveAttribute("href", "https://openreview.net/forum?id=vb57jDotru");
        await expect(link).not.toHaveAttribute("href", /arxiv\.org/);

        await page.getByLabel("Search publications").fill("NeuroSurgeon");
        await expect(page.getByRole("heading", { level: 3, name: /NeuroSurgeon/ })).toBeVisible();
        await expect(page.getByRole("link", { name: /NeuroSurgeon/ })).toHaveCount(0);
    });

    test("media search matches substrings and announces an empty state", async ({ page }) => {
        const pageErrors: string[] = [];
        page.on("pageerror", (error) => pageErrors.push(error.message));

        await page.goto("/#/sci-comm");
        await expect(page.getByRole("heading", { level: 1 })).toContainText(/media/i);
        await expect(page.getByLabel("Search media")).toBeVisible();

        await page.getByLabel("Search media").fill("  Lepo  ");
        const status = page.getByRole("status");
        await expect(status).toContainText(/Showing \d+ items?\./);
        const shown = Number((await status.innerText()).match(/Showing (\d+)/)?.[1]);
        expect(shown).toBeGreaterThan(0);
        await expect(page.locator(".media-card")).toHaveCount(shown);
        await expect(page.locator(".media-grid")).toContainText(/Lepori/);

        await page.getByLabel("Search media").fill("(.*+?");
        await expect(status).toBeVisible();
        expect(pageErrors).toEqual([]);

        await page.getByLabel("Search media").fill("qqqq-no-such-media");
        await expect(status).toContainText('No media coverage matches "qqqq-no-such-media".');
        await expect(page.locator(".media-card")).toHaveCount(0);
    });
});

test.describe("sitemap", () => {
    test("lists registered hash routes and standalone dataset pages only", () => {
        const markdownDir = path.join(process.cwd(), "src/markdown-pages");
        const xml = fs.readFileSync(path.join(process.cwd(), "public/sitemap.xml"), "utf8");

        expect(xml).not.toContain("<lastmod>");
        for (const stale of STALE_LOCS) {
            expect(xml, stale).not.toContain(stale);
        }

        const expected = new Set<string>([
            ...STATIC_ROUTES.map(hashLoc),
            ...markdownRoutes(markdownDir)
                .filter((route) => !UNLISTED.has(route))
                .map(hashLoc),
            ...STANDALONE_PAGES.map((page) => `${BASE}${page}`),
        ]);

        const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
        expect(new Set(locs)).toEqual(expected);
        expect(locs).toHaveLength(expected.size);

        for (const page of STANDALONE_PAGES) {
            expect(fs.existsSync(path.join(process.cwd(), "public", page))).toBe(true);
            expect(locs).toContain(`${BASE}${page}`);
            expect(locs).not.toContain(`${BASE}/#${page}`);
        }

        expect(locs).toContain(`${BASE}/#/resources/the-breakfast-actions-dataset`);
        expect(locs).not.toContain(`${BASE}/#/resources/joining-the-lab`);
    });
});
