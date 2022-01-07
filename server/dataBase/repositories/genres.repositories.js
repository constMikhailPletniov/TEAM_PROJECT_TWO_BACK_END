const client = require('../dataBases');

const setGenres = async ({ id, name }) => {
    try {
        const idResult = await client.query(`SELECT name FROM genres WHERE name='${name}';`);
        if (idResult.rowCount !== 0) return { error: "The genres is exist in dataBase" };
        const result = await client.query(`INSERT INTO genres(id,name) VALUES(${id},'${name}');`);

        return { data: result };
    } catch (err) {
        console.error('setGenresForMovies: ', err);
        return { error: err };
    }
};

module.exports = {
    setGenres
}