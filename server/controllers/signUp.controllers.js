
const { userValidate } = require('../utils');
const { signUpServices } = require('../services');
const { STATUS_CODE } = require('../configurations');

const signUp = async (body) => {
    try {
        const { error, value } = userValidate.userValidate.validate(body);
        if (error) {
            return { error: { message: error.details[0].message, statusCode: STATUS_CODE.BAD_REQUEST } }
        }
        const { data, error: signUpError } = await signUpServices.signUp(value);
        if (error) return { error: { message: signUpError, statusCode: STATUS_CODE.BAD_REQUEST } };
        return { data: { data, statusCode: STATUS_CODE.CREATED } };
    } catch (err) {
        return { error: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR };
    }
};

module.exports = {
    signUp
}





