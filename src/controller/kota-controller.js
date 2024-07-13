import kotaService from "../service/kota-service.js"

const create = async (req, res, next)=>{
    try {
        const request = req.body
        const result = await kotaService.create(request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res ,next)=>{
    try {
        const nm_kota = req.params.kota
        const result = await kotaService.get(nm_kota)
        res.status(200).json({
            data: result
        })

    } catch (error) {
        next(error)
    }
}

const update = async(req ,res, next)=>{
    try {
        const nm_kota = req.params.kota
        const request = req.body
        request.nm_kota = nm_kota

        const result = await kotaService.update(request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next)=>{
    try {
        const nm_kota = req.params.kota

        await kotaService.remove(nm_kota)
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