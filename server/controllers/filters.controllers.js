const { getGenres } = require('./genres.controlles');
const { getLanguages } = require('../services/languages.services');
const { STATUS_CODE } = require('../configurations');

const getfilters = async () => {
    try {
        const { data: genres } = await getGenres();
        const { data: languages } = await getLanguages();
        return { data: { genres, languages } };
    } catch (err) {
        return { error: { message: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR } }
    }
};

module.exports = {
    getfilters
}