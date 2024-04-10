
const _ = require('lodash');

const { Users, Roles, UserRoleMapping } = require(`${appRoot}/models`);

module.exports = async (ctx, next) => {
    try {

        let { id } = ctx.state.User;

        let user = await Users.findOne({
            where: {
                id
            }
        });

        if (!user) {
            throw new Error('1005');
        }

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

        return ctx.body = ctx.formatApi({
            data: {
                user: user,
                roles
            }
        });
    } catch (err) {
        return ctx.throw(err);
    }
}; 