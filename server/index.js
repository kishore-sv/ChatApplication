const express=require('express')
const dotenv=require('dotenv')
const connectDB=require('./config/database')
const User=require('./models/userModel')
const userRoute=require('./routers/userRouters')

dotenv.config({})

const app=express();


app.use('/api/v1/user',userRoute)


const PORT=process.env.PORT || 8001
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running in ${PORT}`)
})