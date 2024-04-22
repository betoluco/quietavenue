const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('/');
});

test('Call to action button takes you to workFlow', async({ page }) => {
  await page.getByText('click here', {exact: true}).click();
  await expect(page).toHaveURL('/workFlow');
});

test('Learn more link takes you to misson', async({page}) =>{
  await page.getByText('learn more', {exact: true}).click();
  await expect(page).toHaveURL('/mission');
});