const { getGenresById } = require('../dataBase/repositories/genres.repositories');

const formatMovies = async (movies) => {
    const table = []

    for (let element of movies) {
        let id = element.id
        const array = await getGenresById(id);
        const row = {
            genres: array,
            ...element,
        }
        table.push(row);
    }
    return table;
};

module.exports = {
    formatMovies
}