const { hash } = require('./password.services');
const { postUserData } = require('../dataBase/repositories/users.repositories');

const { setMessageError } = require('../helpers/errors.helpers');

const signUp = async ({ password, login, first_name, last_name, user_role }) => {
    try {
        const hashPassword = await hash(password);
        const { error: dbError, result } = await postUserData({ hashPassword, login, first_name, last_name, user_role });
        if (dbError) {
            const errorNew = setMessageError(dbError);
            return { error: errorNew };
        }
        return { data: result };
    } catch (err) {
        return { error: err };
    }
};

module.exports = { signUp };