const Joi = require('joi');
const adminLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})
const addVideo = Joi.object({
    videoId: Joi.string().required(),
    duration: Joi.string().required(),
    titile: Joi.string().required(),
    addby: Joi.string().required(),

})
module.exports = { adminLoginSchema, addVideo}