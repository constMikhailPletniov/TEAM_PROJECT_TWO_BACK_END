const client = require('../dataBase/dataBases');
const { PASSWORD_SERVICES, JWT_SERVICES } = require('../services');

const checkUserData = async ({ login, password }) => {
    try {
        const result = await client.query(`SELECT login, password FROM users WHERE login ='${login}'`);

        if (result.rows.length === 0) return { error: "Login not found" };

        await PASSWORD_SERVICES.compare(password, result.rows[0].password);
        const {
            accessToken,
        } = JWT_SERVICES.generateTokens();
        return {
            data: {
                accessToken,
            }
        };

    } catch (err) {
        console.error('checkUserData: ', err);
        return { error: err };
    }
};

module.exports = {
    checkUserData
}