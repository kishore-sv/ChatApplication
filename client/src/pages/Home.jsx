import { easeInOut, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import hero from '../assests/hero.png'
import hero2 from '../assests/hero2.png'
import hero3 from '../assests/hero3.png'
import mess1 from '../assests/mess1.png'
import mess2 from '../assests/mess2.png'


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

            <div className="w-full py-5 px-30 ">
                <div className="border-2 border-zinc-500 rounded-xl p-2 my-5 ">
                    <h1 className="text-xl font-extrabold">Get started <br className="hidden " />with a <br /> new ChatApplication</h1>
                    <button
                        onClick={HandleRegister}
                        className="lg:hidden border-1 my-5 font-semibold border-zinc-100 text-zinc-200 font-sans p-4 rounded-[30px] hover:text-zinc-900 hover:bg-zinc-100 ease-in-out">
                        Get Start </button>
                </div>
                <div className="  ">
                    <div className=" ">
                        <div className="w-[40vw]  flex items-center justify-between ">
                            <img className=" " src={mess1} alt="message" />
                            <img className=" " src={mess2} alt="message" />
                        </div>
                    </div>

                    <div className="outline-1 outline-zinc-400 rounded-2xl shadow-xl shadow-zinc-600 ">
                        <img className="h-[30vh] w-[40vw] rounded-2xl " src={hero2} alt="message" />
                    </div>
                    <img src={hero} alt="" />
                    <img src={hero2} alt="" />
                    <img src={hero3} alt="" />


                    







                </div>
            </div>


        </motion.div>

    )
}

export default Home