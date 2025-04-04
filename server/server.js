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


// 👉 server.js ya index.js mein
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Raw parser only for Clerk webhook
app.use('/api/user/webhooks', bodyParser.raw({ type: '*/*' }));

// ✅ JSON parser for rest of the app
app.use(express.json());
app.use(cors());

// ✅ Connect Database
connectDB();

// ✅ Routes
app.get('/', (req, res) => res.send('✅ API Running Successfully'));
app.use('/api/user', userRouter);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// 👉 Vercel support
export default app;
