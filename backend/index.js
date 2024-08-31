const { chromium } = require('playwright');

const searchEngines = [
    'https://www.google.com/search?q=stockx.com',
    'https://www.bing.com/search?q=stockx.com'
]

function getRandomBinary() {
    return Math.floor(Math.random() * 2);
}

const headersList = [
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'max-age=0',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': 'https://example.com',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'no-cache',
    },
    {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'max-age=0',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'no-cache',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'max-age=0',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'max-age=0',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-G950U Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Mobile Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'max-age=0',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'no-cache',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; Trident/7.0; AS; TSTN; .NET4.0E; .NET4.0C; .NET4; .NET3.5; .NET3.0; .NET2.0; .NET1.1; .NET1.0; rv:11.0) like Gecko',
        'Accept': 'text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, image/apng, */*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'max-age=0',
    },
    {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'no-cache',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'no-cache',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'max-age=0',
    },
    {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'DNT': '1',
        'Cache-Control': 'no-cache',
    },
];

function getRandomHeaders() {
    const randomIndex = Math.floor(Math.random() * headersList.length);
    return headersList[randomIndex];
}

async function randomMovement(page, randomWeight) {
    const mouse = page.mouse;
    await mouse.move(randomWeight + Math.random() * 50, Math.random() * randomWeight);
    await page.waitForTimeout(Math.random() * randomWeight + 20);
    const scroll = Math.random() * randomeWeight * 10;
    await page.evaluate(scroll => window.scrollTo(0, scroll), scroll);
    await page.waitForTimeout(Math.random() * randomWeight + 10);
}

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        ...getRandomHeaders(),
    });

    const searchPage = await context.newPage();
    
    const searchEngineNum = getRandomBinary();
    await searchPage.goto(searchEngines[searchEngineNum]);
    
    randomMovement(searchPage, 100);
    randomMovement(searchPage, 200);

    let page;
    const [newTab] = await Promise.all([
        context.waitForEvent('page', { timeout: 5000 }).catch(() => null), 
        searchEngineNum
            ? searchPage.click('li.b_algo a') // Bing
            : searchPage.click('a[href^="https://stockx.com"]') // Google
    ]);

    page = newTab || searchPage;

    const title = await page.title();
    console.log(title);

    await page.waitForSelector('a[href="/category/sneakers"]');
    await page.click('a[href="/category/sneakers"]');

    // Manually inputting category attributes to scrape 1 by 1 to not get detected
    scrapeJordans(page);

    await page.waitForTimeout(1000000);

    await browser.close();
})();

async function scrapeJordans(page) {
    randomMovement(page, 200);

    await page.waitForSelector('.css-1vuu0gw')
    await page.click('span:text("Jordan")');

    await page.waitForSelector('#product-results')
    const productResults = await page.$('#product-results')
    console.log(productResults)

    const productData = productResults.map(sneaker => [
        page.$('[data-testid="product-tile-title"]'),

    ])
    // notes on how to continue below 
    // | | |
    // V V V
}

// mySql notes
// name, image, link, create price history, then construct scrollable 

// todo: think about how to track price over time
// how will we operate background script to run as user goes? 
// for now, we'll have an array for price. each item in the array will be one time we scraped the data, index 0 will be the date, index 1 will be the price. everytime the user asks for it, we will append. 
// in the future we'll create a separate script that scrapes if needed to when a specific sneaker is requested

// figure out why kobe 10 elite christmas image and link have different id substrings. one has Nike-Kobe-10-elite and the other is kobe-10-elite
// there is no direct correlation between image link and id link. instead, just use substring from product result image for constructing scrollable, not the link link. so only use link for its intended purpose: going to the link:)


// img notes

// available image src in product results
//<img src="https://images.stockx.com/images/Air-Jordan-4-Retro-White-Thunder-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=75&auto=format%2Ccompress&dpr=1&trim=color&updated_at=1722353047&q=57">
//<img src="https://images.stockx.com/images/Air-Jordan-4-Retro-White-Thunder-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=75&auto=format%2Ccompress&dpr=2&trim=color&updated_at=1722353047&q=60">
//<img src="https://images.stockx.com/images/Air-Jordan-4-Retro-White-Thunder-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=75&auto=format%2Ccompress&dpr=3&trim=color&updated_at=1722353047&q=41">

// 3 levels of size. the ony differences are dpr={1, 2, 3} and q={57, 60, 41}

// scrollables, not available, but can be produced
//<img src="https://images.stockx.com/360/Air-Jordan-4-Retro-White-Thunder/Images/Air-Jordan-4-Retro-White-Thunder/Lv2/img13.jpg?auto=format%2Ccompress&w=576&dpr=1&updated_at=1722284580&h=384&q=57">
//<img src="https://images.stockx.com/360/Air-Jordan-4-Retro-White-Thunder/Images/Air-Jordan-4-Retro-White-Thunder/Lv2/img13.jpg?auto=format%2Ccompress&w=576&dpr=2&updated_at=1722284580&h=384&q=60">
//<img src="https://images.stockx.com/360/Air-Jordan-4-Retro-White-Thunder/Images/Air-Jordan-4-Retro-White-Thunder/Lv2/img13.jpg?auto=format%2Ccompress&w=576&dpr=3&updated_at=1722284580&h=384&q=41">

// =384 is same for all sneakers
// scrollables don't need updated_at. it can be like this: 
//<img src="https://images.stockx.com/360/Air-Jordan-4-Retro-White-Thunder/Images/Air-Jordan-4-Retro-White-Thunder/Lv2/img13.jpg?auto=format%2Ccompress&w=576&dpr=1&q=57">
//<img src="https://images.stockx.com/360/Air-Jordan-4-Retro-White-Thunder/Images/Air-Jordan-4-Retro-White-Thunder/Lv2/img13.jpg?auto=format%2Ccompress&w=576&dpr=2&q=60">
//<img src="https://images.stockx.com/360/Air-Jordan-4-Retro-White-Thunder/Images/Air-Jordan-4-Retro-White-Thunder/Lv2/img13.jpg?auto=format%2Ccompress&w=576&dpr=3&q=41">
// 3 levels of size. dpr={1, 2, 3} and q={57, 60, 41}
// scroll is from img{01-36}