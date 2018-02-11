const puppeteer = require('puppeteer'),
    devices = require('puppeteer/DeviceDescriptors'),
    iPhone6 = devices['iPhone 6'];

(async () => {
    const browser = await puppeteer.launch(),
        page = await browser.newPage();
    await page.emulate(iPhone6);
})