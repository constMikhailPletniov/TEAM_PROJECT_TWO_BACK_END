
const { MOVIES_REPOSITORIES } = require('../dataBase/repositories');

const setMoviesControll = async ({ user_role }) => {
    try {
        if (!user_role === 'admin') return { error: "Invalid admin" };
        const data = await MOVIES_REPOSITORIES.getIdMovies();
        if (!data) return { error: "From api No data" };
        return { data: data };
    } catch (err) {
        console.error('setMoviesControll: ', err);
        return { error: err };
    }
};

module.exports = {
    setMoviesControll
}