const Joi = require("joi");

const signUpValidation = {
    body: Joi.object().required().keys({
        userName: Joi.string().pattern(new RegExp(/^[A-Z][a-z]{3,8}/)).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp(/^[A-Za-z]{3,8}/)),
        cPassword: Joi.string().valid(Joi.ref('password')).required(),
        phone: Joi.number(),
        profilePic: Joi.string(),
        role: Joi.string(),
        isConfirmed: Joi.boolean()

    })
}
const logInValidation = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp(/^[A-Za-z]{3,8}/)).required(),
    }),
};

module.exports = { signUpValidation, logInValidation };