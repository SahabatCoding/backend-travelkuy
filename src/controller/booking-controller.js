import bookingService from "../service/booking-service.js"

const create = async (req, res, next)=>{
    try {
        const user = req.user.username
        const hotelId = req.params.hotel
        const request = req.body

        const result = await bookingService.create(user, hotelId, request)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next)=>{
    try {
        const user = req.user.username
        const hotelId = req.params.hotel
        const bookingId = req.params.booking
        
        const result = await bookingService.get(user, hotelId, bookingId)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next)=>{
    try {
        const user = req.user.username
        const hotelId = req.params.hotel
        const bookingId = req.params.booking
        const request = req.body
        request.id_booking = bookingId

        const result = await bookingService.update(user, hotelId, request)
        res.status(200).json({
            data : result
        })
        
    } catch (error) {
        next(error)
    }
}


const remove = async (req, res, next)=>{
    try {
        const user = req.user.username
        const hotelId = req.params.hotel
        const bookingId = req.params.booking

        await bookingService.remove(user, hotelId, bookingId)
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