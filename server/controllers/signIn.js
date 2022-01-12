const client = require('../dataBase/dataBase');
const { passwordServices, jwtServices } = require('../services');

const checkUserData = async ({ login, password }) => {
    try {
        const result = await client.query(`SELECT login, password, user_role FROM users WHERE login ='${login}'`);

        if (!result.rows.length) return { error: "Login not found" };

        const { error } = await passwordServices.compare(password, result.rows[0].password);
        if (error) {
            return { error };
        }
        const checkUserRole = result.rows[0].user_role;
        const {
            accessToken,
        } = jwtServices.generateTokens();
        return {
            data: {
                accessToken,
                checkUserRole
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