import React, { useState, useEffect } from "react";

const PromptSuggestions = [
  "どのような履修科目がありますか",
  "主にどのような業界に就職しますか",
  "生徒の出身の割合は?",
  // 他のプロンプト
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
    "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1","1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1","1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1","1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1","1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
];

const SuggestionsComponent = () => {
  const [list, setList] = useState([...PromptSuggestions.slice(0, 10)]);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (loadMore && list.length < PromptSuggestions.length) {
      const moreData = PromptSuggestions.slice(list.length, list.length + 10);
      setList([...list, ...moreData]);
      setLoadMore(false);
    }
  }, [loadMore, list]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
        setLoadMore(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="p-4">
      {list.map((suggestion, index) =>
        <p key={index} className="mb-2">{suggestion}</p>
      )}
      {loadMore && list.length < PromptSuggestions.length &&
        <p className="text-center">Loading...</p>
      }
    </div>
  );

};

export default SuggestionsComponent;
