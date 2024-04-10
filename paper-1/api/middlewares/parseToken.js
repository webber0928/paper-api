
const Promise = require('bluebird');
const config = require('config');
const jwt = require('jsonwebtoken');

const { Users } = require(`${appRoot}/models`);
const redis = require(`${appRoot}/redis`);

module.exports = async (ctx, next) => {
    try {
        if (!ctx.headers || !ctx.headers.authorization) {
            throw new Error('1009');
        }

        let checkFormat = /^Bearer/i.test(ctx.headers.authorization);

        if (checkFormat !== true) {
            throw new Error('1010');
        }

        let token = ctx.headers.authorization.replace(/^Bearer\s/, '');

        if (await redis.get(`user-${token}`)  === null) {
            throw new Error('1007');
        }

        let decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, config.get('JWT.secret'), function(err, decoded) {
                if (err) {

                    if (err.message === 'jwt expired') {
                        return reject('1015')
                    }

                    return reject(err);
                }
                return resolve(decoded);
            });
        });

        if (!decoded || !decoded.uuid) {
            throw new Error('1011');
        }

        let user = await Users.findOne({
            where: {
                uuid: decoded.uuid
            }
        });

        if (!user) {
            throw new Error('1005');
        }

        ctx.state.User = user;
        return next();
    } catch (err) {
        return ctx.throw(err);
    }
};