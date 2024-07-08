import Joi from 'joi'

const registerUserValidation  = Joi.object({
    username : Joi.string().max(100).required(),
    full_name : Joi.string().max(100).required(),
    password : Joi.string().max(100).required(),
    email : Joi.string().email().max(100).required(),
    phone : Joi.string().max(100).required()
})

const loginUserValidation = Joi.object({
    username : Joi.string().max(100).required(),
    password : Joi.string().max(100).required()
})

const getUserValidation = Joi.string().max(100).required()

const updateUserValidation  = Joi.object({
    username : Joi.string().max(100).required(),
    full_name : Joi.string().max(100).optional(),
    password : Joi.string().max(100).optional(),
    email : Joi.string().email().max(100).optional(),
    phone : Joi.string().max(100).optional(),
    jkel : Joi.string().max(100).required(),
    tgl_lahir : Joi.string().max(100).required(),
    alamat : Joi.string().max(100).required(),
    ktp : Joi.string().max(100).required(),
    kode_pos : Joi.string().max(100).required(),
})
export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}