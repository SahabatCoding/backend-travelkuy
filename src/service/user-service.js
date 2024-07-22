import { prisma } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
const register = async (req) => {
    const user = validate(registerUserValidation, req)

    const countUser = await prisma.user.count({
        where: {
            username: user.username
        }
    })

    if (countUser === 1) {
        throw new ResponseError(400, 'user already exists')

    }

    user.password = await bcrypt.hash(user.password, 10)

    return prisma.user.create({
        data: user,
        select: {
            username: true,
            full_name: true,
            email: true,
            phone: true
        }
    })
}
const login = async (req) => {
    const user = validate(loginUserValidation, req)

    const findUser = await prisma.user.findUnique({
        where: {
            username: user.username
        }
    })

    if (!findUser) {
        throw new ResponseError(401, 'username or password wrong')

    }

    const passwordValid = await bcrypt.compare(user.password, findUser.password)
    if (!passwordValid) {
        throw new ResponseError(401, 'username or password wrong')
    }

    const token = uuid().toString()

    return prisma.user.update({
        where: {
            username: findUser.username
        },
        data: {
            token: token
        },
        select: {
            token: true
        }
    })

}

const get = async (username) => {
    username = validate(getUserValidation, username)

    const findUSer = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            full_name: true,
            email: true,
            phone: true
        }
    })

    if (!findUSer) {
        throw new ResponseError(404, 'user is not found')

    }

    return findUSer

}

const update = async (req) => {
    const user = validate(updateUserValidation, req)

    const countUser = await prisma.user.count({
        where: {
            username: user.username
        }
    })

    if (countUser !== 1) {
        throw new ResponseError(404, 'user is not found')

    }

    const data = {
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        jkel: user.jkel,
        tgl_lahir: user.tgl_lahir,
        alamat: user.alamat,
        ktp: user.ktp,
        kode_pos: user.kode_pos
    }

    if (user.password) {
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prisma.user.update({
        where: {
            username: user.username
        },
        data: {
            full_name: user.full_name,
            email: user.email,
            phone: user.phone,
            jkel: user.jkel,
            tgl_lahir: user.tgl_lahir,
            alamat: user.alamat,
            ktp: user.ktp,
            kode_pos: user.kode_pos
        },
        select: {
            full_name: true,
            email: true,
            phone: true,
            jkel: true,
            tgl_lahir: true,
            alamat: true,
            ktp: true,
            kode_pos: true

        }
    })
}

const logout = async (username) => {
    username = validate(getUserValidation, username)

    const countUser = await prisma.user.count({
        where: {
            username: username
        }
    })

    if (countUser !== 1) {
        throw new ResponseError(404, 'user is not found')
    }

    return prisma.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}




export default {
    register,
    login,
    get,
    update,
    logout
}