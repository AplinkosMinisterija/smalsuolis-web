import { test, expect } from '@playwright/test';

test('should successfully login', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('login_email_field').fill('vadovas@imone.lt');
  await page.getByTestId('login_password_field').fill('Slaptas1!');
  await page.getByTestId('login_submit_id').click();

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
