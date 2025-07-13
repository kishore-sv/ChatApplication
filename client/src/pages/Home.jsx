import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
// import hero from '../assests/hero.png'
// import hero2 from '../assests/hero2.png'
// import hero3 from '../assests/hero3.png'
// import mess1 from '../assests/mess1.png'
// import mess2 from '../assests/mess2.png'
import chat1 from '../assests/chat1.png'
import chat2 from '../assests/chat2.png'
import chat3 from '../assests/chat3.png'


function Home() {
    const navigate = useNavigate();
    const HandleRegister = () => {
        navigate('/register')
    }
    const HandleLogin = () => {
        navigate('/login')
    }
    return (
        <motion.div
            initial={{ filter: 'blur(5px)' }}
            animate={{ filter: 'blur(0px)' }}
            transition={{ duration: .3, }}
            className=" ">

            <nav className="w-[98vw] lg:w-[100vw] h-22 p-2 lg:p-4 sticky top-0 bg-zinc-950  border-b-1 border-zinc-500 flex items-center justify-center lg:justify-between gap-5 lg:gap-10">
                <div className=" lg:hidden mb-4 font-extrabold text-sm leading-2">
                    <p>___</p>
                    <p>___</p>
                    <p>___</p>
                </div>



                <h1 className="text-xl font-bold lg:text-2xl lg:font-extrabold text-zinc-200">ChatApplication</h1>
                <div className="lg:flex">
                    <button
                        onClick={HandleRegister}
                        className="hidden lg:flex cursor-pointer border-1 font-semibold border-zinc-100 text-zinc-200 font-sans p-4 rounded-[30px] hover:text-zinc-900 hover:bg-zinc-100 ease-in-out">
                        Get Start </button>
                    <button
                        onClick={HandleLogin}
                        className=" cursor-pointer border-1 font-bold border-zinc-100 text-zinc-200 font-sans p-2 lg:p-4 rounded-[40px] hover:text-zinc-900 hover:bg-zinc-100 ease-in-out ml-6">
                        Login </button>
                </div>
            </nav>

            <div className="w-full py-5  ">
                <div className=" mx-auto lg:mx-30 p-2 my-5 flex justify-center items-center ">
                    <h1 className="text-3xl font-mono font-extrabold">Get started <br className="hidden " />with a <br /> new ChatApplication</h1>
                </div>
                <div className="flex justify-center items-center ">
                    <button
                        onClick={HandleRegister}
                        className="lg:hidden border-1 mx-auto  my-5 font-semibold border-zinc-100 text-zinc-200 font-sans p-4 rounded-[30px] hover:text-zinc-900 hover:bg-zinc-100 ease-in-out">
                        Get Start
                    </button>
                </div>
                <div className="w-full lg:h-[70vh] px-2 lg:px-60 flex items-center justify-between">
                    <div className=" rounded-lg overflow-hidden  flex items-center justify-between ">
                        <img className="object-cover" src={chat1} alt="message" />
                    </div>
                </div>
                <div className="w-full h-[20vh] px-2 lg:px-60 flex items-center justify-center">
                    <div className=" rounded-lg overflow-hidden flex items-center justify-center ">
                        <p className="text-center text-2xl font-mono ">Funny Chats with your buddies</p>
                    </div>
                </div>
                <div className="w-full lg:h-[70vh] px-2 lg:px-[10rem] flex items-center justify-center ">
                    <div className=" rounded-lg overflow-hidden flex items-center justify-between ">
                        <img className="object-cover" src={chat2} alt="message" />
                        <p className="lg:text-3xl text-center font-bold font-mono">Easy images sharing</p>
                    </div>
                </div>
                <div className="w-full h-[20vh] px-2 lg:px-60 flex items-center justify-center">
                    <div className=" rounded-lg overflow-hidden flex items-center justify-center ">
                        <p className="text-center text-2xl font-mono ">Connect, Chat, Share <br /> Your Thoughts </p>
                    </div>
                </div>
                <div className="w-full lg:h-[70vh] px-2 lg:px-60 flex items-center justify-between">
                    <div className=" rounded-lg overflow-hidden  flex items-center justify-between ">
                        <img className="object-cover" src={chat3} alt="message" />
                    </div>
                </div>
                <p className="text-3xl mt-7 text-center font-bold font-mono">Happy Chatting</p>
            </div>


        </motion.div>

    )
}

export default Home