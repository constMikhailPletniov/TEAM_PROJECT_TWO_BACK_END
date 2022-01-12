const client = require('../dataBase');
const { STATUS_CODE } = require('../../configurations');

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

const getGenres = async () => {
    try {
        const data = await client.query(`SELECT * FROM genres;`);
        if (!data.rows[0]) return { error: { data: 'Not found', status: STATUS_CODE.NOT_FOUND } };
        return { data: data.rows };
    } catch (err) {
        console.error('getGenres: ', err)
        return { error: err };
    }
};

const getGenresById = async (movie_id) => {
    try {
        const data = await client.query(`SELECT genre_id FROM movies_genres WHERE movie_id = ${movie_id};`);
        if (!data.rows[0]) return { error: { data: 'Not found', status: STATUS_CODE.NOT_FOUND } };
        return data.rows.map((elem) => elem.genre_id);
        // const values = data.rows.map(e => Object.values(e));
        // const result = values.flat();
        // return { data: result };
    } catch (err) {
        console.error('getGenresById: ', err)
        return { error: err };
    }
};

module.exports = {
    setGenres,
    getGenres,
    getGenresById
}