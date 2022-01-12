const setMessageError = ({ error }) => {

    if (error.includes('login')) {
        error = 'User with this login already exists'
    }
    return error;
}

module.exports = { setMessageError };