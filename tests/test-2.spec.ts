import { test, expect } from '@playwright/test';

test('test2', async ({ page }) => {
  await page.goto('');
  await expect(page.getByRole('heading', { name: 'Hello, test' })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('Hello, test');
  await expect(page).toHaveURL('http://localhost:4200/');
  const page1Promise = page.waitForEvent('popup');
  await expect(page.getByRole('link', { name: 'Github' })).toBeVisible();
  const page1 = await page1Promise;
  await expect(page1.locator('#repository-container-header')).toContainText('angular / angular Public');
  await expect(page1).toHaveURL('https://github.com/angular/angular');
});