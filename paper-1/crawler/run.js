global.appRoot = require('app-root-path');

const axios = require('axios');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const _ = require('lodash');
const iconv = require('iconv-jschardet');
const chance = require('chance').Chance();

const { sequelize, Assets, FundAllocationMapping, FundRegionMapping } = require(`${appRoot}/models`);

const run = async () => {
    try {

        /*
         * get fundrich total page
         */
        let totalPage = 5;
        let page = 1;
        let totalCounts = 0;

        let options = {
            baseURL: `https://www.fundrich.com.tw/`,
            url: '/FrsWebApi/Common/ThemeFund/FundsDataInfo',
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            data: {
                page
            }
        };

        let { data } = await axios(options);
        totalCounts = parseInt(data['total-count'], 10);
        // totalPage = Math.ceil(totalCounts / data['count-per-page']);

        console.log(`totalPage: ${totalPage}`);
        console.log(`totalCounts: ${totalCounts}`);

        do {
            console.log(`current page: ${page}`);
            let options = {
                baseURL: `https://www.fundrich.com.tw/`,
                url: '/FrsWebApi/Common/ThemeFund/FundsDataInfo',
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    page
                }
            };
            let { data } = await axios(options).catch((err) => { console.log(err); });
            // console.log(data);

            if (!data) {
                continue;
            }

            if (!data.BkEzData) {
                continue;
            }

            if (!data.BkEzData.result) {
                continue;
            }

            if (!data.items.length === 0) {
                continue;
            }

            // console.log(data.items)

            let fundInfos = await Promise.mapSeries(data.items, async (fundrichItem) => {

                let investRegion = null;

                let asset = await Assets.findOne({
                    where: {
                        isin: fundrichItem.extent.code
                    }
                });

                let { data: fundclearHTML } = await await axios({
                    baseURL: `https://announce.fundclear.com.tw/MOPSFundWeb/main1.jsp?fundId=${fundrichItem.extent.code}`,
                    method: 'GET',
                    responseType: 'arraybuffer',
                    responseEncoding: 'binary'
                })
                .catch((err) => {
                    console.log(err);
                });

                fundclearHTML = iconv.decode(fundclearHTML, 'big5');

                // console.log(fundclearHTML)

                const $fundclear = cheerio.load(fundclearHTML);

                if ($fundclear('h1').text().replace(/^\s+|\s+$/g, '') !== '無相關資料。') {
                    investRegion = $fundclear('.FieldContent').eq(35).text();
                    console.log(investRegion);
                }

                if (asset) {
                    asset.set('investRegion', investRegion ? investRegion : null);
                    await asset.save();
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            return resolve();
                        }, 1000);
                    });
                }


                const fundrichId = fundrichItem.id;

                let options = {
                    baseURL: `https://www.fundrich.com.tw/fund/${fundrichId}.html?id=${fundrichId}`,
                    method: 'GET'
                };
                let { data: fundrichHTML } = await axios(options).catch((err) => { console.log(err); });

                if (!data) {
                    return null;
                }

                const $fundrich = cheerio.load(fundrichHTML);
                let fundRawData = $fundrich('script').get()[11].children[0].data;
                fundRawData = _.replace(fundRawData, /window.SRS =/g, '');
                fundRawData = _.replace(fundRawData, /;/g, '');
                let fundObject = JSON.parse(fundRawData);

                    // let qoo = await Assets.create({
                    //     isin: fundrichItem.extent.code,
                    //     name: `<demo> ${fundObject.fundDetail.Name}`,
                    //     nameEng: `<demo> ${fundObject.fundDetail.NameEng}`,
                    //     riskRating: fundObject.fundDetail.RiskRatingFromEst,
                    //     returnRate: chance.integer({ min: 0, max: 20 }),
                    //     investRegion
                    // });

                    // await FundAllocationMapping.create({
                    //     assetId: qoo.id,
                    //     allocationId: _.random(1, 4),
                    //     percentage: 100
                    // });

                    // await FundRegionMapping.create({
                    //     assetId: qoo.id,
                    //     allocationId: _.random(1, 4),
                    //     percentage: 100
                    // });

                await sequelize.transaction(async (t) => {

                    let newAsset = await Assets.create({
                        isin: fundrichItem.extent.code,
                        name: `<demo> ${fundObject.fundDetail.Name}`,
                        nameEng: `<demo> ${fundObject.fundDetail.NameEng}`,
                        riskRating: fundObject.fundDetail.RiskRatingFromEst,
                        returnRate: chance.integer({ min: 0, max: 20 }),
                        investRegion
                    }, { transaction: t });

                    await FundAllocationMapping.create({
                        assetId: newAsset.id,
                        allocationId: _.random(1, 4),
                        percentage: 100
                    }, { transaction: t });

                    await FundRegionMapping.create({
                        assetId: newAsset.id,
                        regionId: _.random(1, 4),
                        percentage: 100
                    }, { transaction: t });
                }).catch((err) => {
                    console.log(err)
                    return err;
                });

                return new Promise((resolve) => {
                    setTimeout(() => {
                        return resolve();
                    }, 5000);
                });
            });

            page += 1;
            await new Promise((resolve) => {
                setTimeout(() => {
                    return resolve();
                }, 5000);
            });
        }
        while (page !== totalPage);

    } catch (err) {
        console.log(err);
        return process.exit();
    }
};

run();