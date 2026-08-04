import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('');
  await expect(page.getByRole('heading', { name: 'Hello, test' })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('Hello, test');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Prompt and best practices for' }).click();
  const page1 = await page1Promise;
});