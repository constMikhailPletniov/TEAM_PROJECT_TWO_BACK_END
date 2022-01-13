const { getGenres } = require('./genres.controlles');
const { getLanguages } = require('./languages.controllers');
const { STATUS_CODE } = require('../configurations');

const getfilters = async () => {
    try {
        const { data: genres } = await getGenres();
        const { data: languages } = await getLanguages();
        return { data: { data: { genres, languages }, statusCode: STATUS_CODE.OK } };
    } catch (err) {
        return { error: { message: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR } }
    }
};

module.exports = {
    getfilters
}