const client = require('../dataBases');

const postUserData = async ({ hashPassword, login, first_name, last_name, user_role }) => {
    try {
        const result = await client.query(`INSERT INTO users(password,login,first_name,last_name, user_role)
        VALUES('${hashPassword}','${login}','${first_name}','${last_name}','${user_role}');`);
        if (!result) {
            throw new Error('Invalid Data');
        }
        return result;
    } catch (err) {
        console.error('postUserData: ', err);
        return error;
    }
};




module.exports = {
    postUserData
}