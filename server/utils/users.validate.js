const Joi = require('joi');

const { CONFIG } = require('../configurations');

const nameRegExp = /^[a-zA-Z]+$/i;

const userValidateSignUp = Joi.object({
    password: Joi.string().min(CONFIG.NUMBERS.EIGHT).trim().alphanum().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/s).required(),
    login: Joi.string().min(CONFIG.NUMBERS.TWO).trim().regex(/^\D[\S]+/i).required(),
    first_name: Joi.string().min(CONFIG.NUMBERS.TWO).trim().regex(nameRegExp).required(),
    last_name: Joi.string().min(CONFIG.NUMBERS.TWO).trim().regex(nameRegExp).required(),
    user_role: Joi.string().trim().min(CONFIG.NUMBERS.FIVE).max(CONFIG.NUMBERS.FIVE).required()
});

const userValidateSignIn = Joi.object({
    password: Joi.string().min(CONFIG.NUMBERS.EIGHT).trim().alphanum().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/s).required(),
    login: Joi.string().min(CONFIG.NUMBERS.TWO).trim().regex(/^\D[\S]+/i).required()
});


module.exports = {
    userValidateSignUp,
    userValidateSignIn
}