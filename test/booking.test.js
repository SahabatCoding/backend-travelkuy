import supertest from "supertest"
import { createBookingTest, createDestinationTest, createHotelTest, createKotaTest, createUserTest, getBookingTest, getHotelTest, removeBookingTest, removeDestinationTest, removeHotelTest, removeKotaTest, removeUserTest } from "./test-util.js"
import { web } from "../src/application/web.js"

describe('POST /users/hotel/:hotel/booking',()=>{
    beforeEach(async()=>{
        await createUserTest()
        await createKotaTest()
        await createDestinationTest()
        await createHotelTest()
    })
    afterEach(async()=>{
        await removeBookingTest()
        await removeHotelTest()
        await removeDestinationTest()
        await removeKotaTest()
        await removeUserTest()
    })

    it('shoul can create data booking valid ', async()=>{
        const getHotel = await getHotelTest()
        const result = await supertest(web)
            .post('/users/hotel/' + getHotel.id + '/booking')
            .set('Authorization', 'test')
            .send({
                check_in : '2024-07-07',
                check_out : '2024-07-08',
                price : '8900'
            })

            console.log(result.body)

            expect(result.status).toBe(200)
            expect(result.body.data.check_in).toBe('2024-07-07T00:00:00.000Z')
            expect(result.body.data.check_out).toBe('2024-07-08T00:00:00.000Z')
            expect(result.body.data.price).toBe('8900')
    })
    it('shoul can reject if check in is not empty ', async()=>{
        const getHotel = await getHotelTest()
        const result = await supertest(web)
            .post('/users/hotel/' + getHotel.id + '/booking')
            .set('Authorization', 'test')
            .send({
                check_in : '',
                check_out : '2024-07-08',
                price : '8900'
            })

            console.log(result.body)
            expect(result.status).toBe(400)
            
    })
})

describe('GET /users/hotel/:hotel/booking/:booking',()=>{
    beforeEach(async()=>{
        await createUserTest()
        await createKotaTest()
        await createDestinationTest()
        await createHotelTest()
        await createBookingTest()
    })
    afterEach(async()=>{
        await removeBookingTest()
        await removeHotelTest()
        await removeDestinationTest()
        await removeKotaTest()
        await removeUserTest()
    })

    it('shoul can get data booking valid ', async()=>{
        const getBooking = await getBookingTest()
        const result = await supertest(web)
            .get('/users/hotel/' + getBooking.id_hotel + '/booking/' + getBooking.id_booking)
            .set('Authorization', 'test')

            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.check_in).toBe('2024-07-07T00:00:00.000Z')
            expect(result.body.data.check_out).toBe('2024-07-08T00:00:00.000Z')
            expect(result.body.data.price).toBe('8900')
    })
    it('shoul can reject get data booking if invalid ', async()=>{
        const getBooking = await getBookingTest()
        const result = await supertest(web)
            .get('/users/hotel/' + getBooking.id_hotel + '/booking/' + (getBooking.id_booking + 1))
            .set('Authorization', 'test')

            console.log(result.body)
            expect(result.status).toBe(404)
    })
  
})

describe('PUT /users/hotel/:hotel/booking/:booking', ()=>{
    beforeEach(async()=>{
        await createUserTest()
        await createKotaTest()
        await createDestinationTest()
        await createHotelTest()
        await createBookingTest()
    })
    afterEach(async()=>{
        await removeBookingTest()
        await removeHotelTest()
        await removeDestinationTest()
        await removeKotaTest()
        await removeUserTest()
    })
    
    it('should can update data booking', async()=>{
        const getBooking = await getBookingTest()
        const result = await supertest(web)
            .put('/users/hotel/' + getBooking.id_hotel + '/booking/' + getBooking.id_booking)
            .set('Authorization', 'test')
            .send({
                check_in : '2024-07-06',
                check_out : '2024-07-08',
                price : '8900'
            })

            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.check_in).toBe('2024-07-06T00:00:00.000Z')
            expect(result.body.data.check_out).toBe('2024-07-08T00:00:00.000Z')
            expect(result.body.data.price).toBe('8900')
    })

    it('should can reject update data booking', async()=>{
        const getBooking = await getBookingTest()
        const result = await supertest(web)
            .put('/users/hotel/' + getBooking.id_hotel + '/booking/' + (getBooking.id_booking + 1))
            .set('Authorization', 'test')
            .send({
                check_in : '2024-07-06',
                check_out : '2024-07-08',
                price : '8900'
            })

            console.log(result.body)
            expect(result.status).toBe(404)

    })
})


describe('DELETE /users/hotel/:hotel/booking/:booking',()=>{
    beforeEach(async()=>{
        await createUserTest()
        await createKotaTest()
        await createDestinationTest()
        await createHotelTest()
        await createBookingTest()
    })
    afterEach(async()=>{
        await removeBookingTest()
        await removeHotelTest()
        await removeDestinationTest()
        await removeKotaTest()
        await removeUserTest()
    })
    
    it('shoul can remove data booking valid ', async()=>{
        const getBooking = await getBookingTest()
        const result = await supertest(web)
            .delete('/users/hotel/' + getBooking.id_hotel + '/booking/' + getBooking.id_booking)
            .set('Authorization', 'test')

            console.log(result.body)
            expect(result.status).toBe(200)
    
    })
    it('shoul can reject remove data booking valid ', async()=>{
        const getBooking = await getBookingTest()
        const result = await supertest(web)
            .delete('/users/hotel/' + getBooking.id_hotel + '/booking/' + (getBooking.id_booking + 1))
            .set('Authorization', 'test')

            console.log(result.body)
            expect(result.status).toBe(404)
    
    })
    
})