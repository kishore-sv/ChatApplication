import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import eye from '../assests/eye.png'
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'motion/react'

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [avatar, setAvatar] = useState('')
  const avatarRef=useRef(null);
  const [password, setPassword] = useState('')





 


  const HandleAvatarRef=()=>{
    avatarRef.current.click();
  }
  

  const HandleAvatar=(e)=>{
    const file=e.target.files
    if(!file) return
    setAvatar(file[0])
  }
  
  const [num,setNum]=useState(Math.floor(Math.random()*50+1));
  
  const HandleRefresh=()=>{
    setNum(Math.floor(Math.random() * 50 + 1));
  }

  const [avatarUrl,setAvatarUrl]=useState(`https://avatar.iran.liara.run/public/${num}`)
  useEffect(()=>{
    setAvatarUrl(`https://avatar.iran.liara.run/public/${num}`)
  },[num])
 
  const HandleSumbit = async (e) => {
    e.preventDefault()
    setName('')
    setUserName('')
    setAvatar('')
    setPassword('')

    let uploadedAvatarUrl = "";
    if(avatar){
    const fData=new FormData()
    fData.append("file",avatar)
    fData.append("upload_preset","Chat_Application")
    fData.append("cloud_name","dkavvdkki")
    
    try {
      const fres=await axios.post('https://api.cloudinary.com/v1_1/dkavvdkki/image/upload',fData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false, 
        });
      uploadedAvatarUrl = fres.data.secure_url; 
      setAvatarUrl(uploadedAvatarUrl)
    } catch (error) {
      toast.error(error)
      return;
    }
  }
  

    const data = { name, userName, avatar:uploadedAvatarUrl || avatarUrl, password };
    try {
      const res = await axios.post('https://chatapplication-jdq3.onrender.com/api/register', data)
      if(res.data.message==="UserThere"){
        toast.error("UserName Already exits", {
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
      if (res.data.message === 'Registered') {
        navigate('/login')
      }
      
    } catch (error) {
      toast.error("UserName Already exits", {
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

   
  }


 

  return (
    <motion.div
      initial={{ filter: 'blur(5px)' }}
      animate={{ filter: 'blur(0px)' }}
      transition={{ duration: .2 }}
      className=" flex justify-center align-center  h-[100vh] w-[100vw] text-zinc-200  ">
      <motion.div
        initial={{}}
        animate={{}}
        transition={{ duration: 1 }}
        className=" hidden lg:block h-[100vh] w-1/2 bg-zinc-300 text-zinc-900 p-5 ">
          <h1 className="font-bold text-3xl">Create an account</h1>
          <p className="font-bold text-lg text-zinc-700">Register now to explore more.</p>
          <img className=" object-cover max-h-120 mt-20" src="https://github.githubassets.com/assets/tres-amigos@2x-d52babcc9c7c.webp" alt="" />
      </motion.div>
      <div className="h-[85vh] lg:h-[86vh] w-[95vw] lg:w-[34vw] rounded-2xl flex flex-col p-10 border-1 m-auto border-zinc-600 ">
        <h1 className="font-bold text-3xl">Create an account</h1>
        <p className="text-zinc-500 mt-2 mb-4">Enter your Username below to create your account</p>
        <form onSubmit={HandleSumbit} >



          <label className="font-semibold">Profile Photo</label>
          <div className="flex  items-center gap-5 justify-center  " >
            <div className="w-20 h-20 rounded-full cursor-pointer" onClick={HandleAvatarRef}>
              {
                avatar? <img className=" object-contain rounded-full" src={URL.createObjectURL(avatar)} alt="" />:<img className=" object-contain" src={avatarUrl} alt="" />

              }
            </div>
            <div 
            onClick={HandleRefresh}
            className="w-5 h-5 self-end cursor-pointer rounded-full bg-zinc-900 ">
              <img src="https://cdn3.vectorstock.com/i/1000x1000/90/17/refresh-icon-vector-10919017.jpg" alt="" />
            </div>
            <input
              accept="image/png,image/jpg"
              className=" hidden file:cursor-pointer cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-zinc-300 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-300 hover:file:bg-zinc-100 dark:file:bg-zinc-900 dark:file:text-violet-100 dark:hover:file:bg-zinc-800"
              type="file"
              onChange={HandleAvatar}
              ref={avatarRef} /> 
          </div>




          <div className="flex flex-col mt-4">
            <label className="font-semibold">Full Name</label>
            <input type="text"
              value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Full Name"
              className="p-2 mx-2 m-2 outline-zinc-600 border-1 border-zinc-500 rounded-xl" required />
          </div>
          <div className="flex flex-col mt-3">
            <label className="font-semibold">User Name</label>
            <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} placeholder="UserName"
              className="p-2 mx-2 m-2 outline-zinc-600 border-1 border-zinc-500 rounded-xl"
              required />
          </div>
          <div className="flex flex-col mt-3">
            <label className="font-semibold">Password</label>
            <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"
              className="p-2 mx-2 m-2 outline-zinc-600 border-1 border-zinc-500 rounded-xl"
              required />
          </div>

          <button
            type="sumbit"
            className=" cursor-pointer bg-zinc-200 text-zinc-950 font-sans p-2 w-full my-6 rounded-xl hover:bg-zinc-300 ease-in-out mb-10">
            Create Account</button>
        </form>
        <p className="mb-2 text-zinc-500"> Already have an account? <span className="text-blue-500 underline"><Link to="/login">Login</Link></span></p>
      </div>

      <ToastContainer />
    </motion.div>
  )
}

export default RegisterPage;