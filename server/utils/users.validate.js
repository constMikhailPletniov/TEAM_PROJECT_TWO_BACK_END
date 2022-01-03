const Joi = require('joi');

const { CONFIG } = require('../configurations');

const nameRegExp = /\D\S/i;

const userValidate = Joi.object({
    password: Joi.string().min(CONFIG.NUMBERS.EIGHT).trim().regex(/\b[A-Z0-9]+\b/i).required(),
    login: Joi.string().min(CONFIG.NUMBERS.TWO).trim().regex(/^\D\S/i).required(),
    first_name: Joi.string().min(CONFIG.NUMBERS.TWO).trim().regex(nameRegExp),
    last_name: Joi.string().min(CONFIG.NUMBERS.TWO).trim().regex(nameRegExp)
});

module.exports = {
    userValidate
}