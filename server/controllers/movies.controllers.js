const { STATUS_CODE } = require('../configurations');
const { moviesRepositories, genresRepositories } = require('../dataBase/repositories');
const { checkUserData } = require('./signIn');
const { moviesServices } = require('../services');

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
        const movies = await moviesRepositories.getMovies(query);
        if (!movies[0]) return { data: 'Not page found', status: STATUS_CODE.NOT_FOUND };

        const table = await moviesServices.formatMovies(movies);
        return { data: table, status: 200 };
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