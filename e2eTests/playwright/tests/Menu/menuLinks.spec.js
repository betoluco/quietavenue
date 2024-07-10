const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('https://d3d6un1tjol792.cloudfront.net');
});

test('Menu home link works', async({ page }) => {
  await page.getByRole('Button', {name: 'open menu'}).click();
  await page.getByRole('listitem').filter({ hasText: 'Home' }).click();
  await expect(page).toHaveURL('/');
});

test('Menu Schedule your free trial link works', async({ page }) => {
  await page.getByRole('Button', {name: 'open menu'}).click();
  await page.getByRole('listitem').filter({ hasText: 'Schedule your free trial' }).click();
  await expect(page).toHaveURL('/workFlow');
});

test('Menu How it works? link works', async({ page }) => {
  await page.getByRole('Button', {name: 'open menu'}).click();
  await page.getByRole('listitem').filter({ hasText: 'How it works?' }).click();
  await expect(page).toHaveURL('/mission');
});

test('Menu FAQ link works', async({ page }) => {
  await page.getByRole('Button', {name: 'open menu'}).click();
  await page.getByRole('listitem').filter({ hasText: 'FAQ' }).click();
  await expect(page).toHaveURL('/FAQ');
});

test('Menu Contact us link works', async({ page }) => {
  await page.getByRole('Button', {name: 'open menu'}).click();
  await page.getByRole('listitem').filter({ hasText: 'Contact us' }).click();
  await expect(page).toHaveURL('/contact');
});