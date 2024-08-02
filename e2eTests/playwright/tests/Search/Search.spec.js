const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('/');
});

test('Results appears only after three letters', async({ page }) => {
  test.slow();
  await page.getByPlaceholder('zip code, city or address').fill('fos');
  await page.waitForResponse("**/api/search?filter=*");
  await page.getByRole('listitem').filter({ hasText: 'Foster City, CA' }).isVisible();
  await page.getByPlaceholder('zip code, city or address').fill('fo');
  await expect(page.getByRole('listitem').filter({ hasText: 'Foster City, CA' })).toHaveCount(0);
});

test('Results dissappear if clicking outside search box and appear again when clicking inside', async({ page }) => {
  test.slow();
  await page.getByPlaceholder('zip code, city or address').fill('fos');
  await page.waitForResponse("**/api/search?filter=*");
  await page.getByRole('listitem').filter({ hasText: 'Foster City, CA' }).isVisible();
  await page.getByAltText('noisy neighboor').click();
  await expect(page.getByRole('listitem').filter({ hasText: 'Foster City, CA' })).toHaveCount(0);
  await page.getByPlaceholder('zip code, city or address');
  await page.getByRole('listitem').filter({ hasText: 'Foster City, CA' }).isVisible();
});