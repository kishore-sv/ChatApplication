const mongoose=require('mongoose')

const connectDB= async ()=>{
    await mongoose.connect(process.env.Mongo_URI)
    .then(()=>{console.log('Moango Connected')})
    .catch((error)=>{console.log(error)})
};

module.exports=connectDB;