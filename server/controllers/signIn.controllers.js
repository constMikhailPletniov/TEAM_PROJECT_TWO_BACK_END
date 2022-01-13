const { STATUS_CODE } = require('../configurations');
const { signInServices } = require('../services');
const { userValidate } = require('../utils');

const checkUserData = async ({ login, password }) => {
    try {
        const { error: validateError, value } = userValidate.userValidateSignIn.validate({ login, password });
        if (validateError) return { error: { mesage: validateError, statusCode: STATUS_CODE.BAD_REQUEST } };
        const { error, data } = await signInServices.signIn(value.login, value.password);

        if (error) return { error: { message: error.message, statusCode: STATUS_CODE.UNAUTHORIZED } }
        const { accessToken, checkUserRole } = data;
        return { data: { data: 'Succsess', accessToken, checkUserRole, statusCode: STATUS_CODE.OK } }
    } catch (err) {
        console.error('checkUserData: ', err);
        return { error: { message: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR } };
    }
};

module.exports = {
    checkUserData
}