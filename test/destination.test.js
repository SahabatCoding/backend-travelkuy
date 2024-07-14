import supertest from 'supertest'
import { web } from '../src/application/web.js'
import { createDestinationTest, createKotaTest, getDestinationTest, getKotaTest, removeDestinationTest, removeKotaTest } from './test-util.js'

describe('POST /kota/:kota/destination',()=>{
    beforeEach(async()=>{
        await createKotaTest()
    })

    afterEach(async()=>{
        await removeDestinationTest()
        await removeKotaTest()
    })

    it('should can create data destination',async()=>{
        const result = await supertest(web)
            .post('/kota/test/destination')
            .send({
                nm_destination : 'test',
                about : 'test'
            })

            console.log(result.body)
            expect(result.status).toBe(200)
    })
    it('should can reject if create data destination is invalid',async()=>{
        const result = await supertest(web)
            .post('/kota/test/destination')
            .send({
                nm_destination : '',
                about : 'test'
            })

            console.log(result.body)
            expect(result.status).toBe(400)
    })
})
describe('GET /kota/:kota/destination/:destination',()=>{
    beforeEach(async()=>{
        await createKotaTest()
        await createDestinationTest()
    })

    afterEach(async()=>{
        await removeDestinationTest()
        await removeKotaTest()
    })
    
    it('should can get data destination',async()=>{
        const getDestination= await getDestinationTest()
        const result = await supertest(web)
            .get('/kota/test/destination/' + getDestination.id)
        
            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.nm_destination).toBe('test')
            expect(result.body.data.about).toBe('test')

    })
    it('should can reject get data destination if is invalid',async()=>{
        const getDestination= await getDestinationTest()
        const result = await supertest(web)
            .get('/kota/test/destination/' + getDestination.id +1)
        
            console.log(result.body)
            expect(result.status).toBe(404)
    })
})

describe('PUT /kota/:kota/destination/:destination',()=>{
    beforeEach(async()=>{
        await createKotaTest()
        await createDestinationTest()
    })
    
    afterEach(async()=>{
        await removeDestinationTest()
        await removeKotaTest()
    })
    it ('should can update data destination',async()=>{
        const getDestination = await getDestinationTest()
        const result = await supertest(web)
        .put('/kota/test/destination/' + getDestination.id)
        .send({
                nm_destination :'hai',
                about : 'hai'
            })

            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.about).toBe('hai')
    })
    it ('should can reject update data destination is invalid',async()=>{
        const getDestination = await getDestinationTest()
        const result = await supertest(web)
            .put('/kota/test/destination/' + getDestination.id + 1)
            .send({
                about : 'hai'
            })

            console.log(result.body)
            expect(result.status).toBe(404)
    })
})

describe('DELETE /kota/:kota/destination/:destination',()=>{
    beforeEach(async()=>{
        await createKotaTest()
        await createDestinationTest()
    })
    
    afterEach(async()=>{
        await removeDestinationTest()
        await removeKotaTest()
    })

    it('should can remove data destination',async()=>{
        const getDestination = await getDestinationTest()
        const result = await supertest(web)
            .delete('/kota/test/destination/' + getDestination.id)

            console.info(result.body)
            expect(result.status).toBe(200)
    })
    it('should can reject remove data destination if is invalid',async()=>{
        const getDestination = await getDestinationTest()
        const result = await supertest(web)
            .delete('/kota/test/destination/' + getDestination.id + 1)

            console.info(result.body)
            expect(result.status).toBe(404)
    })
})
