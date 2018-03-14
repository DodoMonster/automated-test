const puppeteer = require('puppeteer'),
    devices = require('puppeteer/DeviceDescriptors'),
    // https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js
    iPhone6 = devices['iPhone 6'];

(async () => {
    const browser = await puppeteer.launch({
            headless: false //这里我设置成false主要是为了让大家看到效果，设置为true就不会打开浏览器
        }),
        page = await browser.newPage();
    await page.emulate(iPhone6);
    await page.tracing.start({
        path: 'trace.json'
    })
    console.log('进入页面');
    await page.goto('http://m.efunen.com/home');
    await page.screenshot({
        path: 'screen/首页.jpg'
    });
    console.log("点击首页的登录按钮");
    await page.tap('.user-photo');
    await page.screenshot({
        path: 'screen/点击首页登录按钮.jpg'
    });
    // // await page.waitForNavigation();
    // await page.waitFor(3000);
    // console.log("输入账号密码");
    // await page.screenshot({
    //     path: 'screen/登录.jpg'
    // });
    // await page.type('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div.eui-form-group.eui--position-rel > input', "efun022");
    // await page.type("#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div:nth-child(4) > div > input", "efun168");

    // console.log("第一次点击眼睛");
    // await page.tap('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div:nth-child(4) > div > div > span');
    // await page.screenshot({
    //     path: 'screen/第一次点击眼睛.jpg'
    // });
    // console.log("第二次点击眼睛");
    // await page.tap('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div:nth-child(4) > div > div > span');
    // await page.screenshot({
    //     path: 'screen/第二次点击眼睛.jpg'
    // });
    // console.log("点击登录按钮");
    // await page.screenshot({
    //     path: 'screen/点击登录按钮.jpg'
    // });
    // await page.tap('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > button');
    await page.tracing.stop()
    await browser.close();
})();