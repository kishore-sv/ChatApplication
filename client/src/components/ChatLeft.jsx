import axios from "axios"
import ChatCompo from "./ChatCompo"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { toast, ToastContainer } from 'react-toastify'
import { ChatCompoSeleton } from "./seletons/ChatCompoSeleton"

function ChatLeft({ username, avatar, selected, selectedUserId, selectedUser }) {
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    const [foundUser, setFoundUser] = useState("")
    const [foundAvatar, setFoundAvatar] = useState(" ")
    const [findUser, setFindeUser] = useState(" ")
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [inputReadOnly, setInputReadOnly] = useState(true)
    const inputRef = useRef(null)
    const inputAvatarRef = useRef(null)
    const [inputValue, setInputValue] = useState(username)
    const [inputAvatarValue, setAvatarInputValue] = useState(avatar)
    const [showLogout, setShowLogout] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [settings, setSettings] = useState(false)
    const [newUserAvatarUpload, setNewUserAvatarUpload] = useState("")
    const [newAvatar, setNewAvatar] = useState("")
    const [newFile, setNewFile] = useState("")
    // const [newIsLoading, setNewIsLoading] = useState(false)



    const HandleLogOut = async () => {
        const res = await axios.get('https://chatapplication-jdq3.onrender.com/api/logout')
        if (res) {
            navigate('/login')
        }
    }


    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get('https://chatapplication-jdq3.onrender.com/api/chatusers')
                setUsers(data)
            } catch (error) {
                toast.error(error)
            }
            finally {
                setIsLoading(false)
            }

        }
        fetch()

    }, [showPopup, refresh])


    useEffect(() => {
        const addUser = async () => {
            try {
                const response = await axios.post('https://chatapplication-jdq3.onrender.com/api/addchats', { selectedUser });

            } catch (error) {
                toast.error("Error adding user:", error.response?.data || error.message)
            }
        };

        if (selectedUser) addUser();
    }, [selectedUser]);



    const HandleAddChat = () => {
        if (showPopup) {
            return setShowPopup(false);
        }
        setShowPopup(true);
    };

    const HandleFindUser = async (e) => {
        e.preventDefault()

        const res = await axios.post("https://chatapplication-jdq3.onrender.com/api/finduser", { findUser })
        setFindeUser("")
        if (res.data.message === "no user found") {

            return toast.error(res.data.message, {
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



        setFoundUser(res.data.userName)
        setFoundAvatar(res.data.avatar)
    }

    const handleSettings = () => {
        if (settings) {
            setSettings(false)
            //setShowPopup(true)
        }
        else {
            setSettings(true)
        }
        // showPopup(false)


    }

   
    const handleAvatarChange = (e) => {
        if (inputAvatarRef) {
            inputAvatarRef.current.click()
        }
    }


    

    const editAvatar = (e) => {
        const file = e.target.files;
        if (!file || file.length === 0) return;
        const selectedFile = file[0];
        setNewFile(file[0]);
        setNewAvatar(selectedFile);
        setNewAvatar(URL.createObjectURL(selectedFile));
    }

    const handleInputOnEdit = () => {
        if (inputRef.current) {
            setInputReadOnly(false)
            inputRef.current.focus()
        }

    }



    useEffect(() => {
        setInputValue(username || "");

    }, [username]);


    useEffect(() => {
        setAvatarInputValue(avatar || "");
    }, [avatar]);

    useEffect(() => {
        return () => {
            if (newAvatar) URL.revokeObjectURL(newAvatar);
        };
    }, [newAvatar]);


    

    const handleSaveChanges = async () => {

        let uploadedAvatarUrl = "";
        if (newAvatar) {
            const fData = new FormData()
            fData.append("file", newFile)
            fData.append("upload_preset", "Chat_Application")
            fData.append("cloud_name", "dkavvdkki")

            try {
                const fres = await axios.post(
                    "https://api.cloudinary.com/v1_1/dkavvdkki/image/upload",
                    fData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"

                        },
                        withCredentials: false,
                    }
                );
                uploadedAvatarUrl = fres.data.secure_url;
                setNewUserAvatarUpload(uploadedAvatarUrl)
            } catch (error) {
                toast.error(error)
                return;
            }
        }

        try {
            const res = await axios.put('https://chatapplication-jdq3.onrender.com/api/user/edit', { uploadedAvatarUrl, inputValue })

            toast.success(res.data.message, {
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

            
        } catch (error) {
            toast.error(error)
        }


    }



    return (
        <div className="hidden lg:block w-1/3 h-full   px-2 pt-5 border-r-1 border-zinc-500  ">
            <div className="flex align-center gap-3 p-2 justify-between ">
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full " title="Profile" onClick={handleSettings} >
                        <img className="rounded-full object-cover opacity-[.9] cursor-pointer hover:opacity-[1]" src={avatar} alt="" />
                    </div>
                    <h1 className="text-2xl font-black">Chats</h1>
                </div>
                <div className="flex gap-4">
                    <button
                        title={showPopup ? "Close " : "Add Chat"}
                        onClick={HandleAddChat}
                        className=" cursor-pointer bg-zinc-200 text-zinc-950 font-sans p-2 rounded-lg hover:bg-zinc-300  ease-in-out">
                        {showPopup ? "Close " : "Add Chat"}
                    </button>

                    <button
                        title="Logout"
                        onClick={() => { setShowLogout(true) }}
                        className=" bg-neutral-950 text-neutral-100 border-1 border-neutral-600 p-2 rounded-xl cursor-pointer text-l font-bold hover:bg-neutral-800">
                        Logout
                    </button>
                </div>
            </div>



            {showLogout && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    drag
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-zinc-950 w-[30vw]  p-6 py-10 rounded-xl shadow-lg m-auto text-center absolute z-10 ">
                    <h2 className="text-lg font-bold">Confirm Logout</h2>
                    <p>Are you sure you want to log out?</p>
                    <div className="mt-4 flex justify-center gap-5">
                        <button
                            onClick={HandleLogOut}
                            className="bg-zinc-100 text-zinc-900 text-l font-bold cursor-pointer hover:bg-zinc-300 px-4 py-2 rounded">
                            Yes, Logout
                        </button>
                        <button
                            onClick={() => setShowLogout(false)}
                            className="bg-zinc-100 text-zinc-900 text-l font-bold cursor-pointer hover:bg-zinc-300 px-4 py-2 rounded">
                            Cancel
                        </button>
                    </div>
                </motion.div>
            )}





            <div className="w-full h-[89.5vh] overflow-y-auto border border-zinc-500 rounded-2xl">
                {
                    settings
                    &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .4, ease: "easeInOut" }}
                        className="w-full h-full p-10 flex flex-col  items-center ">
                        <div className="flex gap-80 justify-between">
                            <h1 className=" text-2xl font-bold text-zinc-300 " >Profile</h1>

                            <button onClick={handleSettings} className="w-5 h-5 rounded-full   cursor-pointer"><img className="rounded-full" src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-cross-icon-png-image_956622.jpg" alt="" /></button>

                        </div>


                        <div className="w-25 h-25 rounded-full " title="Profile"  >
                            <input
                                accept="image/png,image/jpg"
                                className="hidden" type="file"
                                onChange={editAvatar}
                                ref={inputAvatarRef} />


                            {
                                newAvatar ?
                                    <img className="rounded-full object-cover  text-xl font-bold " src={newAvatar} alt="" />
                                    :
                                    <img className="rounded-full object-cover   text-xl font-bold" src={inputAvatarValue} alt="" />



                            }





                        </div>
                        <button onClick={handleAvatarChange} className="w-5 h-5 rounded-full mx-auto cursor-pointer "><img className="rounded-full w-full h-full" src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-white-edit-icon-image_1338673.jpg" alt="" /></button>

                        <div className="flex gap-4">
                            <div className="flex flex-col mt-5">
                                <label className="font-semibold">User Name</label>
                                <input type="text" value={inputValue} ref={inputRef} readOnly={inputReadOnly} onChange={(e) => { setInputValue(e.target.value) }} placeholder="UserName"
                                    className="p-2  mt-2 outline-zinc-600 border-1 border-zinc-500 rounded-xl"
                                />

                            </div>



                            <div className="w-5 h-5 rounded-full mt-auto cursor-pointer "
                                onClick={handleInputOnEdit}>
                                <img className="m-auto rounded-full" src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-white-edit-icon-image_1338673.jpg" alt="" />

                            </div>

                        </div>
                        <button
                            onClick={handleSaveChanges}
                            className="w-30 cursor-pointer bg-zinc-200 text-zinc-950 font-sans p-2  my-4  rounded-xl hover:bg-zinc-300 ease-in-out mb-1">
                            Save</button>
                        <p className="mt-5 text-sm text-zinc-500 selection:bg-amber-200 selection:text-zinc-900" >This is your username, it may be visible for others</p>

                    </motion.div>
                }


                {showPopup &&
                    (<motion.div
                        initial={{ x: -1000 }}
                        animate={{ x: 0 }}
                        transition={{ duration: .4, ease: "easeInOut" }}
                        className="w-full h-full ">


                        <div
                            className="w-full h-full p-5">
                            <label className="font-bold">New Chat</label>
                            <div className="flex justify-center items-center  w-full h-15 ">
                                <form className="w-full h-full " onSubmit={HandleFindUser} >

                                    <input type="text"
                                        value={findUser}
                                        onChange={(e) => { setFindeUser(e.target.value) }}
                                        placeholder="Enter UserName" className="w-[70%] p-2 mx-2 m-2 outline-zinc-600 border-1 border-zinc-500 rounded-xl" required />
                                    <button type="submit" className=" cursor-pointer bg-zinc-200 text-zinc-950 font-sans p-2  rounded-xl hover:bg-zinc-300 ease-in-out  ">
                                        Find User
                                    </button>
                                </form>
                            </div>

                            <div className="w-full h-[74.6vh] ">
                                {
                                    foundUser &&
                                   
                                    (<ChatCompo username={foundUser} avatar={foundAvatar} selectedUser={selected} />)

                                }

                            </div>
                        </div>

                    </motion.div>
                    )

                }



                {!showPopup &&
                    (

                        (users.length === 0 || !users) ? (
                            <div className="p-10">
                                <h1 className="text-xl font-extrabold text-zinc-300">No Chats Till Now , Add Chat To Continue</h1>
                            </div>
                        )
                            :
                            isLoading ? <ChatCompoSeleton /> : (users.map((user) => (<ChatCompo key={user._id} username={user.username} avatar={user.avatar} setRefresh={setRefresh} selectedUser={selected} />)))

                    )
                }









            </div>




            <ToastContainer />
        </div>

    )
}

export default ChatLeft