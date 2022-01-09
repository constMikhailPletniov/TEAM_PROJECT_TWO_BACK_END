
const URL = require('url');
const { STATUS_CODE, METHODS, ENDPOINTS } = require('../configurations');
const { SIGN_UP_CONTROLLER, SIGN_IN_CONTROLLER, MOVIES, GENRES, FILTERS_CONTROLLERS } = require('../controllers');

const routers = async ({ req, res, body }) => {
    try {
        const { pathname, query } = URL.parse(req.url, true);

        switch (true) {
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.USERS}${ENDPOINTS.SIGN_UP}`):
                ({ error, data } = await SIGN_UP_CONTROLLER.postUserData(body));
                break;
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.USERS}${ENDPOINTS.SIGN_IN}`):
                ({ error, data } = await SIGN_IN_CONTROLLER.checkUserData(body));
                break;
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.MOVIES}${ENDPOINTS.SET}`):
                ({ error, data } = await MOVIES.setMoviesControll(body));
                break;
            case (req.method === METHODS.POST && pathname === `${ENDPOINTS.GENRES}${ENDPOINTS.SET}`):
                ({ error, data } = await GENRES.setGenres(body));
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.FILTERS}`):
                ({ error, data } = await FILTERS_CONTROLLERS.getfilters());
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.MOVIES}`):
                ({ error, data } = await MOVIES.getMovies(query));
                break;
            case (req.method === METHODS.GET && pathname === `${ENDPOINTS.MOVIES}/id`):
                ({ error, data } = await MOVIES.getMovieById(query.id));
                break;
            default:
                res.statusCode = STATUS_CODE.NOT_FOUND;
                return res.end(JSON.stringify({ message: "Invalid request" }));
        }

        if (error) {
            res.statusCode = STATUS_CODE.NOT_FOUND;
            return res.end(JSON.stringify({ message: error }) || JSON.stringify({ message: error.message }));
        }
        res.statusCode = STATUS_CODE.OK;
        return res.end(JSON.stringify({ message: data }));
    } catch (err) {
        console.error('routers error: ', err);
    }
};

module.exports = { routers };