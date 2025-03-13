const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    chats:[
        { type: mongoose.Schema.ObjectId,
          ref: 'User'
        }
        ]
},
    {
        timestamps: true
    } 
)


const User = mongoose.model('User', userSchema);
module.exports = User;