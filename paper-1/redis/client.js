const Promise = require('bluebird');
const config = require('config');
const redis = require('redis');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const host = config.get('redis.host');
const port = config.get('redis.port');
const db = config.get('redis.db');
const password = config.get('redis.password');

let options = {
    host: host,
    port: port,
    db: db
};

if (password !== null) {
    options.password = password;
}

const client = redis.createClient(options);

module.exports = client;

// module.exports = (options = {}) => {
//     return redis.createClient({
//         host: options.host || config.get('redis.host'),
//         port: options.port || config.get('redis.port'),
//         db: options.db || config.get('redis.db')
//     });
// };