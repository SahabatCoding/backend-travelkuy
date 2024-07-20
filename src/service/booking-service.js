import { prisma } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createBookingValidation, getBookingValidation, updateBookingValidation } from "../validation/booking-validation.js"
import { getHotelValidation } from "../validation/hotel-validation.js"
import { validate } from "../validation/validation.js"

const checkHotelExist = async(hotelId)=>{
    hotelId = validate(getHotelValidation, hotelId)

    const counthotel = await prisma.hotel.count({
        where :{
            id : hotelId
        }
    })

    if (counthotel !== 1){
        throw new ResponseError(404, 'hotel is not found')
    }

    return hotelId
}

const create = async(user, hotelId , req)=>{
    const booking = validate(createBookingValidation, req)
    const id_hotel = await checkHotelExist(hotelId)
    booking.username = user
    booking.id_hotel = id_hotel

    return prisma.booking.create({
        data : booking,
        select :{
            id_booking : true,
            check_in : true,
            check_out : true,
            price : true
        }
    })
}

const get = async (user, hotelId, bookingId)=>{
    bookingId = validate(getBookingValidation, bookingId)
    const id_hotel = await checkHotelExist(hotelId)

    const findBooking = await prisma.booking.findFirst({
        where :{
            id_booking : bookingId,
            id_hotel : id_hotel,
            username : user
        },
        select:{
            id_booking : true,
            check_in : true ,
            check_out : true,
            price : true,
            user : {
                select :{
                    username : true
                }
            },
            hotel :{
                select:{
                    nm_hotel : true,
                    destination :{
                        select :{
                            nm_destination : true,
                            kota :{
                                select :{
                                    nm_kota : true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    if(!findBooking){
        throw new ResponseError(404, 'booking is not found')
    }

    return findBooking
    
}

const update = async (user, hotelId, req)=>{
    const booking = validate(updateBookingValidation, req)
    const id_hotel = await checkHotelExist(hotelId)

    const countBooking = await prisma.booking.count({
        where :{
            id_booking : booking.id_booking,
            username : user,
            id_hotel : id_hotel
        }
    })

    if(countBooking !== 1){
        throw new ResponseError(404, 'booking is not found')
    }

    return prisma.booking.update({
        where :{
            id_booking : booking.id_booking
        },
        data:{
           check_in : booking.check_in,
           check_out : booking.check_out,
           price : booking.price 
        },
        select :{
            check_in : true,
            check_out: true,
            price : true
        }
    })
}

const remove = async (user, hotelId, bookingId) =>{
    bookingId = validate(getBookingValidation, bookingId)
    const id_hotel = await checkHotelExist(hotelId)

    const countBooking = await prisma.booking.count({
        where :{
            id_booking : bookingId,
            username : user,
            id_hotel : id_hotel
        }
    })

    if(countBooking !== 1){
        throw new ResponseError(404, 'booking is not found')
    }

    return prisma.booking.delete({
        where :{
            id_booking : bookingId
        }
    })
}

export default {
    create,
    get,
    update,
    remove
}