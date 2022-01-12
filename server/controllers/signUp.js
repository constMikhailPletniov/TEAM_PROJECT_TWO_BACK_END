
const { userValidate } = require('../utils');
const { usersRepositories } = require('../dataBase/repositories');
const { passwordServices } = require('../services');

const signUp = async (body) => {
    try {
        const { error, value } = userValidate.userValidate.validate(body);
        if (error) {
            return { error: error.details[0].message }
        }
        const { password, login, first_name, last_name, user_role } = value;
        const hashPassword = await passwordServices.hash(password);
        const data = await usersRepositories.postUserData({ hashPassword, login, first_name, last_name, user_role });
        return { data: data };

    } catch (err) {
        console.error('postUserData_Sing_up: ', err);

        return { error: err.details[0].message };
    }
};

module.exports = {
    signUp
}





