const Joi = require('joi');

const userValidate = Joi.object({
    password: Joi.string(),
    login: Joi.string(),
    first_name: Joi.string(),
    last_name: Joi.string()
});

module.exports = {
    userValidate
}