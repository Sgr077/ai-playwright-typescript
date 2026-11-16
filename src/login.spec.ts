
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

    await page.goto(
      'https://rahulshettyacademy.com/loginpagePractise/',
      { waitUntil: 'domcontentloaded' }
    );

    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginButton = page.locator('#signInBtn');

    await username.waitFor({ state: 'visible' });
    await password.waitFor({ state: 'visible' });
    await loginButton.waitFor({ state: 'visible' });

    assert.ok(await username.isVisible());
    assert.ok(await password.isVisible());
    assert.ok(await loginButton.isVisible());

    console.log('TEST PASSED');

    console.log({
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
