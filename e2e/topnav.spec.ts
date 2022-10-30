import { test, expect } from '@playwright/test';

test('should navigate to the login page', async ({ page }) => {
  await page.setDefaultNavigationTimeout(1000);
  await page.goto('http://localhost:3000/');
  await page.click('text=ログイン');
  await expect(page).toHaveURL('http://localhost:3000/login');
  await expect(page.locator('h1')).toContainText('ログイン');
});
