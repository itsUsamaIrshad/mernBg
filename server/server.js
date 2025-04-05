import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import createPaymentIntent from './controllers/creditController.js'


// App Config

const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

// Intialize middleware
console.log(process.env.MONGODB_URI);
console.log(process.env.CLERK_WEBHOOK_SECRET);
console.log(process.env.CLIPDROP_API);


app.use(express.json())
app.use(cors())

// API Routes


app.get('/',(req,res)=> res.send('API chl rhi hai'))
app.use('/api/user',userRouter)
app.use('/api/image', imageRouter)
router.post('/create-payment-intent', createPaymentIntent);


app.listen(PORT , ()=> console.log(' Server running on port'+ PORT))


