import { test, expect } from '@playwright/test';

for (const viewport of [{width: 1280, height: 900}, {width: 390, height: 844}]) {
  test.describe(`Audit interactions at ${viewport.width}px`, () => {
    test.use({viewport, reducedMotion: 'reduce'});
    test('onboarding expands with the keyboard and a bio restores focus on close', async ({page}) => {
      await page.goto('/#/');
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', {name: 'Skip to main content'})).toBeFocused();
      await page.keyboard.press('Enter');
      const button = page.locator('button[aria-controls="undergrad-requirements"]');
      await button.focus();
      await page.keyboard.press('Enter');
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#undergrad-requirements')).toBeVisible();
      await page.keyboard.press('Space');
      await expect(button).toHaveAttribute('aria-expanded', 'false');
      await page.goto('/#/people');
      const bio = page.getByRole('button', {name: 'View bio for Madeleine Fenner'});
      await bio.focus();
      await page.keyboard.press('Enter');
      await expect(page.getByRole('dialog', {name: 'Madeleine Fenner'})).toBeVisible();
      await expect(page.getByRole('dialog')).toContainText('visual perspective taking and robotics');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(bio).toBeFocused();
    });
    test('selected publications keep equal card sizes', async ({page}) => {
      await page.goto('/#/');
      const cards = page.locator('.highlights-grid .highlight-card');
      await expect(cards).toHaveCount(6);
      await cards.first().scrollIntoViewIfNeeded();
      const sizes = await cards.evaluateAll((items) => items.map((item) => {
        const {width, height} = item.getBoundingClientRect();
        return {width, height};
      }));
      for (const size of sizes) {
        expect(Math.abs(size.width - sizes[0].width)).toBeLessThan(1);
        expect(Math.abs(size.height - sizes[0].height)).toBeLessThan(1);
      }
    });
    test('main pages fit the viewport and legacy resources resolve', async ({page}) => {
      for (const route of ['/', '/research', '/people', '/resources', '/publications', '/sci-comm']) {
        await page.goto(`/#${route}`);
        await expect(page.getByRole('heading', {level: 1})).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
        expect(overflow, route).toBe(false);
      }
      await page.goto('/#/resources/a-neuromorphic-approach-to-computer-vision');
      const illustration = page.getByRole('img', {name: /Hierarchy of simple units/});
      await expect(illustration).toBeVisible();
      await expect.poll(() => illustration.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      await page.goto('/#/resources/automated-system-for-rodent-behavioral-phenotyping');
      await expect(page.getByText('The clipped and full annotated rodent-video archives', {exact: false})).toBeVisible();
      await expect(page.locator('a[href$=".zip"]')).toHaveCount(0);
    });
  });
}
