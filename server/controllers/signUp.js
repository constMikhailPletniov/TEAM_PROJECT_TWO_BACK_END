const client = require('../dataBase/dataBases');

const { USER_VALIDATE } = require('../utils');
const { USERS_REPOSITORIES } = require('../dataBase/repositories');
const { PASSWORD_SERVICES } = require('../services');

const postUserData = async (body) => {
    try {
        const { error } = USER_VALIDATE.userValidate.validateAsync(body);
        if (error) {
            console.log('work')
            return { error: error };
        }
        const { password, login, first_name, last_name } = body;
        const hashPassword = await PASSWORD_SERVICES.hash(password);
        const data = await USERS_REPOSITORIES.postUserData({ hashPassword, login, first_name, last_name });
        return { data: data };
    } catch (err) {
        console.error('postUserData: ', err);

        return { error: err };
    }
};

module.exports = {
    postUserData
}





