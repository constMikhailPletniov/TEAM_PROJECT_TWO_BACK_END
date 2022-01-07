const axios = require('axios');
const { GENRES_REPOSITORIES } = require('../dataBase/repositories');

const getGenres = async ({ user_role, api_key }) => {
    try {
        if (!user_role === 'admin') return { error: "Invalid admin" };
        const { data: { genres } } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`);
        for (const item of genres) {
            await GENRES_REPOSITORIES.setGenres(item);
        }

    } catch (err) {
        console.error('getGenres: ', err);
        return { error: err };
    }

};

module.exports = {
    getGenres
}