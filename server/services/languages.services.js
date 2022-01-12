const axios = require('axios');
const { STATUS_CODE } = require('../configurations');

const getLanguages = async (api_key) => {
    try {
        const { data: languages } = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${api_key}`);
        if (!languages) return { error: 'Not found languages', statusCode: STATUS_CODE.NOT_FOUND }
        return { data: languages, statusCode: STATUS_CODE.CREATED };
    } catch (err) {
        console.error('getLanguages: ', err);
    }
};

module.exports = {
    getLanguages
}