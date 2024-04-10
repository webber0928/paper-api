/*
 * 算出基金投資區域分配
 *
 * assetsData = [{ assetId: 1, allocation: 50 },{ assetId: 2, allocation: 50 }]
 *
 *
 */

const Promise = require('bluebird');
const _ = require('lodash');
const { Regions ,FundRegionMapping } = require(`${appRoot}/models`);

module.exports = async (assetsData = []) => {
    try {

        let result = {};

        await Promise.mapSeries(assetsData, async (data) => {
            let fundAllocation = data.allocation / 100;
            let regions = await FundRegionMapping.findAll({
                where: {
                    assetId: data.assetId
                },
                include: [
                    {
                        model: Regions,
                        as: 'Region',
                        attributes: [
                            'name'
                        ]
                    }
                ],
            });

            _.forEach(regions, (item) => {
                // let percentage = (item.percentage / 100) * fundAllocation
                let percentage = item.percentage * fundAllocation;
                result[item.Region.name] = result[item.Region.name] ? result[item.Region.name] += percentage : percentage;
                result[item.Region.name] = Math.round(result[item.Region.name] * 100) / 100;
            });
        });

        let names = [];
        let values = [];

        _.forEach(result, (value, key) => {
            names.push(key);
            values.push(value);
        });

        return {
            result,
            names,
            values
        };
    } catch (err) {
        return err;
    }
};