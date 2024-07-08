import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware.js'
import userController from '../controller/user-controller.js'
import bookingController from '../controller/booking-controller.js'

const userRouter = new express.Router()
userRouter.use(authMiddleware)

//api users
userRouter.get('/users/current', userController.get)
userRouter.patch('/users/current', userController.update)
userRouter.delete('/users/current/logout', userController.logout)

//api booking
userRouter.post('/users/hotel/:hotel/booking', bookingController.create)
userRouter.get('/users/hotel/:hotel/booking/:booking', bookingController.get)
userRouter.put('/users/hotel/:hotel/booking/:booking', bookingController.update)
userRouter.delete('/users/hotel/:hotel/booking/:booking', bookingController.remove)

export{
    userRouter
}