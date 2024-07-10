const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('/');
});

test('Click on logo take you to home', async({ page }) => {
  await page.getByText('QuietAvenue', {exact: true}).click();
  await expect(page).toHaveURL('/');
});

test('Call to action button takes you to workFlow', async({ page }) => {
  await page.getByText('click here', {exact: true}).click();
  await expect(page).toHaveURL('/workFlow');
});

test('Learn more link takes you to misson', async({page}) =>{
  await page.getByText('learn more', {exact: true}).click();
  await expect(page).toHaveURL('/mission');
});

test('Home link works', async({page}) =>{
  await page.getByText('Home', {exact: true}).click();
  await expect(page).toHaveURL('/');
});

test('Schedule your free trial link works', async({page}) =>{
  await page.getByText('Schedule your free trial', {exact: true}).click();
  await expect(page).toHaveURL('/workFlow');
});

test('How it works? link works', async({page}) =>{
  await page.getByText('How it works?', {exact: true}).click();
  await expect(page).toHaveURL('/mission');
});

test('FAQ link works', async({page}) =>{
  await page.getByText('FAQ', {exact: true}).click();
  await expect(page).toHaveURL('/FAQ');
});

test('Contact us link works', async({page}) =>{
  await page.getByText('Contact us', {exact: true}).click();
  await expect(page).toHaveURL('/contact');
});

test('Test cards links', async({page}) =>{
  await page.getByText('2141 Mills Ave', {exact: true}).click();
  await expect(page).toHaveURL('/estate/2/CA/-Foster-City/2141-Mills-Ave');
});
