import axios from "axios";
import { useState } from "react";
import ChatRight from "../components/ChatRight";
import ChatLeft from "../components/ChatLeft";

function Chat() {
    axios.defaults.withCredentials = true;

    const [user, setUser] = useState('')
    const [avatar, setAavatar] = useState('')
    const [userId, setUserId] = useState('')
    const [selectedUserId, setSelectedId] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const HandleSelectedUser = async (username, avatar) => {
        setSelectedUser(username)
        setSelectedAvatar(avatar)
        const res = await axios.post('http://localhost:8000/api/selecteduser', { username })


        setSelectedId(res.data)
    }

    
    const fetchUserData = async () => {
        const { data } = await axios.get('http://localhost:8000/api/user')
        setAavatar(data.avatar)
        setUser(data.username)
        setUserId(data.id)
    }
    fetchUserData()


    return (
        <div className=" w-[100vw] h-[100vh] flex align-center relative ">

                    <ChatLeft username={user} avatar={avatar} selected={HandleSelectedUser} selectedUserId={userId} selectedUser={selectedUser} />
                    {
                        !selectedUser ? (
                            <div className="w-full lg:w-2/3 h-[98%] flex items-center justify-center border-1 border-zinc-500 m-1 rounded-xl">
                                <h1 className="text-xl text-zinc-300 font-bold">Get started  with making a <span className="text-xl text-zinc-200">CHAT</span></h1>
                            </div>) :
                        <ChatRight username={selectedUser} avatar={selectedAvatar} userId={userId} selectedUser={selectedUser} selectedUserId={selectedUserId} />
                    }


          

            






        </div>
    );
}

export default Chat;
