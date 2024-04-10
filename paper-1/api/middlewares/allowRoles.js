/*
 * 確認權限
 */

const _ = require('lodash');

const { UserRoleMapping, Roles } = require(`${appRoot}/models`);

module.exports = (allowRoles = []) => async (ctx, next) => {
    try {

        let allowAccess = false;

        if (_.includes(allowRoles, 'all') === true) {
            return next();
        }

        if (allowRoles.length === 0) {
            return next();
        }

        if (!ctx.state.User) {
            throw new Error('1005');
        }

        /*
         * get user roles
         */
        let rolesMappingData = await UserRoleMapping.findAll({
            where: {
                userId: ctx.state.User.id
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

        let userRoles = _.map(rolesMappingData, (item) => {
            return item.Role.name
        });

        let userAllowRoles = _.filter(userRoles, (role) => {
            return _.includes(allowRoles, role);
        });

        allowAccess = userAllowRoles.length > 0 ? true : false;

        if (allowAccess === false) {
            throw new Error('1012');
        }

        return next();
    } catch (err) {
        return ctx.throw(err);
    }
};