import Joi from 'joi'

const createDestinationValidation = Joi.object({
    nm_destination : Joi.string().max(100).required(),
    about : Joi.string().max(100).required()
})

const getDestinationVlidation =  Joi.number().positive().required()


const updateDestinationVlidation = Joi.object({
    id : Joi.number().positive().required(),
    nm_destination : Joi.string().max(100).optional(),
    about : Joi.string().max(100).required()
})

export{
    createDestinationValidation,
    getDestinationVlidation,
    updateDestinationVlidation
}