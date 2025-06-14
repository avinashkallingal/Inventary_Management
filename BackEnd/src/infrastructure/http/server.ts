import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import authRouter from '../../interface/routes/authRoutes';
import { dbConnection } from '../config/database/dbConnection';
// import userRouter from '../../interface/routes/userRoutes';
import itemRouter from '../../interface/routes/itemRoute';
import customerRouter from '../../interface/routes/customerRoute';
import orderRouter from '../../interface/routes/orderRoute';
import reportRouter from '../../interface/routes/reportRoutes';
import config from '../config/config';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 6000

const corsOptions = {
  origin: "*", 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};



// database connection call
dbConnection();

app.use(cors(corsOptions));
app.use(express.json())

// different routes
app.use('/', authRouter);
// app.use('/user', userRouter);
app.use('/item', itemRouter);
app.use('/customer', customerRouter);
app.use('/order', orderRouter);
app.use('/report', reportRouter);


app.listen(PORT, () => console.log(`server running on port : ${PORT}`));
