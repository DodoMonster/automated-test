const puppeteer = require('puppeteer'),
    devices = require('puppeteer/DeviceDescriptors'),
    iPhone6 = devices['iPhone 6'],
    path = require('path'),
    fileSavePath = path.join(__dirname, '../results/'),
    testJob = require('../../../controller/task');

function startJob(allParams, params) {
    (async () => {
        console.log('-------------------- start 运行脚本 ---------------------');
        console.log(params);
        var result = {
                imgList: [],
                txtLog: '',
                runResult: 1
            },
            hasError = false,
            timeStamp = +new Date();
        const browser = await puppeteer.launch(),
            page = await browser.newPage();
        try {
            await page.emulate(iPhone6);
            console.log('进入页面');
            result.txtLog += '<p>1.进入页面</p>';
            await page.goto('https://m.efunen.com/home');
            await page.screenshot({
                path: fileSavePath + 'home_' + timeStamp + '.jpg'
            });
            result.imgList.push('home_' + timeStamp + '.jpg');
            console.log("点击首页的登录按钮");
            result.txtLog += '<p>2.点击首页的登录按钮</p>';
            await page.tap('.login-link');
            await page.screenshot({
                path: fileSavePath + 'click-login-btn_' + timeStamp + '.jpg'
            });
            result.imgList.push('click-login-btn_' + timeStamp + '.jpg');
            await page.waitFor(3000);
            console.log("输入账号密码" + JSON.stringify(params));
            result.txtLog += '<p>3.输入账号密码' + JSON.stringify(params) + '</p>';

            await page.screenshot({
                path: fileSavePath + 'login-page_' + timeStamp + '.jpg'
            });
            result.imgList.push('login-page_' + timeStamp + '.jpg');

            await page.type('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div.eui-form-group.eui--position-rel > input', params.username || 'efun022');
            await page.type("#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div:nth-child(4) > div > input", params.password || '123456');

            console.log("第一次点击眼睛");
            result.txtLog += '<p>4.第一次点击眼睛</p>';
            await page.tap('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div:nth-child(4) > div > div > span');
            await page.screenshot({
                path: fileSavePath + 'first-click-eye_' + timeStamp + '.jpg'
            });
            result.imgList.push('first-click-eye_' + timeStamp + '.jpg');

            console.log("第二次点击眼睛");
            result.txtLog += '<p>5.第二次点击眼睛</p>';
            await page.tap('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div:nth-child(4) > div > div > span');
            await page.screenshot({
                path: fileSavePath + 'second-click-eye_' + timeStamp + '.jpg'
            });
            result.imgList.push('second-click-eye_' + timeStamp + '.jpg');

            console.log("点击登录按钮");
            result.txtLog += '<p>6.点击登录按钮</p>';
            await page.screenshot({
                path: fileSavePath + 'click-login-btn_' + timeStamp + '.jpg'
            });
            result.imgList.push('click-login-btn_' + timeStamp + '.jpg');

            await page.tap('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > button');
            console.log("测试完毕~~~预示测试流程顺畅");
            result.txtLog += '<p>7.测试完毕~~~预示测试流程顺畅</p>';
            console.log(testJob);
        } catch (e) {
            console.log(e);
            console.log("测试出错了" + JSON.stringify(e));
            result.txtLog += '<p>测试出错了 ' + JSON.stringify(e) + '</p>';
            hasError = true;
        }
        if (!hasError) {
            result.runResult = 0;
        }
        console.log(result);
        testJob.save(result, allParams, params);
        await browser.close();
    })();
}

module.exports = {
    startJob
};