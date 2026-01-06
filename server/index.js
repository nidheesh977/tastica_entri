import express from 'express';
import morgan from 'morgan';
import apiRouter from './routes/index.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit'


dotenv.config();

const app = express();

const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES) * 60 * 1000,
    limit: parseInt(process.env.RATE_LIMIT_MAXIMUM_REQUEST),
    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many request Please try again later."
        })
    }
})

const corsOption = {
    origin: process.env.FRONTENDURL,
    credentials: true
};

// Middlewares
app.use(cors(corsOption))
app.use(compression())
app.use(morgan('tiny'));
app.use(express.json({ limit: 5000000 }));
app.use(cookieParser());
app.use(helmet())
app.use(limiter)

// connect to mongodb 
connectDB()



// routes Middlewares
app.use('/api', apiRouter);


export default app
