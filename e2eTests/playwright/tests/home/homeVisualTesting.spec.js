const { test, expect } = require('@playwright/test');

test('Home page renders correctly', async({page}) =>{
   await page.goto('https://d3d6un1tjol792.cloudfront.net/');
   await expect(page).toHaveScreenshot({ fullPage: true });
});