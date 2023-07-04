import React, { useState, useEffect } from "react";

const PromptSuggestions = [
    "どのような履修科目がありますか",
    "主にどのような業界に就職しますか",
    "生徒の出身の割合は?",
    "a",
    "b",
    "生徒の出身の割合は?",
    "d",
    "e",
    "f",
    "g"
]

export default function Suggestion() {
    const [suggestions, setSuggestions] = useState<string[][]>([]);
    const [page,setPage] = useState(0);

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
        <div className="w-full flex justify-center ">
            
            <div className="w-1/2 flex items-center justify-center">
                { page > 0 && <p onClick={prevPage}>&lt;</p>}
                <div className="flex-col">
                    <div className="flex justify-center">
                        {suggestions.map((_,index) =>
                            <p key = {index}>{page === index ?'◯':'●'}</p>
                        )}
                    </div>
                    
                    {suggestions[page]?.map((suggestion, index) =>
                    <p key={index} className="mb-2">{suggestion}</p>
                )}
                </div>
                {page < suggestions.length -1 &&<p onClick={nextPage}>&gt;</p>}
            </div>
        </div>
    )
}
