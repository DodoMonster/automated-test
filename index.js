const Koa = require('koa');
const app = new Koa();
const Config = require('./config/config');
const onerror = require('koa-onerror');
const middleware = require('koa-webpack');
const webpackDev = require('./build/webpack.dev.conf');


//错误信息处理
onerror(app);

//控制台打印请求信息
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(middleware({
    config: webpackDev,
    dev: {
        stats: {
            colors: true
        }
    }
}));
app.listen(Config.node.port || 3000);