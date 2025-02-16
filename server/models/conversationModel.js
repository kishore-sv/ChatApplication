const mongoose=require('mongoose')


const conversationSchema= new mongoose.Schema({
    persons:[{
        type:mongoose.Schema.Types,
        ref:"User"
    }],
    messages:[{
        type:mongoose.Schema.Types,
        ref:"Message"
    }]
},{
    timestamps:true
})

const Conversation=mongoose.model("Conversation",conversationSchema);
module.exports=Conversation