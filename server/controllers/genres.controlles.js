const axios = require('axios');
const { genresRepositories } = require('../dataBase/repositories');
const { STATUS_CODE } = require('../configurations');
const { checkUserData } = require('./signIn.controllers');
const { jwtServices } = require('../services');

const setGenres = async ({ login, password, api_key }, token) => {
    try {
        const { error: tokenError } = jwtServices.verifyTokens(token);
        if (tokenError) return { error: { message: tokenError, statusCode: STATUS_CODE.UNAUTHORIZED } };
        const { data: { checkUserRole } } = await checkUserData({ login, password });
        if (checkUserRole !== 'admin') return { error: { message: "Invalid admin", statusCode: STATUS_CODE.FORBIDDEN } };

        const { data: { genres } } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`);

        for (const item of genres) {
            await genresRepositories.setGenres(item);
        }
        return { data: { data: "Genres was set", statusCode: STATUS_CODE.CREATED } };
    } catch (err) {
        return { error: err };
    }

};
const getGenres = async () => {
    try {
        const { data } = await genresRepositories.getGenres();
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