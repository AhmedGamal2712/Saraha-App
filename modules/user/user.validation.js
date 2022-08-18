const Joi = require("joi");

const updateUserValidation = {
    body: Joi.object()
        .required()
        .keys({
            userName: Joi.string().pattern(new RegExp(/^[A-Z][a-z]{3,8}/)).required()
        })
}

module.exports = { updateUserValidation };
