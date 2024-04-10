
const { Regions } = require(`${appRoot}/models`);

module.exports = async (ctx, next) => {
    try {
        let {
            name
        } = ctx.request.body;

        let region = await Regions.create({
            name
        });

        return ctx.body = ctx.formatApi({
            data: {
                region
            }
        });
    } catch (err) {
        return ctx.throw(err);
    }
}