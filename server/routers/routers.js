
const URL = require('url');
const { STATUS_CODE, METHODS, ENDPOINTS } = require('../configurations');
const { signUpController, signInController, moviesControllers, genresControllers, filtersControllers } = require('../controllers');

const routers = async ({ req, res, body }) => {
    try {
        const { pathname, query } = URL.parse(req.url, true);

        switch (true) {
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.USERS}${ENDPOINTS.SIGN_UP}`):
                ({ error, data } = await signUpController.signUp(body));
                break;
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.USERS}${ENDPOINTS.SIGN_IN}`):
                ({ error, data } = await signInController.checkUserData(body));
                break;
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.MOVIES}${ENDPOINTS.SET}`):
                ({ error, data } = await moviesControllers.setMoviesControll(body));
                break;
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.GENRES}${ENDPOINTS.SET}`):
                ({ error, data } = await genresControllers.setGenres(body));
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.FILTERS}`):
                ({ error, data } = await filtersControllers.getfilters());
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.MOVIES}`):
                ({ error, data } = await moviesControllers.getMovies(query));
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.MOVIES}/id`):
                ({ error, data } = await moviesControllers.getMovieById(query.id));
                break;
            default:
                res.statusCode = STATUS_CODE.NOT_FOUND;
                return res.end(JSON.stringify({ message: "Invalid request" }));
        }

        if (error) {
            res.statusCode = STATUS_CODE.NOT_FOUND;
            return res.end(JSON.stringify({ message: { error: error, statusCode: STATUS_CODE.BAD_REQUEST } }) ||
                JSON.stringify({ message: { error: error.message, statusCode: STATUS_CODE.BAD_REQUEST } }));
        }
        res.statusCode = STATUS_CODE.OK;
        return res.end(JSON.stringify({ message: data }));
    } catch (err) {
        console.error('routers error: ', err);
    }
};

module.exports = { routers };