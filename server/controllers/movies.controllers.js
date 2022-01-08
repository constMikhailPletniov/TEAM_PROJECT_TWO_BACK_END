const { STATUS_CODE } = require('../configurations');
const { MOVIES_REPOSITORIES } = require('../dataBase/repositories');

const setMoviesControll = async ({ user_role }) => {
    try {
        if (!user_role === 'admin') return { error: "Invalid admin" };
        const data = await MOVIES_REPOSITORIES.getIdMovies();
        console.log(data);
        if (!data) return { error: "From api No data" };
        return { data: data };
    } catch (err) {
        console.error('setMoviesControll: ', err);
        return { error: err };
    }
};

const getMovies = async () => {
    try {
        const { data } = await MOVIES_REPOSITORIES.getMovies();
        if (!data[0]) return { data: 'Not found', status: STATUS_CODE.NOT_FOUND };

        return { data: data };
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
    setMoviesControll,
    getMovies,
    getMovieById
}