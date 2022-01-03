const client = require('../dataBases');

const postUserData = async ({ hashPassword, login, first_name, last_name }) => {
    try {
        const result = await client.query(`INSERT INTO users(password,login,first_name,last_name)
        VALUES('${hashPassword}','${login}','${first_name}','${last_name}');`);
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