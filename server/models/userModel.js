const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        default:"https://avatar.iran.liara.run/public/34"
    }
},{
    timestamps:true
});

const User=mongoose.model('User',userSchema);
module.exports=User