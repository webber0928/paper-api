/*
 * Check API is in maintain
 */

const config = require('config');
const moment = require('moment');

module.exports = (inMaintain = true) => async (ctx, next) => {
    try {

        if (inMaintain === false) {
            return next();
        }

        if (config.get('maintenance.startedAt') === '' || !config.get('maintenance.startedAt')) {
            return next();
        }

        if (config.get('maintenance.endedAt') === '' || !config.get('maintenance.endedAt')) {
            return next();
        }

        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        const startedAt = moment(config.get('maintenance.startedAt')).format('YYYY-MM-DD HH:mm:ss');
        const endedAt = moment(config.get('maintenance.endedAt')).format('YYYY-MM-DD HH:mm:ss');

        const isInMaintain = moment(now).isBetween(startedAt, endedAt);

        if (isInMaintain === true) {
            throw new Error('1016');
        }

        return next();
    } catch (err) {
        return ctx.throw(err);
    }
}