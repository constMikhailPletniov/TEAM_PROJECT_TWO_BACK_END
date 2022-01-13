
const URL = require('url');
const { STATUS_CODE, METHODS, ENDPOINTS } = require('../configurations');
const { signUpController, signInController, moviesControllers,
    genresControllers, filtersControllers } = require('../controllers');

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
                ({ error, data } = await genresControllers.setGenres(body, query.token));
                console.log(data, error);
                break;
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.FILTERS}${ENDPOINTS.SET}`):
                ({ error, data } = await filtersControllers.setFilters());
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.FILTERS}`):
                ({ error, data } = await filtersControllers.getfilters());
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.MOVIES}`):
                ({ error, data } = await moviesControllers.getMovies(query));
                console.log(error);
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.MOVIES}/id`):
                ({ error, data } = await moviesControllers.getMovieById(query.id));
                break;
            default:
                res.statusCode = STATUS_CODE.NOT_FOUND;
                return res.end(JSON.stringify({ message: "Invalid request" }));
        }

        if (error) {
            res.statusCode = error.statusCode;
            return res.end(JSON.stringify({ message: { error: error.message } }));
        }
        res.statusCode = data.statusCode;
        if (data.accessToken) res.setHeader('token', data.accessToken);
        return res.end(JSON.stringify({ message: data.data }));
    } catch (err) {
        console.error('routers error: ', err);
    }
};

module.exports = { routers };