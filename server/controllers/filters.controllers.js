const { getGenres } = require('./genres.controlles');
const { getLanguages } = require('./languages.controllers');

const getfilters = async () => {
    const { data: genres } = await getGenres();
    const { data: languages } = await getLanguages();
    return { data: { genres, languages } };
};

module.exports = {
    getfilters
}