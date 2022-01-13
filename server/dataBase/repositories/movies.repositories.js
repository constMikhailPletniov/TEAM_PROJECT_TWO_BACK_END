const axios = require('axios');
const client = require('../dataBase');
const { STATUS_CODE, CONSTANTS } = require('../../configurations');
const { requestValidate } = require('../../utils');
const { formatMovies } = require('../../services/movies.services');

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

const changeReplace = (element) => {
    element = element.replace(/'/gi, '\'\'');
    return element;
};

const setMovies = async ({ id }) => {
    try {

        let { data: { adult, backdrop_path, budget, homepage, imdb_id, original_language, original_title, title, overview, popularity, poster_path, release_date, revenue, runtime, genres, tagline } } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=483f32e50b323d6e44691437daeb45e7`);

        const idResult = await client.query(`SELECT imdb_id FROM movies WHERE imdb_id='${imdb_id}';`);
        if (idResult.rowCount !== 0) return { error: "The movie is exist in dataBase" };
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=483f32e50b323d6e44691437daeb45e7`);
        if (!data.results[0]) return;
        const trailer = data.results[0].key;
        tagline = changeReplace(tagline);
        original_title = changeReplace(original_title);
        title = changeReplace(title);
        overview = changeReplace(overview);
        const result = await client.query(`INSERT INTO movies(adult, backdrop_path, budget, homepage, imdb_id, original_language, original_title, title, overview, popularity, poster_path, release_date, revenue, runtime,tagline, trailer)
        VALUES(${adult},'${backdrop_path}',${budget},'${homepage}','${imdb_id}','${original_language}','${original_title}', '${title}','${overview}',${popularity},'${poster_path}','${release_date}',${revenue},${runtime},'${tagline}','${trailer}') returning*;`);

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
        if (count > 20) {
            return;
        }
        getIdMovies();
    } catch (err) {
        console.error('getIdMovies: ', err);
        return { error: err };
    }
};

const getMovies = async ({ adult, page, perPage, title, languages, genre_id,
    budget_min, budget_max, release_date_min, release_date_max }) => {
    const options = [];
    try {
        const validate = await requestValidate.queryValidate.validateAsync({ page, perPage });
        let pgQuery = CONSTANTS.SELECT_QUERY_WITHOUT_GENRES;
        let totalCountQuery = CONSTANTS.SELECT_QUERY_WITHOUT_GENRES_TOTALCOUNT;
        if (genre_id) {
            pgQuery = CONSTANTS.SELECT_QUERY_WITH_GENRES;
            totalCountQuery = CONSTANTS.SELECT_QUERY_WITH_GENRES_TOTALCOUNT;
            options.push(`genre_id = ${genre_id}`);
        }
        if (adult) options.push(`movies.adult = ${adult}`);
        if (budget_min) options.push(`movies.budget > ${budget_min}`);
        if (budget_max) options.push(`movies.budget < ${budget_max}`);
        if (title) options.push(`movies.title ILIKE '%${title}%'`);
        if (languages) options.push(`movies.original_language = '${languages}'`);
        if (release_date_min && release_date_max) options.push(`movies.release_date BETWEEN '${new Date(release_date_min).toDateString()}' 
        AND '${new Date(release_date_max).toDateString()}' `);
        if (options.length !== 0) {
            pgQuery += `WHERE ${options.join(' AND ')} `;
            totalCountQuery += `WHERE ${options.join(' AND ')} `;
            options.length = 0;
        }
        pgQuery += `ORDER BY id OFFSET ${(validate.page - 1) * validate.perPage} LIMIT ${validate.perPage};`;
        totalCountQuery = totalCountQuery.trim();
        totalCountQuery += `;`;
        console.log('query: ', pgQuery);
        const movies = await client.query(pgQuery);
        const totalCount = await client.query(totalCountQuery);
        console.log('movies: ', movies.rows);
        return { result: { data: movies.rows, totalCount: totalCount.rows[0].count } };
    }
    catch (err) {
        console.error('getMovies repo: ', err);
        return { error: err };
    }
}

const getMovieById = async (movie_id) => {
    try {
        const movie = await client.query(`SELECT * FROM movies_genres INNER JOIN movies
        ON movie_id = movies.id WHERE movies.id = ${movie_id};`);
        if (!movie.rows[0]) return { error: { message: 'Not found', statusCode: STATUS_CODE.NOT_FOUND } };
        return { data: await formatMovies(movie.rows) };
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