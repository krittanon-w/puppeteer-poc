const puppeteer = require('puppeteer');

(async () => {
  const browserConfig = {
    // executablePath: "./node_modules/puppeteer/.local-chromium/win64-656675/chrome-win/chrome.exe", //win64
    headless: true,
  }

  const isWindowsPlatfrom = () => {
    return process.platform.indexOf("win") >= 0
  }

  if (isWindowsPlatfrom() == false) {
    // executablePath: "./node_modules/puppeteer/.local-chromium/linux-656675/chrome-linux/chrome",
    // executablePath: "/usr/bin/chromium-browser", //wsl
    browserConfig.args = ['--no-sandbox', '--disable-setuid-sandbox']
  }

  console.log("browser.config", browserConfig)
  const browser = await puppeteer.launch(browserConfig)

  console.log("process.platform", process.platform)
  console.log("browser.version", await browser.version())

  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  })
  await page.goto('https://google.com')
  await page.waitFor('input[name=q]')
  await page.$eval('input[name=q]', el => el.value = 'running date: ' + new Date().toUTCString())
  await page.screenshot({path: 'google.png'})

  // close
  await browser.close()
})();
