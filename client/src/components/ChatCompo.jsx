import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

function ChatCompo({ username, avatar, selectedUser, setRefresh }) {
    const [isSelected, setSelected] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const HandleShowUser = () => {
        selectedUser(username, avatar)
    }

    const toggleDropdown = () => {
        if (!showMenu) {
            setShowMenu(true)
        } else {
            setShowMenu(false)
        }
    }

    const handleDelete = async () => {
        const deleteuser = await axios.delete('https://chatapplication-jdq3.onrender.com/api/chatusers/delete', { data: { username } })
        if (deleteuser) {
            toast.success(deleteuser.data.message, {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                style: {
                    color: '#fff',
                    backgroundColor: '#000',
                    border: '1px solid gray'
                }
            });
        }
        setShowMenu(false)
        setRefresh(true)
    }

    return (
        <div
            onClick={HandleShowUser}
            className={`w-full h-[11vh] mx-1 mt-3 border-b-1 border-zinc-500 my-1 flex align-middle p-2 gap-2 cursor-pointer hover:bg-zinc-900 ${isSelected ? 'bg-zinc-900' : 'bg-transparent'}`}>
            <div className="w-16 h-16 rounded-full ">
                <img className="rounded-full object-cover opacity-[.9] cursor-pointer hover:opacity-[1]" src={avatar} alt="" aria-label={`Profile picture of ${username}`} />
            </div>
            <div className=" w-[85%] p-2 overflow-hidden ">
                <h3 className="text-xl font-medium ">{username}</h3>
                {/* <p className="text-lg text-zinc-400">somethign ra aibniunijnjnkamkmaknmk thign ra aibniunijnjnkam  thign ra aibni  thign ra aibni</p> */}
            </div>
            <div className="relative ">
                <button
                    onClick={toggleDropdown}
                    className="p-2 bg-zinc-800 rounded-md text-white cursor-pointer hover:bg-zinc-700"
                >
                    ⋮
                </button>
                {
                    showMenu &&
                    (
                        <div className="absolute right-0  w-36 bg-zinc-800 shadow-md rounded-lg z-10">
                            <ul className="text-white">
                                <li
                                    className="p-2 hover:bg-zinc-700 cursor-pointer"
                                    onClick={handleDelete}
                                >
                                    Delete Chat
                                </li>
                               
                            </ul>
                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default ChatCompo









