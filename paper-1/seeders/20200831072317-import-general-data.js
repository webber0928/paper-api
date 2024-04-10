const appRoot = require('app-root-path');
const Promise = require('bluebird');

const { Roles, Allocations, Regions, Assets, FundAllocationMapping, FundRegionMapping } = require(`${appRoot}/models`);

const roles = [
    {
        name: 'admin'
    },
    {
        name: 'admin-compliance'
    },
    {
        name: 'investor'
    },
    {
        name: 'advisor'
    },
    {
        name: 'advisor-compliance'
    }
];

const allocations = [
    {
        name: 'stock'
    },
    {
        name: 'cash'
    },
    {
        name: 'bond'
    },
    {
        name: 'other'
    }
];

const regions = [
    {
        name: '全球'
    },
    {
        name: '美國'
    },
    {
        name: '台灣'
    },
    {
        name: '歐洲'
    }
];

const funds = [
    {
        isin: 'AAA111',
        name: '<demo> 全球比特幣基金',
        nameEng: '<demo> Global Bitcoin Fund',
        fundType: '全球基金',
        riskRating: 5,
        returnRate: 8
    },
    {
        isin: 'BBB222',
        name: '<demo> 全球黃金基金',
        nameEng: '<demo> Global Gold Fund',
        fundType: '全球基金',
        riskRating: 2,
        returnRate: 5
    },
    {
        isin: 'CCC333',
        name: '<demo> 美國股票基金',
        nameEng: '<demo> US Stock Fund',
        fundType: '美國基金',
        riskRating: 1,
        returnRate: 10
    },
    {
        isin: 'DDD444',
        name: '<demo> 東南亞礦產基金',
        nameEng: '<demo> Southeast Asia Mineral Fund',
        fundType: '東南亞基金',
        riskRating: 1,
        returnRate: 3
    },
    {
        isin: 'EEE555',
        name: '<demo> 歐洲黃金基金',
        nameEng: '<demo> Europe Gold Fund',
        fundType: '歐洲基金',
        riskRating: 1,
        returnRate: 4
    },
    {
        isin: 'FFF666',
        name: '<demo> 台灣電子菸基金',
        nameEng: '<demo> Taiwan Vape Fund',
        fundType: '台灣基金',
        riskRating: 2,
        returnRate: 6
    },
    {
        isin: 'GGG777',
        name: '<demo> 台幣',
        nameEng: '<demo> TWD',
        type: 'CASH',
        fundType: '未知',
        riskRating: 1,
        returnRate: 1
    },
    {
        isin: 'HHH888',
        name: '<demo> 美金',
        nameEng: '<demo> USD',
        type: 'CASH',
        fundType: '未知',
        riskRating: 1,
        returnRate: 2
    }
];

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await Promise.mapSeries(roles, async (role) => {
            return await Roles.create(role);
        });

        await Promise.mapSeries(funds, async (fund) => {
            return await Assets.create(fund);
        });

        await Promise.mapSeries(allocations, async (allocation) => {
            return await Allocations.create(allocation);
        });

        await Promise.mapSeries(regions, async (region) => {
            return await Regions.create(region);
        });

        await Promise.all([
            FundAllocationMapping.create({
                assetId: 1,
                allocationId: 1,
                percentage: 40
            }),
            FundAllocationMapping.create({
                assetId: 1,
                allocationId: 2,
                percentage: 40
            }),
            FundAllocationMapping.create({
                assetId: 1,
                allocationId: 3,
                percentage: 20
            }),
            FundRegionMapping.create({
                assetId: 1,
                regionId: 1,
                percentage: 20
            }),
            FundRegionMapping.create({
                assetId: 1,
                regionId: 2,
                percentage: 80
            })
        ]);

        await Promise.all([
            FundAllocationMapping.create({
                assetId: 2,
                allocationId: 1,
                percentage: 50
            }),
            FundAllocationMapping.create({
                assetId: 2,
                allocationId: 3,
                percentage: 50
            }),
            FundRegionMapping.create({
                assetId: 2,
                regionId: 2,
                percentage: 50
            }),
            FundRegionMapping.create({
                assetId: 2,
                regionId: 3,
                percentage: 50
            })
        ]);

        await Promise.all([
            FundAllocationMapping.create({
                assetId: 3,
                allocationId: 1,
                percentage: 100
            }),
            FundRegionMapping.create({
                assetId: 3,
                regionId: 2,
                percentage: 10
            }),
            FundRegionMapping.create({
                assetId: 3,
                regionId: 2,
                percentage: 90
            })
        ]);

        await Promise.all([
            FundAllocationMapping.create({
                assetId: 4,
                allocationId: 1,
                percentage: 65
            }),
            FundAllocationMapping.create({
                assetId: 4,
                allocationId: 2,
                percentage: 35
            }),
            FundRegionMapping.create({
                assetId: 4,
                regionId: 1,
                percentage: 30
            }),
            FundRegionMapping.create({
                assetId: 4,
                regionId: 2,
                percentage: 30
            }),
            FundRegionMapping.create({
                assetId: 4,
                regionId: 3,
                percentage: 40
            })
        ]);

        await Promise.all([
            FundAllocationMapping.create({
                assetId: 5,
                allocationId: 1,
                percentage: 55
            }),
            FundAllocationMapping.create({
                assetId: 5,
                allocationId: 2,
                percentage: 45
            }),
            FundRegionMapping.create({
                assetId: 5,
                regionId: 4,
                percentage: 100
            })
        ]);

        await Promise.all([
            FundAllocationMapping.create({
                assetId: 6,
                allocationId: 1,
                percentage: 90
            }),
            FundAllocationMapping.create({
                assetId: 6,
                allocationId: 2,
                percentage: 10
            }),
            FundRegionMapping.create({
                assetId: 6,
                regionId: 3,
                percentage: 100
            })
        ]);

        await Promise.all([
            FundAllocationMapping.create({
                assetId: 7,
                allocationId: 2,
                percentage: 100
            }),
            FundRegionMapping.create({
                assetId: 7,
                regionId: 3,
                percentage: 100
            })
        ]);

        await Promise.all([
            FundAllocationMapping.create({
                assetId: 8,
                allocationId: 2,
                percentage: 100
            }),
            FundRegionMapping.create({
                assetId: 8,
                regionId: 2,
                percentage: 100
            })
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await Allocations.destroy({
            where: {},
            truncate: true
        });

        await Regions.destroy({
            where: {},
            truncate: true
        });
    }
};
