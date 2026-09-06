const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const url = process.argv[2];
const baseName = (process.argv[3] || 'out');
const outDir = process.argv[4] || 'C:\\Users\\14530\\OneDrive\\Documents\\进击WorkBuddy\\Hy4';

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errors = [];
  const consoleErrors = [];
  page.on('pageerror', e => errors.push('PAGE: ' + e.message));
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push('CON: ' + msg.text()); });
  page.on('requestfailed', r => { if (!r.url().includes('favicon')) errors.push('REQ FAIL: ' + r.url() + ' - ' + r.failure().errorText); });

  const fileUrl = 'file:///' + url.replace(/\\/g, '/');

  // 视图 1：事件字典首页（默认）
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, '_shot_' + baseName + '_v1.png'), fullPage: false });
  console.log('v1: 事件字典首页');

  // 视图 2：事件详情
  await page.evaluate(() => { document.querySelector('[data-view="v2"]').click(); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '_shot_' + baseName + '_v2.png'), fullPage: false });
  console.log('v2: 事件详情');

  // 视图 3：埋点方案列表
  await page.evaluate(() => { document.querySelector('[data-view="v3"]').click(); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '_shot_' + baseName + '_v3.png'), fullPage: false });
  console.log('v3: 方案列表');

  // 视图 4：方案设计器
  await page.evaluate(() => { document.querySelector('[data-view="v4"]').click(); });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, '_shot_' + baseName + '_v4.png'), fullPage: false });
  console.log('v4: 方案设计器');

  // 视图 5：实时观测
  await page.evaluate(() => { document.querySelector('[data-view="v5"]').click(); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '_shot_' + baseName + '_v5.png'), fullPage: false });
  console.log('v5: 实时观测');

  // 视图 6：验收工作台
  await page.evaluate(() => { document.querySelector('[data-view="v6"]').click(); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(outDir, '_shot_' + baseName + '_v6.png'), fullPage: false });
  console.log('v6: 验收工作台');

  // 验收不通过详情
  await page.evaluate(() => {
    document.querySelector('[data-view="v6"]').click();
    setTimeout(() => {
      document.querySelector('[data-tab="v6t4"]')?.click();
    }, 100);
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, '_shot_' + baseName + '_v6_fail.png'), fullPage: false });
  console.log('v6-fail: 验收不通过详情');

  console.log('---');
  console.log('pageerrors:', errors.length);
  console.log('console errors:', consoleErrors.length);
  if (errors.length) console.log(errors.join('\n'));
  if (consoleErrors.length) console.log(consoleErrors.join('\n'));

  await browser.close();
})();