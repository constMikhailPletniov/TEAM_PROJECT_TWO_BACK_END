const { setMessageError } = require('../helpers/errors.helpers');
const { userValidate } = require('../utils');
const { usersRepositories } = require('../dataBase/repositories');
const { passwordServices } = require('../services');
const { STATUS_CODE } = require('../configurations');

const signUp = async (body) => {
    try {
        const { error, value } = userValidate.userValidate.validate(body);
        if (error) {
            return { error: error.details[0].message }
        }
        const { password, login, first_name, last_name, user_role } = value;
        const hashPassword = await passwordServices.hash(password);
        const { error: dbError, result } = await usersRepositories.postUserData({ hashPassword, login, first_name, last_name, user_role });
        if (dbError) {
            const errorNew = setMessageError(dbError);
            return { error: { message: errorNew, statusCode: STATUS_CODE.BAD_REQUEST } };
        }
        return { data: { data: result, statusCode: STATUS_CODE.CREATED } };
    } catch (err) {
        return { error: err };
    }
};

module.exports = {
    signUp
}





