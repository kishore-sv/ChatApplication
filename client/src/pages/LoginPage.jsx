import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import { motion } from 'motion/react'
import loader from '../assests/loader.svg'


function LoginPage() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const nav = useNavigate()

    axios.defaults.withCredentials = true;
    const HandleSumbit = async (e) => {
        e.preventDefault()


        try {
            setIsLoading(true)
            const data = { userName, password };
            const res = await axios.post('https://chatapplication-jdq3.onrender.com/api/login', data)
            // const res = await axios.post('http://localhost:8000/api/login', data)
            toast.error(res.data.message, {
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
            if (res.data.message === 'UserFound') {
                nav('/chat')
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
            setUserName('')
            setPassword('')
        }
    }

    return (
        <motion.div
            initial={{ filter: 'blur(5px)' }}
            animate={{ filter: 'blur(0px)' }}
            transition={{ duration: .2, }}
            className=" flex justify-center align-center  h-[100vh] w-[100vw] text-zinc-200 ">
            <div className=" h-[65vh] w-[90vw] lg:w-[31vw]  rounded-2xl flex flex-col p-5 lg:p-10 border-1 m-auto border-zinc-600  ">
                <h1 className="font-bold text-3xl">Sign in to ChatApplication</h1>
                <p className="text-zinc-500 mt-2 mb-4">Enter your Username below to login into your account</p>
                <form onSubmit={HandleSumbit}>
                    <div className="flex flex-col mt-7">
                        <label className="font-semibold">UserName</label>
                        <input disabled={isLoading} type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} placeholder="Enter Your UserName" className="p-2 mx-2 m-2 outline-zinc-600 border-1 border-zinc-500 rounded-xl" required />
                    </div>
                    <div className="flex flex-col mt-3">
                        <label className="font-semibold" >Password</label>
                        <input disabled={isLoading} type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Your Password" className="p-2 mx-2 m-2 outline-zinc-600 border-1 border-zinc-500 rounded-xl" required />
                    </div>

                    <button
                        type="sumbit"
                        disabled={isLoading}
                        className=" cursor-pointer bg-zinc-200 text-zinc-950 font-sans p-2 w-full my-6 rounded-xl hover:bg-zinc-300 ease-in-out mb-10">
                        {isLoading ? <img src={loader} className="max-h-4 max-w-4 mx-auto shrink-0 animate-spin" alt="loader" /> : "Sign In"}
                    </button>
                </form>
                <p className="text-zinc-500">New User? <span className="text-blue-500 underline"><Link to="/register">Register</Link></span></p>
            </div>
            <ToastContainer />
        </motion.div>
    )
}

export default LoginPage;