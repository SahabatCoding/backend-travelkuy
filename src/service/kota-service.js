import { prisma } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createKotaValidation, getKotaValidation, updateKotaValidation } from "../validation/kota-validation.js"
import { validate } from "../validation/validation.js"


const create = async (req)=>{
    const kota  = validate(createKotaValidation, req)

    const countKota = await prisma.kota.count({
        where:{
            nm_kota : kota.nm_kota
        }
    })

    if(countKota === 1){
        throw new ResponseError(400, 'kota is already exists')
    }

    return prisma.kota.create({
        data : kota,
        select:{
            nm_kota : true,
            about : true,
            country: true
        }
    })
}

const get = async(nm_kota)=>{
    nm_kota = validate(getKotaValidation, nm_kota)

    const findKota = await prisma.kota.findUnique({
        where :{
            nm_kota : nm_kota
        },
        select :{
            nm_kota : true,
            about : true,
            country : true,
            destination :{
                select :{
                    id : true,
                    nm_destination : true,
                    about : true
                }
            }
        }
    })

    if(!findKota){
        throw new ResponseError(404, 'kota is not found')
    }

    return findKota
}

const update = async(req)=>{
    const kota = validate(updateKotaValidation, req)

    const countKota = await prisma.kota.count({
        where :{
            nm_kota : kota.nm_kota
        }
    })
    if(countKota !== 1){
        throw new ResponseError(404 ,'kota is not found')
    }

    return prisma.kota.update({
        where:{
            nm_kota : kota.nm_kota
        },
        data :{
            nm_kota : kota.nm_kota,
            about : kota.about,
            country : kota.country
        },
        select :{
            nm_kota : true,
            about : true,
            country : true,
        }
    })
}

const remove = async (nm_kota)=>{
    nm_kota = validate (getKotaValidation, nm_kota)
    
    const countKota = await prisma.kota.count({
        where :{
            nm_kota: nm_kota
        }
    })

    if(countKota !== 1){
        throw new ResponseError(404, 'kota is not found')
    }

    return prisma.kota.delete({
        where :{
            nm_kota : nm_kota
        }
    })
}

export default {
    create,
    get,
    update,
    remove
}