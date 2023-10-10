import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Database/dbConfig.js'
import userRouter from './Routers/user.router.js'
 const app=express()

dotenv.config()
const port=process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/api/user',userRouter)

connectDB();
app.listen(port,()=>{
    console.log("app is listening",port);
})