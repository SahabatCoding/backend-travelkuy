import express from 'express'
import cors from 'cors'
import { errorMiddleware } from '../middleware/error-middleware.js'
import { publicRouter } from '../router/public-api.js'
import { userRouter } from '../router/api.js'

const web = express()
web.use(cors())
web.use(express.json())
web.use(publicRouter)
web.use(userRouter)
web.use(errorMiddleware)

export default web