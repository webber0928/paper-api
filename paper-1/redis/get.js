
const client = require(`${appRoot}/redis/client`);

module.exports = async (key) => {
    try {
        let value = await client.getAsync(key);

        if (!value) {
            return null;
        }

        let valueObject = JSON.parse(value);
        return valueObject;
    } catch (err) {
        return err;
    }
};