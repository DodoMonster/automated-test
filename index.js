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

const staticSer = require('koa-static');

app.use(staticSer(join(__dirname + '/app/uploads')));

const webpack = require('webpack');
const convert = require('koa-convert');
const koaWebpackMiddleware = require('koa-webpack-middleware');
const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware;
const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware;
const compiler = webpack(webpackDev);

const wdm = webpackDevMiddleware(compiler, {
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    reload: true,
    publicPath: webpackDev.output.publicPath,
    stats: {
        colors: true
    }
})
app.use(convert(wdm));
app.use(convert(webpackHotMiddleware(compiler)));



// fs.readdirSync(model)
//     .filter(file => ~file.search(/^[^\.].*\.js$/))
//     .forEach(file => require(join(model, file)));

//错误信息处理
onerror(app);

//控制台打印请求信息
app.use(async (ctx, next) => {
    let url = ctx.url
    // 从上下文的request对象中获取
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring

    // 从上下文中直接获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
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

app.use(bodyParser());
app.use(rest.restify());
app.use(router.routes()).use(router.allowedMethods());

require('./app/router.js')(router);

app.listen(process.env.PORT || 3011);