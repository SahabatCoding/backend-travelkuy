import { prisma } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { getDestinationVlidation } from "../validation/destination-validation.js"
import { createHotelValidation, getHotelValidation, updateHotelValidation } from "../validation/hotel-validation.js"
import { validate } from "../validation/validation.js"

const checkDestinationExists = async (destinationId)=>{
    destinationId  = validate(getDestinationVlidation, destinationId)

    const countDestination = await prisma.destination.count({
        where :{
            id : destinationId
        }
    })

    if(countDestination !== 1){
        throw new ResponseError(404, 'destination is not found')
    }

    return destinationId
}

const create = async (destinationId , req)=>{
    const hotel = validate(createHotelValidation, req)
    const id_destination = await checkDestinationExists(destinationId)
    hotel.id_destination = id_destination

    return prisma.hotel.create({
        data : hotel,
        select :{
            id : true,
            nm_hotel : true,
            about : true,
            alamat : true,
            price : true
        }
    })
}

const get = async (destinationId, hotelId)=>{
    hotelId = validate(getHotelValidation, hotelId)
    const id_destination = await checkDestinationExists(destinationId)

    const findHotel = await prisma.hotel.findFirst({
        where:{
            id : hotelId,
            id_destination : id_destination
        },
        select :{
            id : true,
            nm_hotel : true,
            about : true,
            alamat : true,
            price : true

        }
    })
    
    if(!findHotel){
        throw new ResponseError(404, 'hotel is not found')
    }

    return findHotel

}

const update = async (destinationId, req) =>{
    const hotel = validate(updateHotelValidation, req)
    const id_destination = await checkDestinationExists(destinationId)

    const countHotel = await prisma.hotel.count({
        where :{
            id : hotel.id,
            id_destination : id_destination
        }
    })

    if(countHotel !== 1){
        throw new ResponseError(404, 'hotel is not found')
    }

    return prisma.hotel.update({
        where :{
            id : hotel.id
        },
        data :{
            nm_hotel : hotel.nm_hotel,
            about : hotel.about,
            alamat : hotel.alamat,
            price : hotel.price,
        },
        select :{
            nm_hotel : true,
            about : true,
            alamat : true,
            price : true
        }
    })
}

const remove = async (destinationId ,hotelId)=>{
    hotelId = validate (getHotelValidation, hotelId)
    const id_destination = await checkDestinationExists(destinationId)

    const countHotel = await prisma.hotel.count({
        where:{
            id : hotelId,
            id_destination : id_destination
        }
    })

    if(countHotel !== 1){
        throw new ResponseError(404, 'hotel is not found')
    }

    return prisma.hotel.delete({
        where :{
            id : hotelId
        }
    })
}


export default{
    create,
    get,
    update,
    remove
}