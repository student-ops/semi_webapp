'use client';
import React, { useEffect, useState } from 'react';

export default function StreamingPage() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:4000/llama_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "prefecture": "愛媛県",
          "question": "観光スポットはありますか？"
        })
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      const processStream = async (result :any) => {
        if (result.done) return;
        const chunk = decoder.decode(result.value);

        try {
          setResponse((oldResponse) => oldResponse + chunk);
        } catch (error) {
          console.error('Error processing chunk:', error);
        }

        reader?.read().then(processStream);
      };

      reader?.read().then(processStream);
    };

    fetchData();
  }, []);

  return (
    <div>
      <pre>{response}</pre>
    </div>
  );
}