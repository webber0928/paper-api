const client = require(`${appRoot}/redis/client`);

module.exports = async (key) => {
    try {
        await client.delAsync(key);
        return {};
    } catch (err) {
        return err;
    }
};