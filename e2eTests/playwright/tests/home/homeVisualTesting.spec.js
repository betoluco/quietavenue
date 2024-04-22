const { test, expect } = require('@playwright/test');

test('Home page renders correctly', async({page}) =>{
   await page.goto('/');
   await expect(page).toHaveScreenshot();
});