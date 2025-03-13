import { motion } from "motion/react"

export function PreviweFile({showPreview,setShowPreview,file,setFile,handleSendFile,fileText,setFileText}) {
    const handleShowPreview=()=>{
        setFile("")
        setShowPreview(true)
    }
    return (
        <>
        {
            (file && !showPreview )&&
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .3 }}
            className="h-[70vh] flex flex-col  max-w-[60vw]  bg-zinc-900 rounded-xl px-5 pt-5 pb-3 m-auto mt-30 z-10 absolute overflow-auto">
            <div className="w-5 h-5 rounded-full z-5 cursor-pointer " onClick={handleShowPreview}>
                <img className="rounded-full" src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-cross-icon-png-image_956622.jpg" alt="" />
            </div>

            <img className="rounded-lg" src={URL.createObjectURL(file)} alt="" />


            <div className="flex p-2 gap-2">
                <input
                value={fileText}
                onChange={(e)=>{setFileText(e.target.value)}}
                    type="text" placeholder="Add your message..." className="p-2 w-[80%] lg:w-[90%]  outline-zinc-600 border-1 border-zinc-500 rounded-lg" />
                <button
                    onClick={handleSendFile}
                    title="Send"
                    
                    className="w-full lg:w-[15%] cursor-pointer  bg-zinc-200 text-zinc-950 font-sans p-2   rounded-lg hover:bg-zinc-300 ease-in-out">
                    Send 
                </button>
            </div>

        </motion.div>
        }
           
        </>
    )
}