import { Browser, expect, test } from '@playwright/test';

const login = async (browser: Browser, email: string, password: string) => {
  const page = await browser.newPage();
  await page.goto('/');
  await page.getByTestId('menu_button_login').click();
  await page.getByTestId('login_email_field').fill(email);
  await page.getByTestId('login_password_field').fill(password);
  await page.getByTestId('login_submit_id').click();
  await page.waitForURL('/mano-naujienos');
  await page.waitForSelector('[data-testid="content_layout_title"]', { state: 'visible' });
  await page.waitForLoadState('networkidle');
  return page;
};

test('User with subscription should successfully login', async ({ browser }) => {
  const page = await login(browser, 'testing.dovile@gmail.com', 'Test12345!');
  await expect(page.getByTestId('content_layout_title')).toHaveText('Mano naujienos');
});

test('User should successfully logout', async ({ browser }) => {
  const page = await login(browser, 'testing.dovile@gmail.com', 'Test12345!');
  await page.getByTestId('menu_button_logout').click();
  await page.waitForSelector('[data-testid="content_layout_title"]', { state: 'visible' });
  await expect(page.getByTestId('content_layout_title')).toHaveText('Mano naujienos');
});

test('User should fail to login', async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto('/');
  await page.getByTestId('menu_button_login').click();
  await page.getByTestId('login_email_field').fill('invalid.email@am.lt');
  await page.getByTestId('login_password_field').fill('InvalidPassword');
  await page.getByTestId('login_submit_id').click();
  await page.waitForLoadState('networkidle');
  await expect(page.getByTestId('login_data_error')).toHaveText(
    'Neteisingai įvestas el. paštas arba slaptažodis',
  );
});
