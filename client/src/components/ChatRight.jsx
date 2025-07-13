import { useEffect, useRef, useState } from "react"
import { Chatting } from "./Chatting"
import axios from "axios"
// import imgFile from '../assests/file-upload-line.png'
import fileUpload from '../assests/file-upload.svg'
import { PreviweFile } from "./PreviewFile"
import { toast } from "react-toastify"
import { ChattingSeleton } from "./seletons/ChattingSeleton"
import loader from '../assests/loader.svg'
// import dotenv from 'dotenv';
// dotenv.config();


function ChatRight({ username, avatar, userId, selectedUser, selectedUserId }) {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [temp, seTemp] = useState(true)
    const [emptyMessage, setEmptyMessage] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isMessLoading, setIsMessLoading] = useState(false)



    const HandleSendMess = async (e) => {
        e.preventDefault()
        try {
            setIsMessLoading(true)
            const Message = await axios.post("https://chatapplication-jdq3.onrender.com/api/message/create", { message, reciver: username })
        } catch (error) {
            console.log(error)
        }
        finally {
            setMessage('')
            setIsMessLoading(false)
        }
    }

    useEffect(() => {
        const data = async () => {
            try {
                const { data } = await axios.get('https://chatapplication-jdq3.onrender.com/api/messages')
                setMessages(data.messages)
            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setIsLoading(false)
            }

        }
        data()

    }, [message])



    const fileRef = useRef("")
    const handleFile = () => {
        if (fileRef) {
            fileRef.current.click();
        }
    }

    const [file, setFile] = useState("")
    const handleInputFile = (e) => {
        const inputFile = e.target.files
        if (!inputFile) return
        setFile(inputFile[0])


    }


    const [showPreview, setShowPreview] = useState(false)

    const [fileUrl, setFileUrl] = useState('')
    const [fileText, setFileText] = useState('')
    const handleSendFile = async () => {
        let url = ""
        if (file) {
            setIsMessLoading(true)
            const fData = new FormData()
            fData.append("file", file)
            fData.append("upload_preset", "Chat_Application")
            fData.append("cloud_name", "dkavvdkki")
            try {
                const fres = await axios.post('https://api.cloudinary.com/v1_1/dkavvdkki/image/upload',
                    fData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        withCredentials: false
                    }
                );
                url = fres.data.secure_url;
                setFileUrl(url)
                const res = await axios.post("https://chatapplication-jdq3.onrender.com/api/message/create", { message: fileText, reciver: username, file: url })
                if (res.data.message === "success") {
                    toast.success("Message Sent", {
                        position: "bottom-right",
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

                setShowPreview(true)


            } catch (error) {
                toast.error(error)   
            }
            finally{
                setIsMessLoading(false)
            }

        }
    }


    useEffect(() => {
        if (message) {
            setEmptyMessage(true)
        } else {
            setEmptyMessage(false)
        }

    }, [message])






    return (
        <>
            <div className="w-full lg:w-2/3 h-full ">
                {
                    temp ? (<div className="w-full h-full">
                        <nav className=" h-20 w-full p-3 flex justify-between gap-2 border-b-1 border-zinc-500 items-center ">
                            <div className="flex gap-2 items-center">
                                <div className="w-15 h-15 rounded-full ">
                                    <img className="rounded-full object-cover cursor-pointer " src={avatar} alt="" />
                                </div>
                                <h3 className="text-2xl font-bold">{username}</h3>
                            </div>

                        </nav>
                        <div className=" h-[89.5vh] w-full">
                            <div className="w-full h-[90%] lg:px-10 flex relative justify-center items-center ">
                                <PreviweFile isMessLoading={isMessLoading} showPreview={showPreview} setShowPreview={setShowPreview} file={file} setFile={setFile} handleSendFile={handleSendFile} fileText={fileText} setFileText={setFileText} />
                                {
                                    isLoading ?
                                        <ChattingSeleton></ChattingSeleton>
                                        :
                                        <Chatting messages={messages} username={username} userId={userId} selectedUser={selectedUser} nReciver={username} selectedUserId={selectedUserId} />

                                }
                            </div>
                            <div className=" w-full h-[10%] p-5 flex items-center gap-3 border-t-1 border-zinc-500">
                                <form onSubmit={HandleSendMess} className="w-full h-full flex items-center gap-3 ">
                                    <input
                                        value={message}
                                        onChange={(e) => { setMessage(e.target.value) }}
                                        type="text" placeholder="Type your message..." className="p-2 w-[80%] lg:w-[90%]  outline-zinc-600 border-1 border-zinc-500 rounded-lg" required />
                                    <input
                                        className="hidden"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleInputFile}

                                        ref={fileRef}
                                    />
                                    <div
                                        onClick={handleFile}
                                        title="upload file" className="w-[5%]  border-1 border-zinc-500 cursor-pointer opacity-[.9] rounded-sm hover:opacity-[1] "  >
                                        <img src={fileUpload} alt="upload" />
                                    </div>
                                    <button
                                        onClick={HandleSendMess}
                                        title="Send"
                                        type="submit"
                                        disabled={!emptyMessage}
                                        className={`w-[20%] lg:w-[10%]  bg-zinc-200 text-zinc-950 font-sans p-2   rounded-lg hover:bg-zinc-300 ease-in-out ${emptyMessage ? "cursor-pointer" : "cursor-not-allowed opacity-50"}  `}    >
                                         {isMessLoading ? <img src={loader} className="max-h-4 max-w-4 mx-auto shrink-0 animate-spin" alt="loader" /> : "Send"}
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>) : (
                        <div className="w-full h-full border-1 border-zinc-500 flex flex-col gap-1.5 justify-center items-center">
                            <h1 className="text-3xl font-extrabold">Add Chat </h1>
                            <div className="w-20 h-20">
                                <img className="w-20 h-20" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFIA-LSCs_WV0lxsA7MvCpfN2FFO6mXDMAw&s" alt="" />

                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ChatRight