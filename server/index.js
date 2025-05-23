import express from 'express';
import morgan from 'morgan';
import apiRouter from './routes/index.js';
import {connectDB} from './config/db.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const corsOption = {
    origin: process.env.FRONTENDURL,
    credentials: true
};

app.use(compression())
app.use(morgan('tiny'));
app.use(express.json({limit:5000000}));
app.use(cookieParser());
app.use(helmet())
app.use(cors(corsOption))

// connect to mongodb
connectDB()


app.use('/api',apiRouter);


export default app
