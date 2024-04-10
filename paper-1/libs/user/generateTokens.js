
const Promise = require('bluebird');
const chance = require('chance').Chance();
const config = require('config');
const jwt = require('jsonwebtoken');

const redis = require(`${appRoot}/redis`);

module.exports = async (uuid) => {
    try {

        if (!uuid) {
            return null;
        }

        let userData = await redis.get(`user-${uuid}`);

        /*
         * clean user cache data
         */
        if (userData) {
            await Promise.all([
                redis.del(`user-${uuid}`),
                redis.del(`user-${userData.refreshToken}`),
                redis.del(`user-${userData.jwtToken}`)
            ]);
        }

        const jwtToken = jwt.sign({ uuid }, config.get('JWT.secret'), { expiresIn: config.get('JWT.expiresIn') });
        const refreshToken = chance.string({ length: 128, alpha: true, numeric: true });

        let authCacheData = {
            uuid,
            jwtToken,
            refreshToken
        };

        await Promise.all([
            redis.set(`user-${refreshToken}`, authCacheData, config.get('JWT.refreshTokenExpired')),
            redis.set(`user-${uuid}`, authCacheData, config.get('JWT.refreshTokenExpired')),
            redis.set(`user-${jwtToken}`, authCacheData, config.get('JWT.tokenExpired')),
        ]);

        return authCacheData;
    } catch (err) {
        return err;
    }
}