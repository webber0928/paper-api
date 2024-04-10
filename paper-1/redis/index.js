const client = require(`${appRoot}/redis/client`);
const get = require(`${appRoot}/redis/get`);
const set = require(`${appRoot}/redis/set`);
// const scan = require('./scan');
// const keys = require('./keys');
// const mget = require('./mget');
const del = require(`${appRoot}/redis/del`);
// const ttl = require('./ttl');

module.exports = {
    client,
    get,
    set,
    // scan,
    // keys,
    // mget,
    del,
    // ttl
};