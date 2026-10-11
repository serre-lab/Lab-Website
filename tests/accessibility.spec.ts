import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const routes = [
    { path: "/#/", name: "Home" },
    { path: "/#/research", name: "Research" },
    { path: "/#/publications", name: "Publications" },
    { path: "/#/people", name: "People" },
    { path: "/#/resources", name: "Resources" },
    { path: "/#/sci-comm", name: "Media" },
    { path: "/#/lab-links", name: "Lab links" },
    { path: "/#/missing-page", name: "Not found" },
    { path: "/hmdb51.html", name: "HMDB51" },
    { path: "/breakfast-actions-dataset.html", name: "Breakfast" },
    ...readdirSync(resolve("src/markdown-pages/resources"))
        .filter((file) => file.endsWith(".md"))
        .map((file) => ({ path: `/#/resources/${file.slice(0, -3)}`, name: file.slice(0, -3) })),
];

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

test.describe("WCAG 2.1 AA accessibility", () => {
    for (const route of routes) {
        test(`${route.name} has no automatically-detectable a11y violations`, async ({ page }) => {
            await page.goto(route.path);
            // Wait for lazy-loaded content to render
            await page.waitForLoadState("networkidle");
            await page.getByRole("heading", { level: 1 }).first().waitFor();

            await page.locator("main img").evaluateAll(images => images.forEach(image => { (image as HTMLImageElement).loading = "eager"; }));
            await expect.poll(() => page.locator("main img").evaluateAll(images => images.filter(image => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0).map(image => (image as HTMLImageElement).src)), { message: `${route.name}: images load`, timeout: 10000 }).toEqual([]);
            const results = await new AxeBuilder({ page })
                .withTags(WCAG_TAGS)
                .analyze();

            if (results.violations.length > 0) {
                console.log(`\n=== ${route.name} (${route.path}) violations ===`);
                for (const v of results.violations) {
                    console.log(`\n[${v.impact}] ${v.id}: ${v.help}`);
                    console.log(`  ${v.helpUrl}`);
                    for (const node of v.nodes) {
                        console.log(`  - ${node.target.join(" ")}`);
                        console.log(`    ${node.failureSummary?.replace(/\n/g, "\n    ")}`);
                    }
                }
            }

            expect(results.violations, `${route.name} a11y violations`).toEqual([]);
        });
    }

    test("exactly one h1 per page", async ({ page }) => {
        for (const route of routes) {
            await page.goto(route.path);
            await page.waitForLoadState("networkidle");
            // Wait for lazy-loaded route content to mount before counting
            await page.getByRole("heading", { level: 1 }).first().waitFor();
            await expect(page.getByRole("heading", { level: 1 }), `${route.name} should have exactly one <h1>`).toHaveCount(1);
        }
    });

    test("heading levels never skip", async ({ page }) => {
        for (const route of routes) {
            await page.goto(route.path);
            await page.waitForLoadState("networkidle");
            await page.getByRole("heading", { level: 1 }).first().waitFor();
            const levels = await page.$$eval(
                "h1, h2, h3, h4, h5, h6",
                (els) => els.map((el) => parseInt(el.tagName.substring(1), 10))
            );
            let prev = 0;
            for (const lvl of levels) {
                if (prev !== 0) {
                    expect(
                        lvl,
                        `${route.name}: heading jumped from h${prev} to h${lvl}`
                    ).toBeLessThanOrEqual(prev + 1);
                }
                prev = lvl;
            }
        }
    });
});

// Reflow and user text-spacing overrides must not hide or push content offscreen.
for (const route of routes) {
    test(`${route.name} reflows at 320px with enlarged and spaced text`, async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 800 });
        await page.goto(route.path);
        await page.getByRole("heading", { level: 1 }).first().waitFor();
        await page.waitForLoadState("networkidle");
        const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(await overflow(), "320px reflow").toBeLessThanOrEqual(1);
        await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
        expect(await overflow(), "200% text resize").toBeLessThanOrEqual(1);
        await page.addStyleTag({ content: "* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }" });
        expect(await overflow(), "WCAG text spacing").toBeLessThanOrEqual(1);
    });
}


test("publication typography agrees across the homepage and bibliography", async ({ page }) => {
    const styles = async () => page.locator(".publication-entry").first().evaluate((entry) =>
        [".publication-link", ".publication-journal", ".publication-authors"].map(selector => {
            const style = getComputedStyle(entry.querySelector(selector)!);
            return [style.fontFamily, style.fontSize, style.fontWeight, style.fontStyle, style.color];
        }));
    await page.goto("/#/");
    await page.locator(".publication-entry").first().waitFor();
    const home = await styles();
    await page.goto("/#/publications");
    await page.getByLabel("Search publications").fill("Not too generative");
    await expect(page.locator(".publication-entry")).toHaveCount(1);
    expect(await styles()).toEqual(home);
});

test("legacy animations are stopped initially and controlled with the keyboard", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#/resources/learning-sparse-prototypes-for-crowd-perception");
    const figures = page.locator(".animation-figure");
    await expect(figures).toHaveCount(2);
    const image = figures.first().locator("img");
    const button = figures.first().getByRole("button");
    await expect(image).toHaveAttribute("src", /-still\.png$/);
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(image).toHaveAttribute("src", /\.gif$/);
    await page.keyboard.press("Space");
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await expect(image).toHaveAttribute("src", /-still\.png$/);
    await expect(page.getByRole("columnheader", { name: "AUC", exact: true })).toBeVisible();
});

test("legacy tables expose headers and allow keyboard scrolling", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/#/resources/computational-mechanisms-of-color-processing");
    await expect(page.getByRole("table")).toHaveCount(5);
    const region = page.getByRole("region", { name: "Research data table" }).first();
    await region.focus();
    await page.keyboard.press("ArrowRight");
    await expect(region).toBeFocused();
    await expect.poll(() => region.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    await expect(page.getByRole("columnheader", { name: "Soccer: color", exact: true })).toBeAttached();
});

test("standalone datasets have landmarks and a working keyboard skip link", async ({ page }) => {
    for (const path of ["/hmdb51.html", "/breakfast-actions-dataset.html"]) {
        await page.goto(path);
        await expect(page.getByRole("banner")).toHaveCount(1);
        await expect(page.getByRole("main")).toHaveCount(1);
        await expect(page.getByRole("contentinfo")).toHaveCount(1);
        await page.keyboard.press("Tab");
        await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page.getByRole("main")).toBeFocused();
    }
});
