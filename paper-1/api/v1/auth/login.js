
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const libs = require(`${appRoot}/libs`);
const { Users, UserRoleMapping, Roles } = require(`${appRoot}/models`);

module.exports = async (ctx, next) => {
    try {

        /*
         * check user and password
         */
        let { email, password } = ctx.request.body;

        let user = await Users.findOne({
            where: {
                email
            }
        });

        if (!user) {
            throw new Error('1005');
        }

        if (await libs.user.comparePassword(password, user.password) !== true) {
            throw new Error('1006')
        }

        /*
         * get user roles
         */
        let rolesMappingData = await UserRoleMapping.findAll({
            where: {
                userId: user.id
            },
            attributes: ['id', 'userId', 'roleId'],
            include: [
                {
                    model: Roles,
                    as: 'Role',
                    attributes: ['id', 'name'],
                }
            ]
        });

        let roles = _.map(rolesMappingData, (item) => {
            return item.Role.name
        });

        /*
         * generate jwt token
         */
        let { jwtToken: token, refreshToken } = await libs.user.generateTokens(user.uuid);

        ctx.set('X-Webzz-Token', token);
        return ctx.body = ctx.formatApi({
            data: {
                token,
                refreshToken,
                user: user,
                roles
            }
        });
    } catch (err) {
        return ctx.throw(err);
    }
};