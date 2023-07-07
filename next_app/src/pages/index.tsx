import StreamDisplay from '@/components/streaming';
import { useEffect, useState } from 'react';
import { Chatlog , RemarkType } from '@/lib/types';
import Remark from '@/components/remark';
import {PromptSuggestions} from '@/lib/suggestions'
import Suggestion from '@/components/chat_suggestion';

export default function Home() {
  let initialchatLog: Chatlog[] = [
    {
      message : "どのような学部ですか",
      response:"ITについて学びます",
    },
    {
      message : "もう少し具体的に教えて",
    },
    // 他のChatlog要素...
  ];

  const [chatLog, setChatLog] = useState(initialchatLog);
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  return (
    <div>
      <h1>Sample</h1>
      <h1>Streaming Data Display</h1>
      {chatLog.map((log, index) => 
        <>
          <Remark key={index} remark={{message: log.message, user: 1}}/>
          {log.response == null 
            ?<StreamDisplay key={index} chatlog={log} setLoading={setLoading} />
            : <Remark key={`resp-${index}`} remark={{user: 0, message: log.response}}/>
          }
          
        </>
      )}
      {
        loading && <p>loading...</p>
      }
      <div id="Suggestions">
        <p>
          Suggestions
        </p>
        {/* {
          PromptSuggestions.map((suggestion, index) =>
            <p key={index}
            onClick={(e) => {
              const target = e.currentTarget as HTMLParagraphElement;
              setMessage(target.innerText);
            }}>{suggestion}</p>
          )
        } */}
      </div>
      <Suggestion setMessage = {setMessage}/>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (loading) {
            return;
        }

        const chat = {
            message: message,
            id: 1234
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
