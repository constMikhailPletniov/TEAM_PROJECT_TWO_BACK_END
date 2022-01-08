const { STATUS_CODE } = require('../configurations');
const { MOVIES_REPOSITORIES, GENRES_REPOSITORIES } = require('../dataBase/repositories');

const setMoviesControll = async ({ user_role }) => {
    try {
        if (!user_role === 'admin') return { error: "Invalid admin" };
        await MOVIES_REPOSITORIES.getIdMovies();
        return { data: "Movies was set" };
    } catch (err) {
        console.error('setMoviesControll: ', err);
        return { error: err };
    }
};

const getMovies = async (query) => {
    const table = [];
    try {
        const movies = await MOVIES_REPOSITORIES.getMovies(query);
        if (!movies[0]) return { data: 'Not found', status: STATUS_CODE.NOT_FOUND };

        for (let element of movies) {
            let id = element.id
            const { error: dbError, data: result } = await GENRES_REPOSITORIES.getGenresById(id);
            if (dbError) return { error: { status: 500, data: { error } } };
            const row = {
                id: element.id,
                adult: element.adult,
                backdrop_path: element.backdrop_path,
                budget: element.budget,
                homepage: element.homepage,
                imdb_id: element.imdb_id,
                original_language: element.original_language,
                original_title: element.original_title,
                title: element.title,
                overview: element.overview,
                popularity: element.popularity,
                poster_path: element.poster_path,
                release_date: element.release_date,
                revenue: element.revenue,
                runtime: element.runtime,
                tagline: element.tagline,
                trailer: element.trailer,
                genres: result
            }
            table.push(row);
        }
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

const getMoviesByGenresId = async (id) => {
    try {
        const { data } = await MOVIES_REPOSITORIES.getMoviesByGenresId(id);
        console.log(data);
        return { data: data };
    } catch (err) {
        console.error('getMoviesByGenresId contrl: ', err);
        return { error: err };
    }
};

module.exports = {
    setMoviesControll,
    getMovies,
    getMovieById,
    getMoviesByGenresId
}