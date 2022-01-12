const { STATUS_CODE } = require('../../configurations');
const client = require('../dataBase');

const postUserData = async ({ hashPassword, login, first_name, last_name, user_role }) => {
    try {
        const result = await client.query(`INSERT INTO users(password,login,first_name,last_name, user_role)
        VALUES('${hashPassword}','${login}','${first_name}','${last_name}','${user_role}') RETURNING *;`);
        if (result.rows.length > 0) return { result: "User was created" };
    } catch (err) {
        return { error: { error: err.detail, statusCode: STATUS_CODE.BAD_REQUEST } }
    }
};

module.exports = {
    postUserData
}