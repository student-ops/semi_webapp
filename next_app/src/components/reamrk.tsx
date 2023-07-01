import React from 'react';

export default function Remark({data}: {data: string}) {
  return (
    data ?
    <div className="p-2 max-w-md mx-auto">
      <div className="py-2 pl-4 pr-2 bg-green-500 text-black rounded-lg shadow-md">
        <pre className="whitespace-normal break-words font-thin">{data}</pre>
      </div>
    </div>
    :
    <></>
  );
}
