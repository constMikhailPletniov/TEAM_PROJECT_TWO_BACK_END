const client = require('../dataBase');

const postUserData = async ({ hashPassword, login, first_name, last_name, user_role }) => {
    try {
        const result = await client.query(`INSERT INTO users(password,login,first_name,last_name, user_role)
        VALUES('${hashPassword}','${login}','${first_name}','${last_name}','${user_role}');`);
        if (result) return { result: "User was created" };
        return { error: new Error('Invalid Data') };
    } catch (err) {
        console.error('postUserData: ', err);
        return { error: { error: err.detail, status: 400 } }
    }
};

module.exports = {
    postUserData
}