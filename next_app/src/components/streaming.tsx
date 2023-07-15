import { useEffect, useState, useRef } from 'react';
import Remark from './remark';
import { Chatlog, RemarkType } from '@/lib/types';
import { useRouter } from 'next/router';

function StreamResponse({ chat, setLoading, setChat }: { chat: Chatlog; setLoading: (loading: boolean) => void; setChat: (chatlog: Chatlog) => void }) {
  const router = useRouter();
  const botType = router.query.botType; 
  const dataRef = useRef('');
  const [_, setRender] = useState(0); // we only use this state to trigger re-renders
  let url = '/api/mock/streaming'
  if(process.env.NEXT_PUBLIC_BACKEND_URL !== undefined){
    url = process.env.NEXT_PUBLIC_BACKEND_URL 
    url += '/llama_chat'
  }
  console.log("on streaming "+url)
  let uuid :string

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bot_name: 'faculty',
          question: chat.message,
        }),
      });

      const readableStream = response.body;
      const reader = readableStream!.getReader();
      const decoder = new TextDecoder('utf-8');
      let isFirstChunk = true;

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            setLoading(false);
            let newchat = {
              message: chat.message,
              response: dataRef.current,
              id: uuid,
            }
            setChat(newchat);
            break;
          }

          const chunk = decoder.decode(value);
          if (isFirstChunk && chunk.startsWith('id:')) {
            const [id, ...rest] = chunk.split('\n');
            const idValue = id.split(':')[1];
            uuid = idValue;
            isFirstChunk = false;
          } else {
            dataRef.current += chunk;
            setRender(prevState => prevState + 1); // trigger a re-render
          }
        }
      };

      processStream();
    };

    fetchData();
  }, []);
  const remark: RemarkType = {
    message: dataRef.current, // use the current value of dataRef
    user :0
  };

  return (
    <>
      <Remark remark={remark}/>
    </>
  );
}

export default StreamResponse;
