const axios = require('axios');
const { STATUS_CODE } = require('../configurations');

const getLanguages = async () => {
    try {
        const { data: languages } = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=483f32e50b323d6e44691437daeb45e7`);
        if (!languages) return { error: { data: 'Not found', status: STATUS_CODE.NOT_FOUND } }
        return { data: languages };
    } catch (err) {
        console.error('getLanguages: ', err);
    }
};

module.exports = {
    getLanguages
}