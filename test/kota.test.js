import supertest from "supertest"
import {createKotaTest, getKotaTest, removeKotaTest } from "./test-util.js"
import { web } from "../src/application/web.js"

describe('POST /users/kota/admin',()=>{
    afterEach(async()=>{
        await removeKotaTest()
    })

    it('should can create data kota',async()=>{
        const result = await supertest(web)
            .post('/kota')
            .send({
                nm_kota : 'test',
                about : 'test',
                country : 'test'
            })
            console.info(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.nm_kota).toBe('test')
            expect(result.body.data.about).toBe('test')
            expect(result.body.data.country).toBe('test')
    })
    it('should can reject data current if invalid',async()=>{
        const result = await supertest(web)
            .post('/kota')
            .send({
                nm_kota : '',
                about : 'test',
                country : 'test'
            })
            console.info(result.body)
            expect(result.status).toBe(400)
    })
})

describe('GET /kota/:kota',()=>{
    beforeEach(async()=>{
        await createKotaTest()
    })

    afterEach(async()=>{
        await removeKotaTest()
    })
    
    it('shoul can get data kota',async()=>{
        const result = await supertest(web)
            .get('/kota/test')

            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.nm_kota).toBe('test')
            expect(result.body.data.about).toBe('test')
            expect(result.body.data.country).toBe('test')
    })
    it('shoul can reject get data kota if invalid',async()=>{
        const result = await supertest(web)
            .get('/kota/hai')

            console.log(result.body)
            expect(result.status).toBe(404)
        })
})

describe('PUT /users/:admin/kota/:kota',()=>{
    beforeEach(async()=>{
        await createKotaTest()
    })

    afterEach(async()=>{
        await removeKotaTest()
    })
    
    it('shoul can update data kota',async ()=>{
        const result = await supertest(web)
            .put('/kota/test')
            .send({
                about : 'hai',
                country : 'hai'
            })
            
            console.info(result.body)
            expect(result.status).toBe(200)
        })
    it('shoul can reject update data kota if is invalid',async ()=>{
        const result = await supertest(web)
            .put('/kota/hai')
            .send({
                nm_kota : 'test',
                about : 'hai',
                country : 'hai'
            })
            
            console.info(result.body)
            expect(result.status).toBe(404)
        })
})

describe('DELETE /kota/:kota',()=>{
    beforeEach(async()=>{
        await createKotaTest()
    })
    
    afterEach(async()=>{
        await removeKotaTest()
    })
    
    it('should can delete data kota', async()=>{
        const result = await supertest(web)
            .delete('/kota/test' )
            
            expect(result.status).toBe(200)
    })
    it('should can reject delete data kota is invalid', async()=>{
        const result = await supertest(web)
            .put('/kota/hai')
            
            expect(result.status).toBe(404)
    })
})