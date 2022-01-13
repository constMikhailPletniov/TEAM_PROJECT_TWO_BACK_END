const Joi = require('joi');

const { CONFIG } = require('../configurations');

const queryValidate = Joi.object({
    page: Joi.number().positive().integer().min(CONFIG.NUMBERS.ONE)
        .default(1),
    perPage: Joi.number().positive().integer().min(CONFIG.NUMBERS.ONE)
        .default(CONFIG.NUMBERS.EIGHTEEN),
});
module.exports = {
    queryValidate
}