import { prisma } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createKotaValidation, getKotaValidation, updateKotaValidation } from "../validation/kota-validation.js"
import { validate } from "../validation/validation.js"

const create = async (adminId, req)=>{
    const kota  = validate(createKotaValidation, req)
    kota.id_admin = adminId

    return prisma.kota.create({
        data : kota,
        select:{
            nm_kota : true,
            about : true,
            country: true
        }
    })
}

const get = async(adminId, kotaId)=>{
    kotaId = validate(getKotaValidation, kotaId)

    const findKota = await prisma.kota.findFirst({
        where :{
            id : kotaId,
            id_admin : adminId
        },
        select :{
            id : true,
            nm_kota : true,
            about : true,
            country : true
        }
    })

    if(!findKota){
        throw new ResponseError(404, 'kota is not found')
    }

    return findKota
}

const update = async(adminId ,req)=>{
    const kota = validate(updateKotaValidation, req)

    const countKota = await prisma.kota.count({
        where :{
            id : kota.id,
            id_admin : adminId
        }
    })
    if(countKota !== 1){
        throw new ResponseError(404 ,'kota is not found')
    }

    return prisma.kota.update({
        where:{
            id : kota.id
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

const remove = async (adminId, kotaId)=>{
    kotaId = validate (getKotaValidation, kotaId)

    const countKota = await prisma.kota.count({
        where :{
            id : kotaId,
            id_admin : adminId
        }
    })

    if(countKota !== 1){
        throw new ResponseError(404, 'kota is not found')
    }

    return prisma.kota.delete({
        where :{
            id : kotaId
        }
    })
}

export default {
    create,
    get,
    update,
    remove
}