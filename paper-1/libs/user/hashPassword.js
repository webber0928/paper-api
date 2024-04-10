/*
 * 密碼加密
 */

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async (password) => {
    try {
        let hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        return err;
    }
};