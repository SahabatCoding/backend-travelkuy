import kotaService from "../service/kota-service.js"

const create = async (req, res, next)=>{
    try {
        const admin = req.params.admin
        const request = req.body
        const result = await kotaService.create(admin, request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res ,next)=>{
    try {
        const adminId = req.params.adminId
        const kotaId = req.params.kota
        const result = await kotaService.get(adminId, kotaId)
        res.status(200).json({
            data: result
        })

    } catch (error) {
        next(error)
    }
}

const update = async(req ,res, next)=>{
    try {
        const kota = req.params.kota
        const adminId = req.params.admin
        const request = req.body
        request.id = kota

        const result = await kotaService.update(adminId, request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next)=>{
    try {
        const kotaId = req.params.kota
        const adminId = req.params.admin

        await kotaService.remove(adminId, kotaId)
        res.status(200).json({
            data : 'ok'
        })
    } catch (error) {
        next(error)
    }
}

export default{
    create,
    get,
    update,
    remove
}