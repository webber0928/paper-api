
module.exports = async (fundrichId) => {
    try {
        if (!fundrichId) {
            throw new Error('fundrichId not found');
        }

        console.log(`fundrichId = ${fundrichId}`)

        let options = {
            baseURL: `https://www.fundrich.com.tw/fund/${fundrichId}.html?id=${fundrichId}`,
            method: 'GET'
        };
        let { data } = await axios(options).catch((err) => { console.log(err); });

        console.log(data);

        return null;
    } catch (err) {
        return err;
    }
};