const errorFormat = require(`${appRoot}/api/errorHandler/errorFormat`);
const PrettyError = require('pretty-error');
const prettyError = new PrettyError();
prettyError.withoutColors();
prettyError.skipPackage(
    'koa-compose',
    'koa-router',
    'koa2-cors',
    'koa-body',
    'koa-logger',
    'jsonwebtoken',
    'bluebird'
);

module.exports = (app) => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            let errorResponse = {};
            const customizedError = errorFormat[err.message] ? true : false;
            let customError = customizedError ? errorFormat[err.message] : errorFormat['1000'];
            errorResponse.code = customError.code;
            errorResponse.status = customError.status;
            errorResponse.message = customError.message;

            if (customError.code >= 1000) {
                console.log(`---------- ERROR ----------`);                
                console.log(`code: ${errorResponse.code}`);
                console.log(`message: ${errorResponse.message}`);
                console.log(`status: ${errorResponse.status}`);
                console.log(`stack:`);
                console.log(prettyError.render(err));
                console.log(`---------- ERROR ----------`);
            }

            ctx.status = errorResponse.status;
            return ctx.body = errorResponse;
        }
    };
};