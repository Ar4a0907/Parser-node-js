const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('http://dveri-aleks163.ru/');

    page.on('console', (msg) => {
        console.log(msg.text());
    })

    await page.$$eval('.catalog', async elements => {
        let sections = []
        for (const el of elements) {
            let items = []
            const title = el.querySelector('.catalog__category-title').innerText;
            const catalogItems = el.querySelectorAll('.catalog__item')
            for (const item of catalogItems) {
                const itemName = item.querySelector('.catalog__info-name').innerText;
                const itemCost = item.querySelector('.catalog__info-price').innerText;
                const obj = {
                    "name": itemName,
                    "cost": itemCost
                }
                items.push(obj);
            }
            const sectionObj = {
                "title": title,
                "items": items
            };
            sections.push(sectionObj);
            items = [];
        }
        console.log(sections[1].items[1].name)
    })

    await browser.close();
})();