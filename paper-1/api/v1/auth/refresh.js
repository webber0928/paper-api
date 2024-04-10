/*
 * 更新 jwt 的 token 與 refresh token
 */

const redis = require(`${appRoot}/redis`);
const libs = require(`${appRoot}/libs`);

module.exports = async (ctx, next) => {
    try {
        let { refreshToken } = ctx.request.body;

        if (!refreshToken) {
            throw new Error('1008');
        }

        const key = `user-${refreshToken}`;

        let result = await redis.get(key);

        if (!result || !result.uuid) {
            throw new Error('1007');
        }

        const { jwtToken: newToken, refreshToken: newfreshToken } = await libs.user.generateTokens(result.uuid);

        return ctx.body = ctx.formatApi({
            data: {
                token: newToken,
                refreshToken: newfreshToken
            }
        });
    } catch (err) {
        return ctx.throw(err);
    }
}