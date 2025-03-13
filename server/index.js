const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path=require('path');


require('dotenv').config();

const PORT=process.env.PORT || 8000 

const User = require('./models/user.model')
const Message = require('./models/message.model')
mongoose.connect(process.env.Mongo_URI)
    .then(()=> console.log('Mongo Connected'))
    .catch((error) => console.error("MongoDB connection error:", error));

const app = express();
const _dirname=path.resolve()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}
));


app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cookieParser())


const authenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.send({ message: 'User is not authenticated' })
        }
        else {
            try {
                const decoded = jwt.verify(token, "secret-key")
                req.user = decoded
                next()
            } catch (error) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

}



app.post('/api/register', async (req, res) => {
    try {
        const { userName, name, password, avatar } = req.body;
        
        if (!userName) {
            return res.status(400).json({ message: "Username is required" });
        }

        const existingUser = await User.findOne({ username: userName });
        if (existingUser) {
            return res.status(400).json({ message: "UserName already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            Name: name,
            username: userName,
            password: hash,
            avatar
        });

     
        return res.status(201).json({ message: "Registered" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});












app.post('/api/login', async (req, res) => {
    const { userName, password } = req.body
    try {
        const user = await User.findOne({ username: userName })
        if (!user) {
            res.send({ message: 'Incorrect username or password.' })
        }
        else {
            const hash = user.password
            bcrypt.compare(password, hash, (err, result) => {
                if (err) {
                    res.send({ message: 'Incorrect username or password.' })
                }
                if (result) {
                    const token = jwt.sign({ id: user._id, username: user.username }, "secret-key", { expiresIn: "1d" })
                    res.cookie('token', token)
                    res.send({ message: 'UserFound' })
                }
                if (!result) {
                    res.send({ message: 'Incorrect username or password.' })
                }
            })

        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})


app.get('/api/logout', authenticated, (req, res) => {
    res.clearCookie("token")
    res.send({ message: 'Logged Out' })
})

app.get('/api/user', authenticated, async (req, res) => {
    const { id } = req.user 
    const { username, avatar, _id } = await User.findById(id)
    res.json({
        message: 'success',
        username,
        avatar,
        id: _id
    })
})


app.get('/api/chat', authenticated, (req, res) => {
    res.send({ message: 'success' })
})


app.post('/api/message/create', authenticated, async (req, res) => {

    const senderId = req.user.id
    const { message, reciver,file } = req.body
    const receiverId = await User.findOne({ username: reciver })
    const firstMessage=await Message.find({receiverId,senderId})
    if(!firstMessage || firstMessage.length===0){
        const addingUserToReciver=receiverId.chats.push(senderId)
        await receiverId.save()
       
    } 
    const mess = await Message.create({
        senderId,
        receiverId,
        text: message || "" ,
        file:file || ""
    })

    res.send({ message: "success" })

})



app.get('/api/messages', authenticated, async (req, res) => {

    const messages = await Message.find({})
    res.send({ messages })
})



app.post('/api/finduser', authenticated, async (req, res) => {
    const presentUser = req.user.username
    const { findUser } = req.body

    try {
        const foundUser = await User.findOne({ username: findUser })
        if (!foundUser) return res.send({ message: "no user found" })
        if (foundUser.username === presentUser) return res.send({ message: "no user found" })
        return res.send({ message: "user found", userName: foundUser.username, avatar: foundUser.avatar })

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})




app.get('/api/chatusers', authenticated, async (req, res) => {
   
    try {
        const presentUser = req.user.username
        const chatUsersList = await User.findOne({ username: presentUser }).select("chats")

        if (!chatUsersList || !chatUsersList.chats) {
            return res.status(404).json({ error: "No chat users found" });
        }

        const chatUsers = await User.find({ _id: { $in: chatUsersList.chats } }).select("username avatar _id");

        res.send(chatUsers)

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });

    }
})


app.post('/api/addchats', authenticated, async (req, res) => {
    try {
        const presentUser = req.user.id;
        
        const selectedUsername = req.body.selectedUser;
       

        if (!selectedUsername) {
            return res.status(400).json({ error: "Selected user is required" });
        }
        const selectedUser = await User.findOne({ username: selectedUsername }).select('_id');

        if (!selectedUser) {
            return res.status(404).json({ error: "Selected user not found" });
        }

        const selectedUserId = selectedUser._id;

        const user = await User.findById(presentUser);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.chats.includes(selectedUserId)) {
            user.chats.push(selectedUserId);
            await user.save();
        }

        res.status(200).json({
            message: "Chat added successfully",
            chats: user.chats,
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.delete('/api/chatusers/delete', authenticated, async (req, res) => {
    try {
        const presentUserId = req.user.id;
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const userToDelete = await User.findOne({ username }).select("_id");

        if (!userToDelete) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const presentUser = await User.findById(presentUserId).select("chats");

        if (!presentUser) {
            return res.status(404).json({ error: "Current user not found" });
        }

        if (!presentUser.chats.includes(userToDelete._id)) {
            return res.status(400).json({ error: "Chat does not exist in the list" });
        }

       



        await Message.deleteMany({ 
            $or: [
                { senderId: presentUserId, receiverId: userToDelete},
                { senderId: userToDelete, receiverId: presentUserId }
            ]
        });

        await User.findByIdAndUpdate(presentUserId, {
            $pull: { chats: userToDelete._id }
        });
 

        res.status(200).json({ message: `Chat with ${username} deleted successfully` });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/api/selecteduser',authenticated,async (req,res)=>{
    try {
        const username=req.body.username
    if(username){
        const id=await User.findOne({username})
        res.send(id._id)
    }
    } catch (error) {
        
        res.status(404).send("no user")
    }
    
   
    
})

app.put('/api/user/edit',authenticated,async (req,res)=>{
    const user=req.body
    const presentUser=req.user.username
    const presentUserId=req.user.id
    const presentAvatar=req.user.avatar
    if(!user){
       return res.send({message:"No data"})
    }
    if(user.inputValue==presentUser && user.uploadedAvatarUrl==="" ){
        return res.send({message:"No Changes to Save"})
    }
    try {
        
        await User.findByIdAndUpdate(presentUserId,{username:user.inputValue || presentUser ,avatar:user.uploadedAvatarUrl || presentAvatar })

       res.send({message:"Successfully Saved Changes"})
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
  
})



app.use(express.static(path.join(_dirname,"/client/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"))
})



app.listen(PORT, () => console.log(`server is running in ${PORT}`))