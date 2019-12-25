const Koa = require('koa');
const koaRouter = require('koa-router');

const session = require('koa-session');
const bodyParse = require('koa-bodyparser');
const static = require('koa-static');

const app = new Koa();
const router = new koaRouter();
app.keys = ["this is keys"];

app.use(static(__dirname + "/"));
app.use(bodyParse());
app.use(session(app))