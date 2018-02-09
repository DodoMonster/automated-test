const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const join = require('path').join;
const onerror = require('koa-onerror');
const middleware = require('koa-webpack');
const webpackDev = require('./build/webpack.dev.conf');
const model = join(__dirname, 'app/model');
var Router = require('koa-router');
var router = new Router();
const rest = require('./config/rest');

app.use(bodyParser());
app.use(rest.restify());
app.use(router.routes()).use(router.allowedMethods());

require('./app/router.js')(router);

// fs.readdirSync(model)
//     .filter(file => ~file.search(/^[^\.].*\.js$/))
//     .forEach(file => require(join(model, file)));

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

app.listen(process.env.PORT || 3011);