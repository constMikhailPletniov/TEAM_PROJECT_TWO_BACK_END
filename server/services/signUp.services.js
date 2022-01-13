const signUp = async () => {
    try {
        const { password, login, first_name, last_name, user_role } = value;
        const hashPassword = await passwordServices.hash(password);
        const { error: dbError, result } = await usersRepositories.postUserData({ hashPassword, login, first_name, last_name, user_role });
        if (dbError) {
            const errorNew = setMessageError(dbError);
            return { error: { message: errorNew, statusCode: STATUS_CODE.BAD_REQUEST } };
        }
        return { data: result, statusCode: STATUS_CODE.CREATED };
    } catch (err) {
        return { error: err };
    }
};

module.exports = { signUp };