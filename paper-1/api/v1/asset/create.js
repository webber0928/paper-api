
const Promise = require('bluebird');

const { sequelize, Assets, FundAllocationMapping, FundRegionMapping } = require(`${appRoot}/models`);

module.exports = async (ctx, next) => {
    try {
        let {
            isin,
            name,
            nameEng,
            riskRating,
            investRegion,
            fundType,
            returnRate,
            regions = [],
            allowcations = []
        } = ctx.request.body;

        let newAsset = null;

        await sequelize.transaction(async (t) => {

            newAsset = await Assets.create({
                isin,
                name,
                nameEng,
                riskRating,
                investRegion,
                fundType,
                returnRate
            }, { transaction: t });

            await Promise.map(regions, async (regionData) => {
                await FundRegionMapping.create({
                    assetId: newAsset.id,
                    regionId: regionData.regionId,
                    percentage: regionData.percentage
                }, { transaction: t });
            });

            await Promise.map(allowcations, async (allowcationData) => {
                await FundAllocationMapping.create({
                    assetId: newAsset.id,
                    allocationId: allowcationData.allocationId,
                    percentage: allowcationData.percentage
                }, { transaction: t });
            });

        }).catch((err) => {
            console.log(err);
            throw new Error('1001');
        });

        return ctx.body = ctx.formatApi({
            data: {
                asset: newAsset
            }
        });
    } catch (err) {
        return ctx.throw(err);
    }
}