import Joi from 'joi'

const createKotaValidation = Joi.object({
    nm_kota : Joi.string().max(100).lowercase().required(),
    about : Joi.string().max(100).required(),
    country : Joi.string().max(100).required()
})

const getKotaValidation = Joi.string().max(100).required()


const updateKotaValidation = Joi.object({
    nm_kota : Joi.string().max(100).required(),
    about : Joi.string().max(100).optional(),
    country : Joi.string().max(100).optional()
})
export {
    createKotaValidation,
    getKotaValidation,
    updateKotaValidation
}