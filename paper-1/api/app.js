// const appRoot = require('app-root-path');
global.appRoot = require('app-root-path');

const koa = require('koa');
const app = new koa();

const Router = require('koa-router');
app.Router = new Router();

const middlewares = require(`${appRoot}/api/middlewares`);
const v1 = require(`${appRoot}/api/v1`);
const errorHandler = require(`${appRoot}/api/errorHandler`);


app.use(errorHandler(app));
app.use(middlewares(app));
app.use(v1(app));

module.exports = app;