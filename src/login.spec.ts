
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';

async function runLoginPageTest() {
  const token = process.env.BROWSERLESS_TOKEN;

  if (!token) {
    throw new Error('BROWSERLESS_TOKEN is missing');
  }

  const browser = await chromium.connectOverCDP(
    `wss://production-ams.browserless.io?token=${token}`
  );

  try {
    const context = browser.contexts()[0];
    const page = await context.newPage();

    console.log('Opening Rahul Shetty login page');

    await page.goto(
      'https://rahulshettyacademy.com/loginpagePractise/',
      { waitUntil: 'domcontentloaded' }
    );

    const title = await page.title();

    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginButton = page.locator('#signInBtn');

    assert.ok(await username.isVisible(), 'Username field missing');
    assert.ok(await password.isVisible(), 'Password field missing');
    assert.ok(await loginButton.isVisible(), 'Login button missing');

    console.log('TEST PASSED');
    console.log({
      pageTitle: title,
      usernameVisible: true,
      passwordVisible: true,
      loginButtonVisible: true
    });

  } finally {
    await browser.close();
  }
}



runLoginPageTest().catch(error => {
  console.error('TEST FAILED:', error);
  process.exitCode = 1;
});
