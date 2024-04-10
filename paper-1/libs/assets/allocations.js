/*
 * 算出基金投資分配
 *
 * assetsData = [{ assetId: 1, allocation: 50 },{ assetId: 2, allocation: 50 }]
 *
 *
 */

const Promise = require('bluebird');
const _ = require('lodash');
const { Allocations, FundAllocationMapping } = require(`${appRoot}/models`);

module.exports = async (assetsData = []) => {
    try {
        let result = {};

        let allAllwcations = await Allocations.findAll({
            where: {}
        });

        _.forEach(allAllwcations, (allocation) => {
            result[allocation.name] = 0;
        });

        await Promise.mapSeries(assetsData, async (data) => {
            let fundAllocation = data.allocation / 100;
            let allocations = await FundAllocationMapping.findAll({
                where: {
                    assetId: data.assetId
                },
                include: [
                    {
                        model: Allocations,
                        as: 'Allocation',
                        attributes: [
                            'name'
                        ]
                    }
                ],
            });

            _.forEach(allocations, (item) => {
                // let percentage = (item.percentage / 100) * fundAllocation;
                let percentage = item.percentage * fundAllocation;
                result[item.Allocation.name] = result[item.Allocation.name] ? result[item.Allocation.name] += percentage : percentage;
                result[item.Allocation.name] = Math.round(result[item.Allocation.name] * 100) / 100;
            })
        });

        return result;
    } catch (err) {
        return err;
    }
};