import StreamDisplay from '../components/streaming';
import { useEffect, useState } from 'react';

export default function Home() {
  const [chatLog, setChat] = useState([]);
  return (
    <div>
      <h1>Streaming Data Display</h1>
      <StreamDisplay url="http://localhost:4000/llama_chat" botName="faculty" question="どのような人材を目指していますか。" />
    </div>
  );
}