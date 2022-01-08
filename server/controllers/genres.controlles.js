const axios = require('axios');
const { GENRES_REPOSITORIES } = require('../dataBase/repositories');
const { STATUS_CODE } = require('../configurations');

const setGenres = async ({ user_role, api_key }) => {
    try {
        if (!user_role === 'admin') return { error: "Invalid admin" };
        const { data: { genres } } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`);

        for (const item of genres) {
            await GENRES_REPOSITORIES.setGenres(item);
        }
        return { data: "Genres was set" };
    } catch (err) {
        console.error('getGenres: ', err);
        return { error: err };
    }

};
const getGenres = async () => {
    try {
        const { data } = await GENRES_REPOSITORIES.getGenres();
        if (!data) return { error: { data: 'Not found', status: STATUS_CODE.NOT_FOUND } };
        return { data: data };

    } catch (err) {
        console.error('getGenres: ', err);
        return { error: err };
    }
};

module.exports = {
    setGenres,
    getGenres
}