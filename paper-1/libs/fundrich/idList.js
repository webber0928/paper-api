const appRoot = require('app-root-path');
const axios = require('axios');
const Promise = require('bluebird');
const cheerio = require('cheerio');
const _ = require('lodash');
const iconv = require('iconv-jschardet');
const chardet = require('chardet');

const { Assets } = require(`${appRoot}/models`);

const getFundInfo = require('./getFundInfo');

module.exports = async () => {
    try {

        let totalPage = 0;
        let page = 1;
        let totalCounts = 0;
        let stop = false;

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
        totalCounts = parseInt(data['total-count'], 10);
        totalPage = Math.ceil(totalCounts / data['count-per-page']);

        do {
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

                const $fundclear = cheerio.load(fundclearHTML);

                if ($fundclear('h1').text().replace(/^\s+|\s+$/g, '') !== '無相關資料。') {
                    investRegion = $fundclear('.FieldContent').eq(35).text();
                    console.log(investRegion)
                }


                if (asset) {
                    asset.set('investRegion', investRegion ? investRegion : null);
                    await asset.save();
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            return resolve();
                        }, 2000);
                    });
                }

                const fundrichId = fundrichItem.id;

                let options = {
                    baseURL: `https://www.fundrich.com.tw/fund/${fundrichId}.html?id=${fundrichId}`,
                    method: 'GET'
                };
                let { data } = await axios(options).catch((err) => { console.log(err); });

                const $ = cheerio.load(data);
                let fundRawData = $('script').get()[11].children[0].data;
                fundRawData = _.replace(fundRawData, /window.SRS =/g, '');
                fundRawData = _.replace(fundRawData, /;/g, '');
                let fundObject = JSON.parse(fundRawData)

                await Assets.create({
                    isin: fundrichItem.extent.code,
                    name: fundObject.fundDetail.Name,
                    nameEng: fundObject.fundDetail.NameEng,
                    riskRating: fundObject.fundDetail.RiskRatingFromEst,
                    investRegion
                });

                return new Promise((resolve) => {
                    setTimeout(() => {
                        return resolve();
                    }, 2000);
                });
            });

            page += 1;

            await new Promise((resolve) => {
                setTimeout(() => {
                    return resolve();
                }, 1000);
            });
        }
        while (page !== totalPage);
    } catch (err) {
        console.log(err)
        return null
    }
};