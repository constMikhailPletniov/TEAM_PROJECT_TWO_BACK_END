const { STATUS_CODE } = require('../configurations');
const { signInServices } = require('../services');

const checkUserData = async ({ login, password }) => {
    try {
        const { error, data: { accessToken } } = await signInServices.signIn(login, password);
        if (error) return { error: { message: error, statusCode: STATUS_CODE.NOT_FOUND } }
        return { data: { data: 'Succsess', accessToken, statusCode: STATUS_CODE.OK } }
    } catch (err) {
        console.error('checkUserData: ', err);
        return { error: { message: err, statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR } };
    }
};

module.exports = {
    checkUserData
}