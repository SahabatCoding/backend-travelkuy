import { prisma } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createDestinationValidation, getDestinationVlidation, updateDestinationVlidation } from "../validation/destination-validation.js"
import { getKotaValidation } from "../validation/kota-validation.js"
import { validate } from "../validation/validation.js"

const checkKotaExists = async (kotaId)=>{
    kotaId = validate(getKotaValidation, kotaId)

    const countKota = await prisma.kota.count({
        where :{
            id : kotaId
        }
    })

    if(countKota !== 1){
        throw new ResponseError(404, 'kota is not found')
    }

    return kotaId
 
}

const create = async (kotaId, req)=>{
    const destination = validate(createDestinationValidation, req)
    const id_kota = await checkKotaExists(kotaId)
    destination.id_kota = id_kota
    
    return prisma.destination.create({
        data : destination,
        select :{
            id : true,
            nm_destination : true,
            about : true
        }
    })
    
}

const get = async(kotaId ,destinationId)=>{
    destinationId = validate(getDestinationVlidation, destinationId)
    const id_kota = await checkKotaExists(kotaId)
    
    const findDestination = await prisma.destination.findFirst({
        where :{
            id : destinationId,
            id_kota : id_kota
        },
        select :{
            id: true,
            nm_destination : true,
            about : true
        }
    })

    if(!findDestination){
        throw new ResponseError(404, 'destination is not found')
    }

    return findDestination

    
}

const update = async (kotaId ,req)=>{
    const destination = validate(updateDestinationVlidation, req)
    const id_kota = await checkKotaExists(kotaId)

    const countDestination = await prisma.destination.count({
        where :{
            id : destination.id,
            id_kota : id_kota
        }
    })

    if(countDestination !== 1){
        throw new ResponseError(404, 'destination is not found')
    }

    return prisma.destination.update({
        where :{
            id :destination.id,
        },
        data :{
            nm_destination : destination.nm_destination,
            about : destination.about
        },
        select :{
            id : true,
            nm_destination : true,
            about : true
        }
    })
}

const remove = async(kotaId, destinationId)=>{
    destinationId = validate(getDestinationVlidation, destinationId)
    const id_kota = await checkKotaExists(kotaId)

    const countDestination = await prisma.destination.count({
        where :{
            id : destinationId,
            id_kota : id_kota
        }
    })

    if(countDestination !== 1){
        throw new ResponseError(404, 'destination is not found')
    }

    return prisma.destination.delete({
        where:{
            id : destinationId
        }
    })
}

export default{
    create,
    get,
    update,
    remove
}