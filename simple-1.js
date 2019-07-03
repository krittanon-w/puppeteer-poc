const puppeteer = require('puppeteer');

(async () => {
  // enable ui
  const browser = await puppeteer.launch({
    // executablePath: "./node_modules/puppeteer/.local-chromium/linux-656675/chrome-win/chrome.exe",
    // executablePath: "./node_modules/puppeteer/.local-chromium/win64-656675/chrome-win/chrome.exe",
    headless: false
  })
  // disable ui
  // const browser = await puppeteer.launch();
  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  })
  await page.goto('https://google.com')
  await page.waitFor('input[name=q]')
  await page.$eval('input[name=q]', el => el.value = 'test test test')
  await page.screenshot({path: 'google.png'})

  await browser.close()
})();
