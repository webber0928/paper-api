
const Promise = require('bluebird');

const libs = require(`${appRoot}/libs`);
const { sequelize, Users, Roles, UserRoleMapping } = require(`${appRoot}/models`);

module.exports = async (ctx, next) => {
    try {
        let { name, email, password } = ctx.request.body;

        let [ role, existUser ] = await Promise.all([
            Roles.findOne({
                where: {
                    name: 'investor'
                }
            }),
            Users.findOne({
                where: {
                    email
                }
            })
        ]);

        if (existUser) {
            throw new Error('1013');
        }

        if (!role) {
            throw new Error('1014');
        }

        let user = null;

        await sequelize.transaction(async (t) => {

            user = await Users.create({
                name,
                email,
                password: await libs.user.hashPassword(password)
            }, { transaction: t })

            // [ user ] = await Users.findOrCreate({
            //     where: {
            //         email
            //     },
            //     defaults: {
            //         name,
            //         password: await libs.user.hashPassword(password)
            //     },
            //     transaction: t
            // });

            await UserRoleMapping.findOrCreate({
                where: {
                    userId: user.id,
                    roleId: role.id
                },
                defaults: {},
                transaction: t
            });

        }).catch((err) => {
            console.log(err);
            throw new Error('1001');
        });

        return ctx.body = ctx.formatApi({
            data: {
                user: user
            }
        });
    } catch (err) {
        return ctx.throw(err);
    }
}; 