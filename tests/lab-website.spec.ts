import { test, expect } from "@playwright/test";

test.describe("Lab website", () => {
    test("homepage loads and has title", async ({ page }) => {
        await page.goto("/#/");
        await expect(page).toHaveTitle(/Serre|Lab|Brown/i);
    });

    test("navigation to main pages works", async ({ page }) => {
        await page.goto("/#/");
        await page.getByRole("link", { name: /research/i }).first().click();
        await expect(page.getByRole("heading", { level: 1 })).toContainText(/research/i);

        await page.getByRole("link", { name: /publications/i }).first().click();
        await expect(page.getByRole("heading", { level: 1 })).toContainText(/publications/i);

        await page.getByRole("link", { name: /people/i }).first().click();
        await expect(page.getByRole("heading", { level: 1 })).toContainText(/people/i);

        await page.getByRole("link", { name: /resources/i }).first().click();
        await expect(page.getByRole("heading", { level: 1 })).toContainText(/resources/i);
    });

    test("publications page shows publications", async ({ page }) => {
        await page.goto("/#/publications");
        await expect(page.getByRole("heading", { level: 1 })).toContainText(/publications/i);
        const yearHeadings = page.getByRole("heading", { level: 2 });
        await expect(yearHeadings.first()).toBeVisible();
    });

    test("people page shows people", async ({ page }) => {
        await page.goto("/#/people");
        await expect(page.getByRole("heading", { level: 1 })).toContainText(/people/i);
    });
});
