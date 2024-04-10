const Router = require('koa-router');
const router = new Router({
    prefix: '/api/general/v1'
});

const libs = require('../../libs');

const parseToken = require(`${appRoot}/api/middlewares/parseToken`);
const allowRoles = require(`${appRoot}/api/middlewares/allowRoles`);

module.exports = (app) => {
    app.use(router.routes());
    app.use(router.allowedMethods());

    router.get('/healthchecks', async (ctx, next) => {
        ctx.status = 200;
        return ctx.body = '';
    });

    router.get('/test', parseToken, allowRoles(['admin-compliance']), async (ctx, next) => {
        // await libs.fundrich.idList();
        // console.log(ctx.state.User);
        return ctx.body = []
    });

    router.post('/auth/login', require(`${appRoot}/api/v1/auth/login`));
    router.post('/auth/refreshtoken', require(`${appRoot}/api/v1/auth/refresh`));

    router.post('/users/register', require(`${appRoot}/api/v1/user/register`));
    router.get('/users/me', parseToken, allowRoles(['all']), require(`${appRoot}/api/v1/user/me`));

    router.post('/regions', require(`${appRoot}/api/v1/region/create`));

    router.post('/assets', require(`${appRoot}/api/v1/asset/create`));
    router.get('/assets', require(`${appRoot}/api/v1/asset/funds`));


    return async (ctx, next) => {
        try {
            return next();
        } catch (err) {
            return next(err);
        }
    };
};