import StreamResponse from '@/components/streaming';
import { useEffect, useState } from 'react';
import { Chatlog,Verification , RemarkType } from '@/lib/types';
import Remark from '@/components/remark';
import {PromptSuggestions} from '@/lib/suggestions'
import Suggestion from '@/components/chat_suggestion';


const Verifycation: React.FC = () => {
    const [response, setResponse] = useState<{eval_result: string[]}>({eval_result: []});

    useEffect(() => {
        fetch('http://localhost:4000/llama_evaluate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": "8da4d957-d9e4-48f1-a2ff-ad717314f43a",
                "query":"どのような人材を目指していますか 日本語で回答して"
            }),
        })
        .then(response => response.json())
        .then(data => setResponse(data))
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            Response: {response.eval_result.join(', ')}
        </div>
    );
}

export default Verifycation;
