import StreamResponse from '@/components/streaming';
import { useEffect, useState,useRef } from 'react';
import { Chatlog, Verification , RemarkType } from '@/lib/types';
import Remark from '@/components/remark';
import React from 'react';
import Suggestion from '@/components/chat_suggestion';
interface ChatFieldProps {
    chatLog: Chatlog[];
    setChatLog: React.Dispatch<React.SetStateAction<Chatlog[]>>;
    PromptSuggestions:string[];
}

require('dotenv').config()
const ChatField: React.FC<ChatFieldProps> = ({ chatLog, setChatLog,PromptSuggestions }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog]);
  let backend_url = "http://localhost:4000"
  if(process.env.NEXT_PUBLIC_BACKEND_URL !== undefined){
    backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
  }
  console.log(backend_url)

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  // const [veriefycations,setVeriefycations] = useState<Verification>()
  const [chat, setChat] = useState<Chatlog>();
  
  useEffect(() => {
    if (chat) { // Check if 'chat' is not undefined
      console.log("index chat")
      console.log(chat)
      setChatLog(prevChatLog => {
          let updatedChatLog = [...prevChatLog];
          updatedChatLog.pop(); // Remove last element
          updatedChatLog.push(chat); // Append 'chat' at the end
          return updatedChatLog;
      });
    }
  }, [chat]); 

  // useEffect(() => {
  //   console.log("update chatLog")
  //   console.log(chatLog);
  // }, [chatLog]); 

  const handleVerificationClick = async (id: string,query:string) => {
    
    console.log("Verification clicked for id:", id);
    // Fetch data and handle response
    const correctness = await GetCorrectness(id,query);
    const source_nodes = await FetchSourcenodes(id);

    let newChatLog = [...chatLog];
    let chatLogEntry = newChatLog.find((entry) => entry.id === id);

    // If chat log entry exists, update it with fetched data
    if (chatLogEntry) {
      chatLogEntry.verification! = {
        correctness: correctness,
        nodes: source_nodes,
      }
      setChatLog(newChatLog);
    } else {
      console.error("Chat log entry not found for id:", id);
    }
  };
  const FetchSourcenodes = async (id: string) => {
    try {
      const response = await fetch(backend_url +'/chat_source_nodes', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            //must change id
              "id": id,
          }),
      });

      // レスポンスをチェックします。
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      // データをパースします。
      const data = await response.json();

      // データをリターンします。
      return data.source_nodes;
  } catch (error) {
    const err = error as Error;
    console.error('Error:', err);
    return { error: err.message };
}

  } 

  const GetCorrectness = async (id: string,query:string) => {
      try {
          const response = await fetch(backend_url+'/llama_evaluate', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
              //must change id
                  "id": id,
                  "query":query
              }),
          });

          // レスポンスをチェックします。
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          // データをパースします。
          const data = await response.json();

          // データをリターンします。
          return data.eval_result;
      } catch (error) {
        const err = error as Error;
        console.error('Error:', err);
        return { error: err.message };
    }
  };

  const verification_class = "my-4 rounded-lg shadow-md "

  return (
<div className='flex flex-col h-full'>
      <div className='flex-grow max-h-[50vh] overflow-auto'>
      {chatLog.map((log, index) => 
        <div key ={`chat-root${index}`}className={log.verification === undefined ?'flex w-full' :'flex flex-col my-4'}>
          <div className={log.verification === undefined ?'flex justify-center w-full' :'w-full flex ' }>
            {log.verification === undefined && log.id !=="0" && !loading ?<p onClick={() => handleVerificationClick(log.id,log.message)} className='my-auto px-3 py-2 font-bold rounded-xl shadow-xl bg-gray-500 text-white hover:bg-gray-700'>検証する</p> :<></>}
            <div className={log.verification ===undefined ?'flex flex-col w-4/5 items-center':'w-full'}>
              <Remark key={index} remark={{message: log.message, user: 1}}/>
              {log.response === undefined 
                ? <StreamResponse key={`resp-${index}`} chat={log} setLoading={setLoading} setChat={setChat} />
                : <Remark key={`resp-${index}`} remark={{user: 0, message: log.response}}/>
              }
            </div>
          </div>
          {
            log.verification === undefined 
            ? <></>
            : (
              <div className='w-4/5'>
                {log.verification.nodes?.map((node, i) => (
                  <React.Fragment key={i}>
                    <div className={`${verification_class} ${log.verification!.correctness![i] === 'YES'? "bg-green-300":"bg-red-300"}`}>
                      <div className='p-3'>
                        <p>
                          Correctness: {log.verification!.correctness ? log.verification!.correctness[i] : "Not available"}
                        </p>
                        <p className='py-3 whitespace-normal break-words'>{node}</p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                  {log.verification?.correctness && 
                    <p>
                      正確性の検証結果 : 
                      {`${log.verification.correctness.filter(c => c === 'YES').length} / ${log.verification.correctness.length}`}
                    </p>
                  }
              </div>
            )
          }
        </div>
      )}
      <div ref={messagesEndRef} />
    </div >
    <div className='mb-2 absolute bottom-0 w-full'>
    <Suggestion setMessage = {setMessage} PromptSuggestions={PromptSuggestions}/>
    <form onSubmit={(e) => {
      e.preventDefault();
      if (loading || message === "") {
          return;
      }

      const chat = {
          message: message,
          // must refine
          id: "a",
      }

      setChatLog(prevChat => [...prevChat, chat]);
      setMessage("")
    }}
    className='w-11/12 mx-auto'
    >
      <div className="editor rounded-lg flex flex-col text-gray-800 border border-gray-300 p-3 shadow-lg max-w-2xl bg-white">
      <div className="flex items-center justify-between">
        <input
            className="title rounded bg-gray-100 border border-gray-300 p-2 outline-none flex-grow"
            spellCheck="false"
            placeholder="Send a message"
            type="text"
            value={message}
            onChange={(e) => {
                // console.log(e.currentTarget.value)
                setMessage(e.currentTarget.value)
            }}
        />
        <button type="submit" className={`ml-2 p-2 rounded-lg ${loading ? "bg-red-200" : "bg-emerald-400"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="18" height="18">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M1.923 1.066a1 1 0 0 1 1.32-.08l16.2 9.368a1.5 1.5 0 0 1 0 2.52l-16.2 9.367a1 1 0 0 1-1.439-1.32L3.8 11.799 1.116 2.386A1 1 0 0 1 1.923 1.066z"/>
          </svg>
        </button>
      </div>
      </div>
    </form>
    </div>
  </div>
  );
}

export default ChatField;