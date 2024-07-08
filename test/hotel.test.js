import supertest from "supertest"
import { createDestinationTest, createHotelTest, createKotaTest, getDestinationTest, getHotelTest, removeDestinationTest, removeHotelTest, removeKotaTest } from "./test-util.js"
import { web } from "../src/application/web.js"

describe('POST /destination/:destination/hotel', ()=>{
    beforeEach(async()=>{
        await createKotaTest()
        await createDestinationTest()
    })
    
    afterEach(async()=>{
        await removeHotelTest()
        await removeDestinationTest()
        await removeKotaTest()
        
    })
    
    it('should can create data hotel ',async()=>{
        const getDestination = await getDestinationTest()
        const result = await supertest(web)
            .post('/destination/' + getDestination.id +'/hotel')
            .send({
                nm_hotel : 'test',
                about : 'test',
                alamat : 'test',
                price : 'test'
            })

            console.log(result.body)

            expect(result.status).toBe(200)
            expect(result.body.data.nm_hotel).toBe('test')
            expect(result.body.data.about).toBe('test')
            expect(result.body.data.alamat).toBe('test')
            expect(result.body.data.price).toBe('test')
    })
    it('should can reject create data hotel is invalid ',async()=>{
        const getDestination = await getDestinationTest()
        const result = await supertest(web)
            .post('/destination/' + getDestination.id + 1 +'/hotel')
            .send({
                nm_hotel : 'test',
                about : 'test',
                alamat : 'test',
                price : 'test'
            })

            console.log(result.body)

            expect(result.status).toBe(404)
            
        })
})

describe('GET /destination/:destination/hotel/:hotel',()=>{
    
    beforeEach(async()=>{
        await createKotaTest()
        await createDestinationTest()
        await createHotelTest()
    })
    
    afterEach(async()=>{
        await removeHotelTest()
        await removeDestinationTest()
        await removeKotaTest()
        
    })
    
    it('should can get data hotel ',async()=>{
        const getHotel = await getHotelTest()
        const result = await supertest(web)
            .get('/destination/' + getHotel.id_destination +'/hotel/' + getHotel.id)
        
    
            console.log(result.body)
    
            expect(result.status).toBe(200)
            expect(result.body.data.nm_hotel).toBe('test')
            expect(result.body.data.about).toBe('test')
            expect(result.body.data.alamat).toBe('test')
            expect(result.body.data.price).toBe('test')
    })
    it('should can reject create data hotel if is invalid',async()=>{
        const getHotel = await getHotelTest()
        const result = await supertest(web)
            .get('/destination/' + (getHotel.id_destination + 1) +'/hotel/' + getHotel.id)
        
            console.log(result.body)
            expect(result.status).toBe(404)
        
        })
        
    })
    
describe('PUT /destination/:destination/hotel/:hotel',()=>{

    beforeEach(async()=>{
        await createKotaTest()
        await createDestinationTest()
        await createHotelTest()
    })
    
    afterEach(async()=>{
        await removeHotelTest()
        await removeDestinationTest()
        await removeKotaTest()
        
    })
    it('should can update data hotel ',async()=>{
        const getHotel = await getHotelTest()
        const result = await supertest(web)
            .put('/destination/' + getHotel.id_destination +'/hotel/' + getHotel.id)
            .send({
                nm_hotel : 'test',
                about : 'hai',
                alamat : 'test',
                price : 'test'
            })
    
            console.log(result.body)
    
            expect(result.status).toBe(200)
            expect(result.body.data.nm_hotel).toBe('test')
            expect(result.body.data.about).toBe('hai')
            expect(result.body.data.alamat).toBe('test')
            expect(result.body.data.price).toBe('test')
    })
    it('should can reject update data hotel if invalid ',async()=>{
        const getHotel = await getHotelTest()
        const result = await supertest(web)
            .put('/destination/' + getHotel.id_destination +'/hotel/' + getHotel.id +1)
            .send({
                nm_hotel : 'test',
                about : 'hai',
                alamat : 'test',
                price : 'test'
            })
    
            console.log(result.body)
            expect(result.status).toBe(404)
            
    })
})

describe('DELETE /destination/:destination/hotel/:hotel',()=>{
    beforeEach(async()=>{
        await createKotaTest()
        await createDestinationTest()
        await createHotelTest()
    })
    
    afterEach(async()=>{
        await removeHotelTest()
        await removeDestinationTest()
        await removeKotaTest()
        
    })
    it('should can delete data hotel ',async()=>{
        const getHotel = await getHotelTest()
        const result = await supertest(web)
            .delete('/destination/' + getHotel.id_destination +'/hotel/' + getHotel.id)
        
    
            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data).toBe('ok')
            
    })
    it('should can reject delete data hotel if invalid ',async()=>{
        const getHotel = await getHotelTest()
        const result = await supertest(web)
            .delete('/destination/' + getHotel.id_destination +'/hotel/' + getHotel.id + 1)
        
    
            console.log(result.body)
            expect(result.status).toBe(404)
            
    })
} )

