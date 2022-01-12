const { STATUS_CODE } = require('../configurations');
const { MOVIES_REPOSITORIES, GENRES_REPOSITORIES } = require('../dataBase/repositories');
const { checkUserData } = require('./signIn');
const { MOVIES_SERVICES } = require('../services');

const setMovies = async ({ login, password }) => {
    try {
        const { data: { checkUserRole } } = await checkUserData({ login, password });

        if (checkUserRole !== 'admin') return { error: "Invalid admin" };
        await MOVIES_REPOSITORIES.getIdMovies();
        return { data: "Movies was set" };
    } catch (err) {
        console.error('setMoviesControll: ', err);
        return { error: err };
    }
};

const getMovies = async (query) => {
    try {
        const movies = await MOVIES_REPOSITORIES.getMovies(query);
        if (!movies[0]) return { data: 'Not found', status: STATUS_CODE.NOT_FOUND };

        const table = await MOVIES_SERVICES.formatMovies(movies);
        return { data: table, status: 200 };
    } catch (err) {
        console.error('getMovies: ', err);
        return { error: err };
    }
};

const getMovieById = async (movie_id) => {
    try {
        const { data } = await MOVIES_REPOSITORIES.getMovieById(movie_id);
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