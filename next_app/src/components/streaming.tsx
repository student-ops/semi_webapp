import { useEffect, useState } from 'react';
import Remark from './remark';
import { Chatlog, RemarkType } from '@/lib/types';

function Streaming({chatlog}:{chatlog:Chatlog}) {
  const [data, setData] = useState('');
  let url = '/api/mock/streaming' //change 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bot_name: "faculty",
          question: chatlog.message,
        }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder('utf-8');

      const processStream = (result:any) => {
        if (result.done) return;
      
        const chunk = decoder.decode(result.value);
        setData((oldResponse) => oldResponse+ chunk);
      
        reader.read().then(processStream);
      }

      reader.read().then(processStream);
    };     


    fetchData();
  }, [chatlog]);  // 依存配列を追加
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

export default Streaming;
