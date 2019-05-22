const puppeteer = require('puppeteer')

(async () => {
  // enable ui
  const browser = await puppeteer.launch({headless: false})
  // disable ui
  // const browser = await puppeteer.launch();
  const page = await browser.newPage()
  await page.goto('https://google.com')
  await page.screenshot({path: 'google.png'})

  await browser.close()
})()