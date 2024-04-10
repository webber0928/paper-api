const client = require(`${appRoot}/redis/client`);

module.exports = async (key, value, expire) => {
    try {

        let valueString = JSON.stringify(value);
        await client.setAsync(key, valueString);

        if (expire) {
            await client.expireAsync(key, expire);
        }

        return value;
    } catch (err) {
        return err;
    }
};