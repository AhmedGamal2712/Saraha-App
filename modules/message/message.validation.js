const Joi = require('joi')



const addMessageValidator = {
    body: Joi.object().required().keys({
        messageBody: Joi.string().min(5).max(500)
    }),
    params: Joi.object().required().keys({
        id:Joi.string().required().min(24).max(24)
    })
}


module.exports = {
  addMessageValidator,
};