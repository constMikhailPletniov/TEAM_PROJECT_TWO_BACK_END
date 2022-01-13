const { getGenresById } = require('../dataBase/repositories/genres.repositories');

const formatMovies = async (movies) => {
    const table = []
    //console.log('servise: ', movies);

    for (let element of movies) {
        let id = element.id
        const array = await getGenresById(id);
        console.log(array);
        const row = {
            genres: array,
            ...element,
            // id: element.id,
            // adult: element.adult,
            // backdrop_path: element.backdrop_path,
            // budget: element.budget,
            // homepage: element.homepage,
            // imdb_id: element.imdb_id,
            // original_language: element.original_language,
            // original_title: element.original_title,
            // title: element.title,
            // overview: element.overview,
            // popularity: element.popularity,
            // poster_path: element.poster_path,
            // release_date: element.release_date,
            // revenue: element.revenue,
            // runtime: element.runtime,
            // tagline: element.tagline,
            // trailer: element.trailer,
        }
        table.push(row);
    }
    return table;
};

module.exports = {
    formatMovies
}