import supertest from "supertest"
import {createKotaTest, getKotaTest, removeKotaTest } from "./test-util.js"
import { web } from "../src/application/web.js"

describe('POST /users/kota/admin',()=>{
    afterEach(async()=>{
        await removeKotaTest()
    })

    it('should can create data kota',async()=>{
        const result = await supertest(web)
            .post('/users/admin')
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
            .post('/users/admin')
            .send({
                nm_kota : '',
                about : 'test',
                country : 'test'
            })
            console.info(result.body)
            expect(result.status).toBe(400)
    })
})

describe('GET /users/:admin/kota/:kota',()=>{
    beforeEach(async()=>{
        await createKotaTest()
    })

    afterEach(async()=>{
        await removeKotaTest()
    })
    
    it('shoul can get data kota',async()=>{
        const getKota = await getKotaTest()
        const result = await supertest(web)
            .get('/users/admin/kota/' + getKota.id)


            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.nm_kota).toBe('test')
            expect(result.body.data.about).toBe('test')
            expect(result.body.data.country).toBe('test')
    })
    it('shoul can reject get data kota if invalid',async()=>{
        const getKota = await getKotaTest()
        const result = await supertest(web)
            .get('/users/admin/kota/' + getKota.id + 1)

            console.log(result.body)
            expect(result.status).toBe(404)
            expect(result.errors).toBeDefined()
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
        const getKota = await getKotaTest()
        const result = await supertest(web)
            .put('/users/' + getKota.id_admin + '/kota/' + getKota.id)
            .send({
                nm_kota : 'test',
                about : 'hai',
                country : 'hai'
            })
            
            console.info(result.body)
            expect(result.status).toBe(200)
        })
    it('shoul can reject update data kota if is invalid',async ()=>{
        const getKota = await getKotaTest()
        const result = await supertest(web)
            .put('/users/' + getKota.id_admin + '/kota/' + getKota.id + 1)
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
        const getKota = await getKotaTest()
        const result = await supertest(web)
            .delete('/users/' + getKota.id_admin + '/kota/' + getKota.id )
            
            expect(result.status).toBe(200)
    })
    it('should can reject delete data kota is invalid', async()=>{
        const getKota = await getKotaTest()
        const result = await supertest(web)
            .put('/users/' + getKota.id_admin + '/kota/' + getKota.id + 1)

            
            expect(result.status).toBe(404)
    })
})