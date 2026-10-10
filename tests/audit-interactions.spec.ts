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
      const bio = page.getByRole('button', {name: 'Sixuan Chen PhD student'});
      await bio.focus();
      await page.keyboard.press('Enter');
      await expect(page.getByRole('dialog', {name: 'Sixuan Chen'})).toBeVisible();
      await expect(page.getByRole('dialog')).toContainText('mental simulation');
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
    test('resources use readable single-column entries with accurate link actions', async ({page}) => {
      await page.goto('/#/resources');
      const entries = page.locator('.resource-entry');
      await expect(entries).toHaveCount(20);
      await expect(entries.filter({has: page.getByRole('heading', {name: 'hGRU segmentation', exact: true})}).getByRole('link')).toHaveText('Open notebook →');
      await expect(entries.filter({has: page.getByRole('heading', {name: 'Xplique', exact: true})}).getByRole('link')).toHaveText('View code →');
      const positions = await entries.evaluateAll(items => items.map(item => {
        const rect = item.getBoundingClientRect();
        const title = item.querySelector('h3')!.getBoundingClientRect();
        const details = item.querySelector('.resource-details')!.getBoundingClientRect();
        return {top: rect.top, bottom: rect.bottom, left: rect.left, titleBottom: title.bottom, titleRight: title.right, detailsTop: details.top, detailsLeft: details.left};
      }));
      for (let i = 0; i < positions.length; i++) {
        const row = positions[i];
        if (i > 0) expect(row.top).toBeGreaterThanOrEqual(positions[i - 1].bottom - 0.1);
        expect(Math.abs(row.left - positions[0].left)).toBeLessThan(1);
        if (viewport.width <= 600) expect(row.detailsTop).toBeGreaterThanOrEqual(row.titleBottom);
        else expect(row.detailsLeft).toBeGreaterThan(row.titleRight);
      }
    });
    test('navigation starts at the top and Back restores the previous reading position', async ({page}) => {
      await page.goto('/#/');
      const link = page.getByRole('link', {name: 'View all publications', exact: false});
      await link.scrollIntoViewIfNeeded();
      const previousY = await page.evaluate(() => window.scrollY);
      expect(previousY).toBeGreaterThan(500);
      await link.click();
      await expect(page.getByRole('heading', {level: 1, name: 'Publications', exact: true})).toBeVisible();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await expect(page.getByRole('heading', {level: 1})).toBeFocused();
      await page.goBack();
      await expect(page.getByRole('heading', {level: 1})).toHaveText('Serre Lab');
      await expect.poll(async () => Math.abs(await page.evaluate(() => window.scrollY) - previousY)).toBeLessThan(3);
    });
    test('banner text is not clipped and navigation landmarks have distinct names', async ({page}) => {
      await page.goto('/#/');
      await expect(page.locator('.home-hero-line').first()).toBeVisible();
      const clipped = await page.locator('.home-hero-line').evaluateAll(lines => lines.some(line => line.scrollWidth > line.clientWidth + 1));
      expect(clipped).toBe(false);
      const labels = await page.locator('nav').evaluateAll(nav => nav.map(n => n.getAttribute('aria-label')));
      expect(labels.every(Boolean)).toBe(true);
      expect(new Set(labels).size).toBe(labels.length);
    });
    test('main pages fit the viewport and legacy resources resolve', async ({page}) => {
      for (const [route, title] of [['/', 'Serre Lab'], ['/research', 'Research'], ['/people', 'People'], ['/resources', 'Resources'], ['/publications', 'Publications'], ['/sci-comm', 'Media']]) {
        await page.goto(`/#${route}`);
        await expect(page.getByRole('heading', {level: 1, name: title, exact: true})).toBeVisible();
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
