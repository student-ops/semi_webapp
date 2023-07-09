import { useEffect, useState } from 'react';
import Remark from './remark';
import { Chatlog, RemarkType } from '@/lib/types';

function StreamResponse({ chat, setLoading,setChat }: { chat: Chatlog; setLoading: (loading: boolean) => void ; setChat: (chatlog: Chatlog) => void}) {

  const [data, setData] = useState('');
  // let url = '/api/mock/streaming' //change 
  const url = "http://localhost:4000/llama_chat"

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
            break;
          }
  
          const chunk = decoder.decode(value);
          let uuid = ""
          //devide to fuction unit
          if (isFirstChunk && chunk.startsWith('id:')) {
            const [id, ...rest] = chunk.split('\n');
            const idValue = id.split(':')[1];
            const restJoined = rest.join('\n');
            uuid = idValue;
            isFirstChunk = false;
          } else {
            setData(oldResponse => oldResponse + chunk);
          }
          let chatlog = {
            message : chat.message,
            response : data,
            id: uuid,
          }
          setChat(chatlog)
        }
      };
  
      processStream();
    };
  
    fetchData();
  }, []);

  const remark: RemarkType = {
    message: data,
    user :0
  };


  return (
    <>
      <Remark remark={remark}/>
    </>
  );

}

export default StreamResponse;
