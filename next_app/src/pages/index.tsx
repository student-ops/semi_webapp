import ChatField from '@/components/chat_field'
import { Chatlog } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';
import {PromptSuggestionsReserch,PromptSuggestionsFaculty} from '@/lib/suggestions';

export default function Home() {
    const initialChatlogfaculty: Chatlog = {
        id:"0",
        message:"こんにちは",
        response:"こんにちは！学科について聞きたいことがあれば聞いてください！",
    }
    const initialChatlogreserch: Chatlog = {
        id:"0",
        message:"こんにちは",
        response:"こんにちは！視覚メディア研究室について聞きたいことがあれば聞いてください！",
    }
    const [chatLogFaculty, setChatLogFaculty] = useState<Chatlog[]>([initialChatlogfaculty]);
    const [chatLogResearch, setChatLogResearch] = useState<Chatlog[]>([initialChatlogreserch]);
  
    // Define state to switch bot
    const [currentBot, setCurrentBot] = useState("research");

    const bots = ['research','faculty'];

    return (
        <div className='h-screen'>  
            <div id = "contianer" className='m-4  w-full '>
            <div className='flex'>
                {bots.map(bot => (
                    <button 
                        key={bot}
                        className={`p-4 rounded-lg text-lg flex items-center justify-center text-white ${currentBot === bot ? 'bg-emerald-400 ' : 'bg-gray-500 '}`} 
                        onClick={() => setCurrentBot(bot)}
                    >
                        <p className="text-lg">{bot === 'faculty' ? '学科について聞く' : '研究室について聞く'}</p>
                        <Image 
                            alt={bot}
                            src="/1538298822.svg"
                            width={100} 
                            height={100} 
                        />
                    </button>
                ))}
            </div>
            <div className='h-5/6'>
            {currentBot === 'faculty' && <ChatField chatLog={chatLogFaculty} setChatLog={setChatLogFaculty} PromptSuggestions={PromptSuggestionsFaculty}/>}
            {currentBot === 'research' && <ChatField chatLog={chatLogResearch} setChatLog={setChatLogResearch} PromptSuggestions={PromptSuggestionsReserch}/>}
            </div>
            </div>
        </div>
    )
}