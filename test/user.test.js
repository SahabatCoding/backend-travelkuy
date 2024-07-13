import { web } from "../src/application/web.js"
import { createUserTest, removeUserTest } from "./test-util.js"
import supertest from 'supertest'

describe('POST /users', ()=>{
    afterEach(async ()=>{
        await removeUserTest()
    })

    it('should can register user', async ()=>{
        const result = await supertest(web)
            .post('/users')
            .send({
                username : 'test',
                full_name : 'test',
                password : 'rahasia',
                email :'test@gmail.com',
                phone : '089678767443'
            })

            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.username).toBe('test')
            expect(result.body.data.full_name).toBe('test')

    })

    it('should can reject if register is invalid', async ()=>{
        const result = await supertest(web)
            .post('/users')
            .send({
                username : 'test',
                full_name : '',
                password : '',
                email :'',
                phone : ''
            })

            console.info(result.body)
            expect(result.status).toBe(400)
            expect(result.error).toBeDefined()

    })


})

describe('POST /users/login',()=>{
    beforeEach(async()=>{
        await createUserTest()
    })

    afterEach(async ()=>{
        await removeUserTest()
    })

    it('should can user login', async ()=>{
        const result = await supertest(web)
            .post('/users/login')
            .send({
                username : 'test',
                password : 'rahasia'
            })

            console.log(result.body)
            expect(result.status).toBe(200)
            expect(result.body.data.token).toBeDefined()
            
    })
    it('should can reject if username wrong', async ()=>{
        const result = await supertest(web)
            .post('/users/login')
            .send({
                username : 'salah',
                password : 'rahasia'
            })

            console.log(result.body)
            expect(result.status).toBe(401)            
    })
    it('should can reject if password wrong', async ()=>{
        const result = await supertest(web)
            .post('/users/login')
            .send({
                username : 'test',
                password : 'salah'
            })

            console.log(result.body)
            expect(result.status).toBe(401)            
    })
} )

describe('GET /users/current', ()=>{
    beforeEach(async()=>{
        await createUserTest()
    })

    afterEach(async ()=>{
        await removeUserTest()
    })
    it('shoul can get data current', async()=>{
        const result = await supertest(web)
        .get('/users/current')
        .set('Authorization', 'test')
        
        console.log(result.body)
        expect(result.status).toBe(200)
    })
    it('shoul can reject if get data current is invalid', async()=>{
        const result = await supertest(web)
            .get('/users/current')
            .set('Authorization', '')

            console.log(result.body)
            expect(result.status).toBe(401)
    })

    
})

describe('PATCH /users/current', ()=>{
    
    beforeEach(async()=>{
        await createUserTest()
    })
    
    afterEach(async ()=>{
        await removeUserTest()
    })
    
    it('should can update user', async ()=>{
        const result = await supertest(web)
        .patch('/users/current')
            .set('Authorization', 'test')
            .send({
                full_name : 'test',
                password : 'rahasia lagi',
                email : 'test@gmail.com',
                phone : '089678767443',
                jkel :'laki-laki',
                tgl_lahir : '29',
                alamat : 'villa',
                ktp : '2',
                kode_pos : '90'           
            })

            expect(result.status).toBe(200)
            expect(result.body.data.full_name).toBe('test')
            expect(result.body.data.email).toBe('test@gmail.com')
            expect(result.body.data.phone).toBe('089678767443')
            expect(result.body.data.jkel).toBe('laki-laki')
            expect(result.body.data.tgl_lahir).toBe('29')
            expect(result.body.data.alamat).toBe('villa')
            expect(result.body.data.ktp).toBe('2')
            expect(result.body.data.kode_pos).toBe('90')
            
            
        })
    it('should can reject update user if invalid', async ()=>{
        const result = await supertest(web)
            .patch('/users/current')
            .set('Authorization', 'test')
            .send({
                full_name : 'test',
                password : 'rahasia lagi',
                email : 'test@gmail.com',
                phone : '089678767443',
                jkel :'laki-laki',
                tgl_lahir : '',
                alamat : '',
                ktp : '2',
                kode_pos : '90'           
            })
            
            expect(result.status).toBe(400)
            expect(result.error).toBeDefined()
    
    })
})

describe('DELETE /users/current/logout',()=>{
    beforeEach(async()=>{
        await createUserTest()
    })
    
    afterEach(async ()=>{
        await removeUserTest()
    })
    
    it('should can logout user', async()=>{
        const result = await supertest(web)
            .delete('/users/current/logout')
            .set('Authorization', 'test')

            console.log(result.body)
            expect(result.status).toBe(200)
    })
} )