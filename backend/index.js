const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://stockx.com/nike-dunk-low-photon-dust-w');

    const title = await page.title();
    console.log(title);

    await page.waitForTimeout(10000);
    await browser.close();
})();