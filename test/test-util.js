import { prisma } from "../src/application/database.js"
import bcrypt from 'bcryptjs'

//Buat data User
export const removeUserTest = async ()=>{
    await prisma.user.deleteMany({
        where :{
            username : 'test'
        }
    })
}

export const createUserTest = async()=>{
    await prisma.user.create({
        data :{
            username : 'test',
            full_name : 'test',
            password : await bcrypt.hash('rahasia', 10),
            email : 'test@gmail.com',
            phone : '089678767443',
            token : 'test'
        }
    })
}

//Buat data kota
export const removeKotaTest = async()=>{
    await prisma.kota.deleteMany({
        where:{
            nm_kota : 'test'
        }
    })
}

export const createKotaTest = async()=>{
    await prisma.kota.create({
        data :{
            nm_kota : 'test',
            about : 'test',
            country : 'test'
        }
    })
}

export const getKotaTest = async()=>{
    return prisma.kota.findFirst({
        where:{
            id_admin : 'admin'
        }
    })
}

//create data destination
export const removeDestinationTest = async ()=>{
    await prisma.destination.deleteMany({
        where :{
            nm_kota : 'test'
        }
    })   
}

export const createDestinationTest = async ()=>{
    await prisma.destination.create({
        data :{
            nm_destination : 'test',
            about : 'test',
            nm_kota : 'test'
        }
    })    
}

export const getDestinationTest = async ()=>{
    return prisma.destination.findFirst({
        where :{
            nm_kota : 'test'
        }
    })
}

//create data hotel
export const removeHotelTest = async()=>{
    const getDestination = await getDestinationTest()
    await prisma.hotel.deleteMany({
        where :{
            id_destination : getDestination.id
        }
    })
}

export const createHotelTest = async()=>{
    const getDestination = await getDestinationTest()
    await prisma.hotel.create({
        data:{
            nm_hotel : 'test',
            about : 'test',
            alamat : 'test',
            price : 'test',
            id_destination : getDestination.id

        }
    })
}

export const getHotelTest = async()=>{
    const getDestination = await getDestinationTest()
    return prisma.hotel.findFirst({
        where:{
            id_destination : getDestination.id
        }
    })
}

//create booking
export const removeBookingTest = async()=>{
    await prisma.booking.deleteMany({
        where :{
            username : 'test'
        }
    })
} 

export const createBookingTest = async()=>{
    const gethotel = await getHotelTest()
    await prisma.booking.create({
        data :{
            check_in : new Date('2024-07-07'),
            check_out : new Date('2024-07-08'),
            price : '8900',
            username : 'test',
            id_hotel : gethotel.id
        }
    })
}

export const getBookingTest = async()=>{
    return prisma.booking.findFirst({
        where :{
            username : 'test'
        }
    })
}
