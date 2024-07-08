import Joi from 'joi'

const createHotelValidation = Joi.object({
    nm_hotel : Joi.string().max(100).required(),
    about : Joi.string().max(100).required(),
    alamat : Joi.string().max(100).required(),
    price : Joi.string().max(100).required()
})

const getHotelValidation = Joi.number().positive().required()

const updateHotelValidation = Joi.object({
    id : Joi.number().positive().required(),
    nm_hotel : Joi.string().max(100).required(),
    about : Joi.string().max(100).required(),
    alamat : Joi.string().max(100).required(),
    price : Joi.string().max(100).required()
    
})

export {
    createHotelValidation,
    getHotelValidation,
    updateHotelValidation
}