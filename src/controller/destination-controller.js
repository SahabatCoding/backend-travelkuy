import destinationService from "../service/destination-service.js"

const create = async(req, res, next)=>{
    try {
        const namaKota = req.params.kota
        const request = req.body

        const result = await destinationService.create(namaKota, request)
        res.status(200).json({
            data : result
        })

    } catch (error) {
        next(error)
    }
}

const get = async(req, res, next)=>{
    try {
        const namaKota = req.params.kota
        const destinationId = req.params.destination

        const result = await destinationService.get(namaKota, destinationId)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next)=>{
    try {
        const namaKota = req.params.kota
        const destinationId = req.params.destination
        const request = req.body
        request.id = destinationId

        const result = await destinationService.update(namaKota, request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next)=>{
    try {
        const namaKota = req.params.kota
        const destinationId = req.params.destination

        await destinationService.remove(namaKota, destinationId)
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