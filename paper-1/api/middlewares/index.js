
const logger = require('koa-logger')
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const morgan = require('koa-morgan')

const checkMaintain = require(`${appRoot}/api/middlewares/checkMaintain`)

module.exports = (app) => {

    // check maintain
    app.use(checkMaintain(false));

    // app.use(logger((str, args) => {
    //     console.log(decodeURI(str));
    // }));
    app.use(morgan('[:date[clf]] "[:method] :url :status" :response-time ms - '));

    app.use(koaBody({
        multipart: true
    }));

    // app.use(bodyParser());

    app.use(cors());

    app.context.formatApi = (options = {}) => {
        let {
            code = 20000,
            data = {},
            status = 200
        } = options;
        return {
            code,
            data,
            status
        };
    };

    return async (ctx, next) => {
        try {
            return next();
        } catch (err) {
            return next(err);
        }
    };
};