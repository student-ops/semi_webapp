import StreamResponse from '@/components/streaming';
import { useEffect, useState } from 'react';
import { Chatlog,Verifycation , RemarkType } from '@/lib/types';
import Remark from '@/components/remark';
import {PromptSuggestions} from '@/lib/suggestions'
import Suggestion from '@/components/chat_suggestion';

export default function Home() {
  let initialchatLog: Chatlog[] = [
    {
      message : "どのような学部ですか",
      response:"ITについて学びます",
      id:"1",
    },
    {
      message : "もう少し具体的に教えて",
      id:"2",
    },
    // 他のChatlog要素...
  ];

  const [chatLog, setChatLog] = useState<Chatlog[]>(initialchatLog);
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [veriefycations,setVeriefycations] = useState<Verifycation[]>([])
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

  useEffect(() => {
    console.log("update chatLog")
    console.log(chatLog);
  }, [chatLog]); 
  return (
    <div>
      <h1>Sample</h1>
      <h1>Streaming Data Display</h1>
      {chatLog.map((log, index) => 
        <>
          <Remark key={index} remark={{message: log.message, user: 1}}/>
          {log.response == null || ""
            ? <StreamResponse key={`resp-${index}`} chat={log} setLoading={setLoading} setChat={setChat} />
            : <Remark key={`resp-${index}`} remark={{user: 0, message: log.response}}/>
          }
        </>
      )}
      {
        loading && <p>loading...</p>
      }
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
