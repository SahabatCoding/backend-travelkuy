import Joi from 'joi'

const createBookingValidation = Joi.object({
    check_in : Joi.date().required(),
    check_out : Joi.date().required(),
    price : Joi.string().max(100).required()
})

const getBookingValidation = Joi.number().positive().required()

const updateBookingValidation = Joi.object({
    id_booking : Joi.number().max(100).required(),
    check_in : Joi.date().required(),
    check_out : Joi.date().required(),
    price : Joi.string().max(100).required()

})

export {
    createBookingValidation,
    getBookingValidation,
    updateBookingValidation
}