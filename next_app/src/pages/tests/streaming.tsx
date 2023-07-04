import StreamDisplay from '../../components/streaming';
import { useEffect, useState } from 'react';
import { Chatlog , RemarkType } from '@/lib/types';
import Remark from '@/components/remark';

export default function Home() {
  let initialchatLog: Chatlog[] = [
    {
      message : "どのような学部ですか",
      response:"ITについて学びます",
      id : 1234
    },
    {
      message : "もう少し具体的に教えて",
      id : 1234,
    },
    // 他のChatlog要素...
  ];

  const [chatLog, setChat] = useState(initialchatLog);

  return (
    <div>
      <h1>Sample</h1>
      <h1>Streaming Data Display</h1>
      {chatLog.map((log, index) => 
        <>
          <Remark key={index} remark={{message: log.message, user: 1}}/>
          {log.response == null 
            ? <StreamDisplay key={index} chatlog={log}/> 
            : <Remark key={`resp-${index}`} remark={{user: 0, message: log.response}}/>
          }
        </>
      )}
    </div>
  );
}
