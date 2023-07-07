import React, { useState, useEffect } from "react";
import { PromptSuggestions } from "@/lib/suggestions";
import { useSwipeable } from 'react-swipeable';


const Suggestion: React.FC<{ setMessage: (message: string) => void }> = ({ setMessage }) => {
    const [suggestions, setSuggestions] = useState<string[][]>([]);
    const [page,setPage] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: () => nextPage(),
        onSwipedRight: () => prevPage(),
        trackMouse: true
   });
    
    useEffect(() => {
        let chunks: string[][] = [];
        for (let i = 0; i < PromptSuggestions.length; i += 3) {
            chunks.push(PromptSuggestions.slice(i, i + 3));
        }
        setSuggestions(chunks);
    }, []);

    const nextPage = () => {
        if (page < suggestions.length - 1) {
            setPage(page + 1);
        }
    }

    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    return(
        <div className="w-full flex justify-center " {...handlers}>
            
            <div className="flex items-center justify-center">
                { page > 0 && <p onClick={prevPage}>&lt;</p>}
                <div className="flex-col">
                    <div className="flex justify-center">
                        {suggestions.map((_,index) =>
                            <p key = {index}>{page === index ?'◯':'●'}</p>
                        )}
                    </div>
                    
                    {suggestions[page]?.map((suggestion, index) =>
                    <p onClick={(e) => {
                        const target = e.currentTarget as HTMLParagraphElement;
                            setMessage(target.innerText);
                        }
                        }
                        key={index} className="mb-2">{suggestion}</p>
                )}
                </div>
                {page < suggestions.length -1 &&<p onClick={nextPage}>&gt;</p>}
            </div>
        </div>
    )
    
}

export default Suggestion