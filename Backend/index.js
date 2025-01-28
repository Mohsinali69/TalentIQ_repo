import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'

// Define __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT || 8000

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json())
app.use(bodyParser.json());

const uri = process.env.MONGODB_API_KEY
// const uri = ''
mongoose.connect(uri).then(()=>{
    console.log("Connected to MongoDB")
})

import UserRouter from './Modules/User/user.routes.js'
import jobRouter from './Modules/Job/job.routes.js'
import applicationRouter from './Modules/Application/application.routes.js'
import educationRouter from './Modules/Educations/education.routes.js'

app.use('/api/v1/user',UserRouter)
app.use('/api/v1/job',jobRouter)
app.use('/api/v1/app',applicationRouter)
app.use('/api/v1/education',educationRouter)

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.get('/images/User/image/:filename',async(req,res)=>{
    const {filename} = req.params
    const imagePath = path.join(__dirname,'./images/User/image',filename)   
    res.sendFile(imagePath)
})

app.get('/images/User/resume/:filename',async(req,res)=>{
    const {filename} = req.params
    const imagePath = path.join(__dirname,'./images/User/resume',filename)   
    res.sendFile(imagePath)
})

app.get('/images/application/:filename',async(req,res)=>{
    const {filename} = req.params
    const imagePath = path.join(__dirname,'./images/application',filename)   
    res.sendFile(imagePath)
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

export default app