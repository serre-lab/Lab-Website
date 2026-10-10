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
    test('homepage lists follow one column and selected publications keep equal sizes', async ({page}) => {
      await page.goto('/#/');
      const cards = page.locator('.selected-publications-list .publication-item');
      await expect(cards).toHaveCount(6);
      await cards.first().scrollIntoViewIfNeeded();
      for (const selector of ['.selected-publications-list .publication-item', '.home-container .featured-card', '.student-card']) {
        const rows = await page.locator(selector).evaluateAll(items => items.map(item => {
          const {left, top, bottom} = item.getBoundingClientRect();
          return {left, top, bottom};
        }));
        for (let i = 1; i < rows.length; i++) {
          expect(Math.abs(rows[i].left - rows[0].left)).toBeLessThan(1);
          expect(rows[i].top).toBeGreaterThanOrEqual(rows[i - 1].bottom - 1);
        }
      }
      if (viewport.width <= 600) {
        for (const selector of ['.student-card', '.home-container .featured-content']) {
          const entries = await page.locator(selector).evaluateAll(items => items.map(item => {
            const heading = item.querySelector('h3')!.getBoundingClientRect();
            const text = item.querySelector('p')!.getBoundingClientRect();
            return {headingLeft: heading.left, headingBottom: heading.bottom, textLeft: text.left, textTop: text.top};
          }));
          for (const entry of entries) {
            expect(Math.abs(entry.headingLeft - entry.textLeft)).toBeLessThan(1);
            expect(entry.textTop).toBeGreaterThanOrEqual(entry.headingBottom);
          }
        }
      }
      const sizes = await cards.evaluateAll((items) => items.map((item) => {
        const {width, height} = item.getBoundingClientRect();
        return {width, height};
      }));
      for (const size of sizes) {
        expect(Math.abs(size.width - sizes[0].width)).toBeLessThan(1);
        expect(Math.abs(size.height - sizes[0].height)).toBeLessThan(1);
      }
    });
    test('media list keeps images beside readable text and stacks on mobile', async ({page}) => {
      await page.goto('/#/sci-comm');
      const cards = page.locator('.media-card');
      await expect(cards.first()).toBeVisible();
      const layouts = await cards.evaluateAll((items) => items.map((item) => {
        const card = item.getBoundingClientRect();
        const summary = item.querySelector('.media-summary') as HTMLElement;
        const content = item.querySelector('.media-content')!.getBoundingClientRect();
        const image = item.querySelector('.media-image')?.getBoundingClientRect();
        return {
          top: card.top, bottom: card.bottom, left: card.left,
          contentTop: content.top, contentLeft: content.left,
          image: image ? {top: image.top, bottom: image.bottom, right: image.right} : null,
          clipped: summary.scrollHeight > summary.clientHeight + 1,
        };
      }));
      for (let i = 0; i < layouts.length; i++) {
        const row = layouts[i];
        expect(row.clipped).toBe(false);
        expect(Math.abs(row.left - layouts[0].left)).toBeLessThan(1);
        if (row.image) {
          if (viewport.width > 600) {
            expect(row.contentLeft).toBeGreaterThan(row.image.right);
            expect(Math.abs(row.contentTop - row.image.top)).toBeLessThan(1);
          } else {
            expect(row.contentTop).toBeGreaterThan(row.image.bottom);
          }
        }
        if (i > 0) {
          const gap = row.top - layouts[i - 1].bottom;
          expect(gap).toBeGreaterThan(0);
          expect(gap).toBeLessThan(40);
        }
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
