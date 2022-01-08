const axios = require('axios');
const client = require('../dataBases');
const { STATUS_CODE } = require('../../configurations');

let count = 1;

const getGenresId = async (movieId, genresArray) => {
    try {
        for (const item of genresArray) {
            await setMoviesGenres(movieId, item);
        }
    } catch (err) {
        console.error('getGenresId: ', err);
        return { error: err };
    }

};

const setMoviesGenres = async (movieId, { id: genresId }) => {
    try {
        await client.query(`INSERT INTO movies_genres(movie_id,genre_id) 
        VALUES(${movieId},${genresId});`);
    } catch (err) {
        console.error('setMoviesGenres: ', err);
        return { error: err };
    }

};

const setMovies = async ({ id }) => {
    try {

        let { data: { adult, backdrop_path, budget, homepage, imdb_id, original_language, original_title, title, overview, popularity, poster_path, release_date, revenue, runtime, genres, tagline} } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=483f32e50b323d6e44691437daeb45e7`);

        const idResult = await client.query(`SELECT imdb_id FROM movies WHERE imdb_id='${imdb_id}';`);
        if (idResult.rowCount !== 0) return { error: "The movie is exist in dataBase" };
        original_title = original_title.replace(/'/gi, '\'\'');
        title = title.replace(/'/gi, '\'\'');
        overview = overview.replace(/'/gi, '\'\'');
        const result = await client.query(`INSERT INTO movies(adult, backdrop_path, budget, homepage, imdb_id, original_language, original_title, title, overview, popularity, poster_path, release_date, revenue, runtime,tagline)
        VALUES(${adult},'${backdrop_path}',${budget},'${homepage}','${imdb_id}','${original_language}','${original_title}', '${title}','${overview}',${popularity},'${poster_path}','${release_date}',${revenue},${runtime},'${tagline}') returning*;`);

        await getGenresId(result.rows[0].id, genres);

        return { data: "Films was inserted" };
    } catch (err) {
        console.error('setMovies: ', err);
        return { error: err };
    }
};


const getIdMovies = async () => {
    try {
        const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=483f32e50b323d6e44691437daeb45e7&page=${count}`);
        for (const item of results) {
            await setMovies(item);
        }
        count++;
        if (count > 50) {
            return;
        }
        getIdMovies();
    } catch (err) {
        console.error('getIdMovies: ', err);
        return { error: err };
    }
};

const formatResult = (allMovies) => {
    return allMovies.reduce((acc, item) => {
        const check = acc.find((movie) => movie.id === item.movie_id);
        const genresArr = [];
        if (!check) {

            acc.push({ genres: genresArr, ...item });
        } else {
            check.genres.push(item.genre_id);
        }
        return acc;
    }, []);
};

const getMovies = async () => {
    try {
        const allMovies = await client.query(`SELECT * FROM movies_genres INNER JOIN movies
        ON movie_id = movies.id;`);
        if (!allMovies.rows[0]) return { error: { data: 'Not found', status: STATUS_CODE.NOT_FOUND } };

        return { data: formatResult(allMovies.rows) };
    } catch (err) {
        console.error('getMovies repo: ', err);
        return { error: err };
    }
};

const getMovieById = async (movie_id) => {
    try {
        const movie = await client.query(`SELECT * FROM movies_genres INNER JOIN movies
        ON movie_id = movies.id WHERE movies.id = ${movie_id};`);
        if (!movie.rows[0]) return { error: { data: 'Not found', status: STATUS_CODE.NOT_FOUND } };

        return { data: formatResult(movie.rows) };
    } catch (err) {
        console.error('getMovies repo: ', err);
        return { error: err };
    }
};

module.exports = {
    getIdMovies,
    setMovies,
    getMovies,
    getMovieById
}