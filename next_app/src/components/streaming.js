// components/StreamDisplay.js
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

      let buffer = '';

      reader.read().then(function processText({ done, value }) {
        if (done) {
          return;
        }

        // Add the new data to the buffer
        buffer += decoder.decode(value);

        // Check if the buffer contains a complete message
        const messageEndIndex = buffer.indexOf('\n\n');
        if (messageEndIndex !== -1) {
          // Extract the complete message from the buffer
          const completeMessage = buffer.slice(0, messageEndIndex);

          // Remove "data: " from the message and add it to the existing data
          const cleanMessage = completeMessage.replace(/^data: /, '');
          setData((prevData) => prevData + cleanMessage);

          // Remove the complete message from the buffer
          buffer = buffer.slice(messageEndIndex + 2);
        }

        return reader.read().then(processText);
      });
    };

    fetchData();
  }, [url, botName, question]);

  return (
    <pre>{data}</pre>
  );
}

export default StreamDisplay;
