
const URL = require('url');
const { STATUS_CODE, METHODS, ENDPOINTS } = require('../configurations');
const { signUpController, signInController, moviesControllers,
    genresControllers, filtersControllers, languagesControllers } = require('../controllers');

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
                ({ error, data } = await moviesControllers.setMovies(body, query.token));
                console.log('data: ', data, 'error: ', error);
                break;
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.GENRES}${ENDPOINTS.SET}`):
                ({ error, data } = await genresControllers.setGenres(body, query.token));
                break;
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.LANGUAGES}${ENDPOINTS.SET}`):
                ({ error, data } = await languagesControllers.setLanguages(body, query.token));
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.FILTERS}`):
                ({ error, data } = await filtersControllers.getfilters(query.token));
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.MOVIES}`):
                ({ error, data } = await moviesControllers.getMovies(query));
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.MOVIES}/id`):
                ({ error, data } = await moviesControllers.getMovieById(query));
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