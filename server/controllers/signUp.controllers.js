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

    } catch (err) {
        return { error: err };
    }
};

module.exports = {
    signUp
}





