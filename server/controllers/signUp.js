const client = require('../dataBase/dataBases');

const { USER_VALIDATE } = require('../utils');
const { USERS_REPOSITORIES } = require('../dataBase/repositories');
const { PASSWORD_SERVICES } = require('../services');

const postUserData = async (body) => {
    try {
        const validate = await USER_VALIDATE.userValidate.validateAsync(body);
        const { password, login, first_name, last_name, user_role } = validate;
        const hashPassword = await PASSWORD_SERVICES.hash(password);
        const data = await USERS_REPOSITORIES.postUserData({ hashPassword, login, first_name, last_name, user_role });
        return { data: data.command };

    } catch (err) {
        console.error('postUserData_Sing_up: ', err);

        return { error: err.details[0].message };
    }
};

module.exports = {
    postUserData
}





