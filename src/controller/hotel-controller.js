import hotelService from "../service/hotel-service.js"

const create = async (req, res, next)=>{
    try {
        const destinationId = req.params.destination
        const request = req.body

        const result = await hotelService.create(destinationId, request)
        res.status(200).json({
            data : result
        })

    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next)=>{
    try {
        const destinationId = req.params.destination
        const hotelId = req.params.hotel

        const result = await hotelService.get(destinationId, hotelId)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next)=>{
    try {
        const destinationId = req.params.destination
        const hotelId = req.params.hotel
        const request = req.body
        request.id = hotelId

        const result = await hotelService.update(destinationId, request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next)=>{
    try {
        const destinationId = req.params.destination
        const hotelId = req.params.hotel

        await hotelService.remove(destinationId, hotelId)
        res.status(200).json({
            data : 'ok'
        })
    } catch (error) {
        next(error)
    }
}


export default {
    create,
    get,
    update,
    remove
}