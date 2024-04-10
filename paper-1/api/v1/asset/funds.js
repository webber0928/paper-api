/*
 * 基金列表
 */

const { Sequelize, Assets } = require(`${appRoot}/models`);

module.exports = async (ctx, next) => {
    try {

        let { name, risk } = ctx.query;

        let query = {};

        if (name) {
            query.name = { [Sequelize.Op.like]: `%${name}%` }
        }

        if (risk) {
            query.riskRating = parseInt(risk, 10);
        }

        let assets = await Assets.findAll({
            where: query
        });

        return ctx.body = ctx.formatApi({
            data: {
                total: assets.length,
                items: assets
            }
        });

    } catch (err) {
        return ctx.throw(err);
    }
}
