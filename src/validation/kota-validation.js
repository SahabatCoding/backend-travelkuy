import Joi from 'joi'

const createKotaValidation = Joi.object({
    nm_kota : Joi.string().max(40).required(),
    about : Joi.string().max(40).required(),
    country : Joi.string().max(40).required()
})

const getKotaValidation = Joi.number().positive().required()

const updateKotaValidation = Joi.object({
    id : Joi.number().positive().required(),
    nm_kota : Joi.string().max(40).optional(),
    about : Joi.string().max(40).optional(),
    country : Joi.string().max(40).optional()
})
export {
    createKotaValidation,
    getKotaValidation,
    updateKotaValidation
}