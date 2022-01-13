const { STATUS_CODE } = require('../configurations');
const { languagesServices, jwtServices } = require('../services');
const { } = require('../');

const setLanguages = async ({ login, password, api_key }, token) => {
    try {
        const { error: tokenError } = jwtServices.verifyTokens(token);
        if (tokenError) return { error: { message: tokenError, statusCode: STATUS_CODE.UNAUTHORIZED } };
        const { error, data } = await languagesServices.getLanguages(api_key, login, password);
        if (error) return { error: { message: error, statusCode: STATUS_CODE.BAD_REQUEST } };
        return { data: { data, statusCode: STATUS_CODE.CREATED } };
    } catch (err) {
        return { error: { message: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR } };
    }
};

const getLanguages = async () => {
    try {
        const { data } = await languagesServices.getDbLanguages();
        return { data: data };
    } catch (err) {
        return { error: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR }
    }
};

module.exports = {
    setLanguages,
    getLanguages
}