const { STATUS_CODE } = require('../configurations');
const { moviesRepositories } = require('../dataBase/repositories');
const { checkUserData } = require('./signIn.controllers');
const { moviesServices, jwtServices } = require('../services');

const setMovies = async ({ login, password }) => {
    try {
        const { data: { checkUserRole } } = await checkUserData({ login, password });

        if (checkUserRole !== 'admin') return { error: "Invalid admin" };
        await moviesRepositories.getIdMovies();
        return { data: "Movies was set" };
    } catch (err) {
        console.error('setMoviesControll: ', err);
        return { error: err };
    }
};

const getMovies = async (query) => {
    try {
        const { error: tokenError } = jwtServices.verifyTokens(query.token);
        if (tokenError) return { error: { message: tokenError, statusCode: STATUS_CODE.UNAUTHORIZED } };
        const { result } = await moviesRepositories.getMovies(query);
        if (!result.data[0]) return { error: { error: 'Not page found', statusCode: STATUS_CODE.NOT_FOUND } };
        const table = await moviesServices.formatMovies(result);

        return { data: { data: { data: table, totalCount: result.totalCount }, statusCode: STATUS_CODE.OK } };
    } catch (err) {
        console.error('getMovies: ', err);
        return { error: err };
    }
};

const getMovieById = async (movie_id) => {
    try {
        const { data } = await moviesRepositories.getMovieById(movie_id);
        if (!data[0]) return { data: 'Not found', status: STATUS_CODE.NOT_FOUND };

        return { data: data };
    } catch (err) {
        console.error('getMovieById: ', err);
        return { error: err };
    }
};

module.exports = {
    setMovies,
    getMovies,
    getMovieById
}