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
        // params = JSON.stringify(params) || [];
        if (params && params.length) {
            for (var i = 0, len = params.length; i < len; i++) {
                console.log(params[i].username);
                try {
                    var result = {
                            imgList: [],
                            txtLog: '',
                            runResult: 1
                        },
                        hasError = false,
                        timeStamp = +new Date();
                    const browser = await puppeteer.launch({
                            headless: false
                        }),
                        page = await browser.newPage();
                    await page.emulate(iPhone6);
                    console.log('进入页面');
                    result.txtLog += '<p>1.进入页面</p>';
                    await page.goto('https://m.efunen.com/home');
                    await page.screenshot({
                        path: fileSavePath + '进入首页_' + timeStamp + '.jpg'
                    });
                    result.imgList.push('进入首页_' + timeStamp + '.jpg');
                    console.log("点击首页的登录按钮");
                    await page.waitFor(10000);

                    result.txtLog += '<p>2.点击首页的登录按钮</p>';
                    await page.tap('.login-link');
                    await page.screenshot({
                        path: fileSavePath + '点击首页的登录按钮_' + timeStamp + '.jpg'
                    });
                    result.imgList.push('点击首页的登录按钮_' + timeStamp + '.jpg');
                    await page.waitFor(3000);
                    await page.type('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div.eui-form-group.eui--position-rel > input', params[i].username || 'efun022');
                    await page.type("#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div:nth-child(4) > div > input", params[i].password || '123456');
                    console.log("输入账号密码" + JSON.stringify(params[i]));
                    result.txtLog += '<p>3.输入账号密码' + JSON.stringify(params[i]) + '</p>';
                    await page.screenshot({
                        path: fileSavePath + '输入账号密码_' + timeStamp + '.jpg'
                    });
                    result.imgList.push('输入账号密码_' + timeStamp + '.jpg');

                    console.log("第一次点击眼睛");
                    result.txtLog += '<p>4.第一次点击眼睛</p>';
                    await page.tap('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div:nth-child(4) > div > div > span');
                    await page.screenshot({
                        path: fileSavePath + '第一次点击眼睛_' + timeStamp + '.jpg'
                    });
                    result.imgList.push('第一次点击眼睛_' + timeStamp + '.jpg');

                    console.log("第二次点击眼睛");
                    result.txtLog += '<p>5.第二次点击眼睛</p>';
                    await page.tap('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > div:nth-child(4) > div > div > span');
                    await page.screenshot({
                        path: fileSavePath + '第二次点击眼睛_' + timeStamp + '.jpg'
                    });
                    result.imgList.push('第二次点击眼睛_' + timeStamp + '.jpg');

                    console.log("点击登录按钮");
                    result.txtLog += '<p>6.点击登录按钮</p>';
                    await page.tap('#app > div > div > div > form.eui-login-form.login-member-form.eui--margin-t-20 > button');
                    await page.waitFor(5000);
                    await page.screenshot({
                        path: fileSavePath + '点击登录按钮后_' + timeStamp + '.jpg'
                    });
                    result.imgList.push('点击登录按钮后_' + timeStamp + '.jpg');

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
            }
        }

    })();
}

module.exports = {
    startJob
};