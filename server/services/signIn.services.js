const { compare } = require('./password.services');
const { generateTokens } = require('./jwt.services');
const { usersRepositories } = require('../dataBase/repositories');

const signIn = async (login, password) => {
    try {
        const { error: repoError, checkUserRole, checkPassword } = await usersRepositories.checkUserLogin(login);

        if (repoError) return { error: repoError };
        const { error } = await compare(password, checkPassword);
        if (error) return { error: error };
        const { accessToken } = generateTokens();
        return { data: { checkUserRole, accessToken } };
    } catch (err) {
        return { error: err };
    }
};

module.exports = { signIn };