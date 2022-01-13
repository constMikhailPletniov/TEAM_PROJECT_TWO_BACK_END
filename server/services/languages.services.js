const axios = require('axios');
const { STATUS_CODE, CONSTANTS } = require('../configurations');
const { languagesRepositories, usersRepositories } = require('../dataBase/repositories');
const { compare } = require('./password.services');

const getLanguages = async (api_key, login, password) => {
    try {
        const { error: repoError, checkUserRole, checkPassword } = await usersRepositories.checkUserLogin(login);
        if (repoError) return { error: repoError };
        if (checkUserRole !== CONSTANTS.ADMIN) return { error: { message: "Invalid admin", statusCode: STATUS_CODE.FORBIDDEN } };
        const { error } = await compare(password, checkPassword);
        if (error) return { error: error };
        const { data: languages } = await axios.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${api_key}`);
        if (!languages) return { error: 'Not found languages' }

        for (const item of languages) {
            console.log(item);
            const { error } = await languagesRepositories.setLanguages(item);
            if (error) return { error: error };
        }
        return { data: "Languages was set" };
    } catch (err) {
        console.error('getLanguages: ', err);
        return { error: { message: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR } };
    }
};
const getDbLanguages = async () => {
    try {
        const { data } = await languagesRepositories.getLanguages();
        if (!data) return { error: { message: 'Not found', status: STATUS_CODE.NOT_FOUND } };
        return { data: data };
    } catch (err) {
        return { error: { message: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR } }
    }
};
module.exports = {
    getLanguages,
    getDbLanguages
}