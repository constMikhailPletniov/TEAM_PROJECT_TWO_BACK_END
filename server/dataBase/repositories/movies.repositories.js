const axios = require('axios');
const client = require('../dataBases');

let count = 1;

const setMovies = async ({ id }, genresItem) => {
    try {

        const { data: { adult, backdrop_path, budget, homepage, imdb_id, original_language, original_title, overview, popularity, poster_path, release_date, revenue, runtime, genres } } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=483f32e50b323d6e44691437daeb45e7`);
        console.log(genres);
        //  const result = await client.query(`INSERT INTO movies(adult, backdrop_path, budget, homepage, imdb_id, original_language, original_title, overview, popularity, poster_path, release_date, revenue, runtime)
        //  VALUES(${adult},'${backdrop_path}',${budget},'${homepage}','${imdb_id}','${original_language}','${original_title}','${overview}',${popularity},'${poster_path}','${release_date}',${revenue},${runtime})`);

        //  return { data: result };
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

        if (count > 12) {
            return;
        }
        getIdMovies();
    } catch (err) {
        console.error('getIdMovies: ', err);
        return { error: err };
    }
};

// const getGenres = async () => {
//     try {
//         const { genres } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=483f32e50b323d6e44691437daeb45e7`);

//         for (const item of genres) {
//             await setMovies(null, item);
//         }
//     } catch (err) {
//         console.error('getGenres: ', err);
//         return { error: err };
//     }

// };
// getGenres();
module.exports = {
    getIdMovies,
    setMovies
}