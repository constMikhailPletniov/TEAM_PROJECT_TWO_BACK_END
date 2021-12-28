const URL = require('url');
const { STATUS_CODE, METHODS, ENDPOINTS } = require('../configurations');

const routers = async (req, res, body) => {
    try {
        const { pathname, query } = URL.parse(req.url, true);

        switch (true) {
            case (req.method === METHODS.POST && pathname === ENDPOINTS.SIGN_UP):

                break;
            case (req.method === METHODS.POST && pathname === ENDPOINTS.SIGN_IN):

                break;
            default:
                res.statusCode = STATUS_CODE.NOT_FOUND;
                return res.end(JSON.stringify({ message: "Invalid request" }));
        }

        if (error) {
            res.statusCode = STATUS_CODE.NOT_FOUND;
            return res.end(JSON.stringify({ message: error.message }));
        }
        res.statusCode = STATUS_CODE.OK;
        return res.end(JSON.stringify({ message: data }));
    } catch (err) {
        console.error('routers error: ', err);
    }
};

module.exports = { routers };