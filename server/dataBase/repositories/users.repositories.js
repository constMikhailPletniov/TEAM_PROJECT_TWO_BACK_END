const { STATUS_CODE } = require('../../configurations');
const client = require('../dataBase');

const postUserData = async ({ hashPassword, login, first_name, last_name, user_role }) => {
    try {
        const result = await client.query(`INSERT INTO users(password,login,first_name,last_name, user_role)
        VALUES('${hashPassword}','${login}','${first_name}','${last_name}','${user_role}') RETURNING *;`);
        if (result.rows.length > 0) return { result: "User was created" };
    } catch (err) {
        return { error: { message: err.detail, statusCode: STATUS_CODE.BAD_REQUEST } }
    }
};
const checkUserLogin = async (login) => {
    try {
        const result = await client.query(`SELECT login, password, user_role FROM users WHERE login ='${login}'`);

        if (!result.rows.length) return { error: { message: "Login or password not found", statusCode: STATUS_CODE.NOT_FOUND } };
        const checkUserRole = result.rows[0].user_role;
        const checkPassword = result.rows[0].password;
        if (!checkUserRole && !checkPassword) return { error: { message: "Login or password not found", statusCode: STATUS_CODE.NOT_FOUND } };
        return { checkUserRole: checkUserRole, checkPassword: checkPassword };
    } catch (err) {
        return { error: { message: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR } };
    }
};

module.exports = {
    postUserData,
    checkUserLogin
}