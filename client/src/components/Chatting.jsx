
export function Chatting({ messages, userId, selectedUserId }) {

  let user = userId
 
  return (
    <div className="h-full w-full px-2 overflow-auto">
      {
        messages
          .filter((msg) =>
            (msg.senderId === user && msg.receiverId === selectedUserId) ||
            (msg.senderId === selectedUserId && msg.receiverId === user)
          )
          .map((msg) => (
            <div key={msg._id}>
              {msg.senderId === user ? (
                <div className="bg-zinc-100 text-zinc-900 w-fit max-w-65 lg:max-w-150 py-3 px-5 my-4 rounded-[15px] ml-auto">
                 { msg.file &&
                  <img className="rounded-xl shadow" src={msg.file} alt={msg.file} />

                 }
                    {
                      msg.text &&
                       <p className="text-xl font-semibold">{msg.text}</p>
                    }
                   <p className="text-zinc-500 text-sm place-self-end font-light ">{new Date(msg.updatedAt).toLocaleDateString() + " " + new Date(msg.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              ) : (
                <div className="bg-zinc-900 text-zinc-100 w-fit max-w-65 lg:max-w-150 py-3 px-5 my-4 rounded-[15px]">
                
                   
                 { msg.file &&
                  <img className="rounded-xl shadow" src={msg.file} alt={msg.file} />

                 }
                    {
                      msg.text &&
                       <p className="text-xl font-semibold">{msg.text}</p>
                     
                    }
                    
                    <p className="text-zinc-400  text-sm font-light ">{new Date(msg.updatedAt).toLocaleDateString() + " " + new Date(msg.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>

                </div>
                
              )}
            </div>
          ))

      }


    </div>
  );
}








