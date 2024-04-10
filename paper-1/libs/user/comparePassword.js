/*
 * 加密密碼比對
 */

const bcrypt = require('bcrypt');

module.exports = async (unhashPassword, hashPassword ) => {
    try {
        let result = await bcrypt.compare(unhashPassword, hashPassword);
        return result;
    } catch (err) {
        return err;
    }
};