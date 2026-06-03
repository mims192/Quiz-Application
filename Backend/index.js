import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/Auth.js';
import quizRoutes from './routes/HandleQuize.js';


dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URL,{ }).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
})

app.use('/api/auth', authRoutes);
app.use('/api/quizzes',quizRoutes);


app.listen(4000,(req,res)=>{
    console.log("Server is running on port 4000");
})

