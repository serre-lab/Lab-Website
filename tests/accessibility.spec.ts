import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
    { path: "/#/", name: "Home" },
    { path: "/#/research", name: "Research" },
    { path: "/#/publications", name: "Publications" },
    { path: "/#/people", name: "People" },
    { path: "/#/resources", name: "Resources" },
    { path: "/#/sci-comm", name: "Media" },
];

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

test.describe("WCAG 2.1 AA accessibility", () => {
    for (const route of routes) {
        test(`${route.name} has no automatically-detectable a11y violations`, async ({ page }) => {
            await page.goto(route.path);
            // Wait for lazy-loaded content to render
            await page.waitForLoadState("networkidle");
            await page.getByRole("heading", { level: 1 }).first().waitFor();

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
            const h1count = await page.getByRole("heading", { level: 1 }).count();
            expect(h1count, `${route.name} should have exactly one <h1>`).toBe(1);
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
