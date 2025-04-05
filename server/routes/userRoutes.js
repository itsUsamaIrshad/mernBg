import express from 'express'
import { clerkWebHooks, stripePayment, userCredits } from '../controllers/userController.js'
import { authUser } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/webhooks',clerkWebHooks)
userRouter.get('/credits',authUser,userCredits)
userRouter.post('/pay-stripe',authUser,stripePayment)


export default userRouter