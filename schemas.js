const Joi = require('joi');
module.exports.userSchemas = Joi.object({
    user:Joi.object({
        username:Joi.string().required(),
        password:Joi.string().required(),
        email:Joi.string().required(),
        gender:Joi.string().required()
    }).required()
});