import StreamResponse from '@/components/streaming';
import { useEffect, useState } from 'react';
import { Chatlog, Verification , RemarkType } from '@/lib/types';
import Remark from '@/components/remark';
import React from 'react';
import Suggestion from '@/components/chat_suggestion';

require('dotenv').config()
export default function Home() {
  let backend_url = "http://localhost:4000"
  if(process.env.NEXT_PUBLIC_BACKEND_URL !== undefined){
    backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
  }
  // console.log(backend_url)
  let initialchatLog: Chatlog[] = [
    {
      message : "どのような学部ですか",
      response:"ITについて学びます",
      id:"sample1",
    },
    {
      message : "もう少し具体的に教えて",
      id:"2",
    },
  ];

  const [chatLog, setChatLog] = useState<Chatlog[]>(initialchatLog);
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
    <div>
      <h1>Sample</h1>
      <h1>Streaming Data Display</h1>
    <div className='w-full'>
      {chatLog.map((log, index) => 
        <div className={log.verification === undefined ?'flex w-full' :'flex flex-row-reverse my-4'}>
          <div className={log.verification === undefined ?'flex justify-center w-full' :'w-1/3 flex items-center' }>
            {log.verification === undefined ?<p onClick={() => handleVerificationClick(log.id,log.message)} className='my-auto'>検証する</p> :<></>}
            <div className={log.verification ===undefined ?'flex flex-col w-1/2 items-center':'w-full'}>
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
              <div className='w-2/3'>
                {log.verification?.correctness && 
                  <p>
                    Correctness Ratio: 
                    {`${log.verification.correctness.filter(c => c === 'YES').length} / ${log.verification.correctness.length}`}
                  </p>
                }
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
              </div>
            )
          }
        </div>
      )}
    </div>
    <Suggestion setMessage = {setMessage}/>
    <form onSubmit={(e) => {
      e.preventDefault();
      if (loading) {
          return;
      }

      const chat = {
          message: message,
          // must refine
          id: "a",
      }

      setChatLog(prevChat => [...prevChat, chat]);
      setMessage("")
    }}>
      <div className="editor rounded-lg  flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input
          className="title rounded bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Send a message"
          type="text"
          value={message}
          onChange={(e) => {
              // console.log(e.currentTarget.value)
              setMessage(e.currentTarget.value)
          }}
        />
        <div className="buttons flex mt-3">
            <button type="submit" className={
              loading ? "bg-red-200" :
              "bg-green-400"}>
                Submit
            </button>
        </div>
      </div>
    </form>
  </div>
  );
}
