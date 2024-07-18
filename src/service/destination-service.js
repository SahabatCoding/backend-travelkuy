import { prisma } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createDestinationValidation, getDestinationVlidation, updateDestinationVlidation } from "../validation/destination-validation.js"
import { getKotaValidation } from "../validation/kota-validation.js"
import { validate } from "../validation/validation.js"

const checkKotaExists = async (nm_kota)=>{
    nm_kota = validate(getKotaValidation, nm_kota)

    const countKota = await prisma.kota.count({
        where :{
            nm_kota : nm_kota
        }
    })

    if(countKota !== 1){
        throw new ResponseError(404, 'kota is not found')
    }

    return nm_kota
 
}

const create = async (nm_kota, req)=>{
    const destination = validate(createDestinationValidation, req)
    const namakota = await checkKotaExists(nm_kota)
    destination.nm_kota = namakota
    
    return prisma.destination.create({
        data : destination,
        select :{
            id : true,
            nm_destination : true,
            about : true
        }
    })
    
}

const get = async(nm_kota ,destinationId)=>{
    destinationId = validate(getDestinationVlidation, destinationId)
    const namakota = await checkKotaExists(nm_kota)
    
    const findDestination = await prisma.destination.findFirst({
        where :{
            id : destinationId,
            nm_kota : namakota
        },
        select :{
            id: true,
            nm_destination : true,
            about : true,
            hotel :{
                select :{
                    nm_hotel : true,
                    about : true,
                    alamat : true,
                    price : true
                }
            }
        }
    })

    if(!findDestination){
        throw new ResponseError(404, 'destination is not found')
    }

    return findDestination

    
}

const update = async (nm_kota ,req)=>{
    const destination = validate(updateDestinationVlidation, req)
    const namaKota = await checkKotaExists(nm_kota)

    const countDestination = await prisma.destination.count({
        where :{
            id : destination.id,
            nm_kota : namaKota
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

const remove = async(nm_kota, destinationId)=>{
    destinationId = validate(getDestinationVlidation, destinationId)
    const namaKota = await checkKotaExists(nm_kota)

    const countDestination = await prisma.destination.count({
        where :{
            id : destinationId,
            nm_kota : namaKota
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