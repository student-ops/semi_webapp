import ChatField from '@/components/chat_field'
import { Chatlog } from '@/lib/types';
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
    const [bot_type, setBotType] = useState<string>("");
    const [chatLogFaculty, setChatLogFaculty] =useState<Chatlog[]>([]);
    const [chatLogResearch, setChatLogResearch] = useState<Chatlog[]>([]);
  
    // Define state to switch bot
    const [currentBot, setCurrentBot] = useState("");
  
    // ... chat operations here
  
    const chatLog = currentBot === 'faculty' ? chatLogFaculty : chatLogResearch;
    const setChatLog = currentBot === 'faculty' ? setChatLogFaculty : setChatLogResearch;
  
    return (
        <>  
            <Image 
                alt="faculty" 
                src="/1538298822.svg"
                width={500} 
                height={300} 
                onClick={() => setCurrentBot('faculty')} 
            />
            {currentBot === 'faculty' && <ChatField chatLog={chatLog} setChatLog={setChatLog}/>}
            <Image 
                alt="research" 
                src="/1538298822.svg"
                width={500} 
                height={300} 
                onClick={() => setCurrentBot('research')} 
            />
            {currentBot === 'research' && <ChatField chatLog={chatLog} setChatLog={setChatLog}/>}
        </>
    )
}
