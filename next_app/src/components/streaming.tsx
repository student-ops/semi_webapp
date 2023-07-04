import { useEffect, useState } from 'react';
import Remark from './remark';
import { Chatlog, RemarkType } from '@/lib/types';

function Streaming({ chatlog, setLoading }: { chatlog: Chatlog; setLoading: (loading: boolean) => void }) {

  const [data, setData] = useState('');
  let url = '/api/mock/streaming' //change 

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
          question: chatlog.message,
        }),
      });
  
      const readableStream = response.body;
      const reader = readableStream!.getReader();
      const decoder = new TextDecoder('utf-8');
  
      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            setLoading(false);
            console.log('Streaming ended.');
            break;
          }
  
          const chunk = decoder.decode(value);
          setData((oldResponse) => oldResponse + chunk);
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

export default Streaming;
