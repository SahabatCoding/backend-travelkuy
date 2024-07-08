import destinationService from "../service/destination-service.js"

const create = async(req, res, next)=>{
    try {
        const kotaId = req.params.kota
        const request = req.body

        const result = await destinationService.create(kotaId, request)
        res.status(200).json({
            data : result
        })

    } catch (error) {
        next(error)
    }
}

const get = async(req, res, next)=>{
    try {
        const kotaId = req.params.kota
        const destinationId = req.params.destination

        const result = await destinationService.get(kotaId, destinationId)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next)=>{
    try {
        const kotaId = req.params.kota
        const destinationId = req.params.destination
        const request = req.body
        request.id = destinationId

        const result = await destinationService.update(kotaId, request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next)=>{
    try {
        const kotaId = req.params.kota
        const destinationId = req.params.destination

        await destinationService.remove(kotaId, destinationId)
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