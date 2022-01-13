const { STATUS_CODE } = require('../../configurations');
const client = require('../dataBase');

const setLanguages = async ({ iso_639_1, english_name }) => {
    try {
        const idResult = await client.query(`SELECT iso_639_1 FROM languages WHERE iso_639_1='${iso_639_1}';`);
        if (idResult.rowCount !== 0) return { error: "The languages is exist in dataBase" };
        const result = await client.query(`INSERT INTO languages(iso_639_1,english_name)
            VALUES('${iso_639_1}','${english_name}');`);
        return { data: result };
    } catch (err) {
        return { error: { message: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR } }
    }
};

const getLanguages = async () => {
    try {
        const data = await client.query(`SELECT * FROM languages;`);
        if (!data.rows[0]) return { error: { data: 'Not found', status: STATUS_CODE.NOT_FOUND } };
        return { data: data.rows };
    } catch (err) {
        return { error: { message: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR } }
    }
};

module.exports = {
    setLanguages,
    getLanguages
}