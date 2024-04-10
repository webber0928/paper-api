
module.exports = {
    generateTokens: require(`${appRoot}/libs/user/generateTokens`),
    comparePassword: require(`${appRoot}/libs/user/comparePassword`),
    hashPassword: require(`${appRoot}/libs/user/hashPassword`),
};