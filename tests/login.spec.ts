import { Browser, expect, test } from '@playwright/test';

export const login = async (
  browser: Browser,
  email: string,
  password: string,
  stayLoggedIn: boolean,
  mainPage: string,
) => {
  const page = await browser.newPage();
  await page.goto('/');
  await page.getByTestId('menu_button_login').click();
  await page.getByTestId('login_email_field').fill(email);
  await page.getByTestId('login_password_field').fill(password);
  if (stayLoggedIn) {
    await page.getByTestId('stay_loggedin_checkbox').click();
  }
  await page.getByTestId('login_submit_id').click();
  await page.waitForURL(mainPage);
  await page.waitForLoadState('networkidle');
  return page;
};

test('User with subscription should successfully login and see feed page', async ({ browser }) => {
  const page = await login(
    browser,
    'testing.dovile@gmail.com',
    'Test12345!',
    false,
    '/mano-naujienos',
  );
  await page.waitForSelector('[data-testid="content_layout_title"]', { state: 'visible' });
  await expect(page.getByTestId('content_layout_title')).toHaveText('Mano naujienos');
});

test('User with subscription should successfully login and see new subscription page', async ({
  browser,
}) => {
  const page = await login(
    browser,
    'testing.dovile@gmail.com',
    'Test12345!',
    false,
    '/prenumeratos/nauja',
  );
  await expect(page.getByTestId('content_layout_title')).toHaveText('Prenumeratos valdymas');
});

test('User should successfully logout', async ({ browser }) => {
  const page = await login(
    browser,
    'testing.dovile@gmail.com',
    'Test12345!',
    false,
    '/prenumeratos/nauja',
  );
  await page.getByTestId('menu_button_logout').click();
  await page.waitForSelector('[data-testid="content_layout_title"]', { state: 'visible' });
  await expect(page.getByTestId('content_layout_title')).toHaveText('Visos naujienos');
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

test('Should not refersh token', async ({ browser, context }) => {
  const page = await login(
    browser,
    'testing.dovile@gmail.com',
    'Test12345!',
    false,
    '/prenumeratos/nauja',
  );
  const cookies = await page.context().cookies();
  await page.context().clearCookies(); // Clear all cookies
  await page.context().addCookies(cookies.filter((cookie) => cookie.name !== 'token'));
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('[data-testid="content_layout_title"]', { state: 'visible' });
  await expect(page.getByTestId('content_layout_title')).toHaveText('Visos naujienos');
});

test('Should refersh token', async ({ browser, context }) => {
  const page = await login(
    browser,
    'testing.dovile@gmail.com',
    'Test12345!',
    true,
    '/prenumeratos/nauja',
  );
  const cookies = await page.context().cookies();
  await page.context().clearCookies(); // Clear all cookies
  await page.context().addCookies(cookies.filter((cookie) => cookie.name !== 'token'));
  await page.getByTestId('/prenumeratos_side_bar_button').click();
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('[data-testid="content_layout_title"]', { state: 'visible' });
  await expect(page.getByTestId('content_layout_title')).toHaveText('Prenumeratos');
});
