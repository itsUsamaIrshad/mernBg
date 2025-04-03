// import 'dotenv/config'
// import express from 'express'
// import cors from 'cors'
// import connectDB from '../config/mongodb.js'
// import userRouter from '../routes/userRoutes.js'


// // App Config

// const PORT = process.env.PORT || 4000
// const app = express()
// await connectDB()

// // Intialize middleware

// app.use(express.json())
// app.use(cors())

// // API Routes

// app.get('/',(req,res)=> res.send('API chl rhi hai'))
// app.use('/api/user',userRouter)

// app.listen(PORT , ()=> console.log(' Server running on port'+ PORT))

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from '../config/mongodb.js';
import userRouter from '../routes/userRoutes.js';

// App Config
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// API Routes
app.get('/', (req, res) => res.send('✅ API Running Successfully'));
app.use('/api/user', userRouter);

// ✅ Important: Export as default for Vercel
export default app;
