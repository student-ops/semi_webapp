import { useEffect, useState } from 'react';

function StreamDisplay({ url, botName, question }) {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bot_name: botName,
          question: question,
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      const processStream = (result) => {
        if (result.done) return;
      
        const chunk = decoder.decode(result.value);
        setData((oldResponse) => oldResponse + chunk);
      
        reader.read().then(processStream);
      }

      reader.read().then(processStream);
    };     


    fetchData();
  }, [url, botName, question]);  // 依存配列を追加


  return (
    <pre>{data}</pre>
  );
}

export default StreamDisplay;
