import { useNavigate } from "react-router-dom"

function NoPage(){
    const navigate=useNavigate();
    const HandleClick=()=>{
        navigate('/');
       
    }
return(
    <div className=" w-[100vw] h-[100vh] flex flex-col align-center justify-center">
        <div className="m-auto">
        <h1 className="text-2xl font-extrabold">No Page Found</h1>
        <button onClick={HandleClick} className=" cursor-pointer bg-zinc-200 text-zinc-950 font-sans p-2 w-full my-6 rounded-xl hover:bg-zinc-300 ease-in-out mb-10">
            Go To Home Page
        </button>
        </div>
       
    </div>
)
}

export default NoPage;