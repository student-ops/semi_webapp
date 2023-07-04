import React from 'react';
import { RemarkType } from '@/lib/types';

export default function Remark({remark}: {remark: RemarkType}) {
  const chatProps = remark?.user === 0 ?"bg-gray-200": "bg-green-500"  ;

  return (
    <div className="p-2 max-w-md mx-auto">
      <div className={`py-2 pl-4 pr-2 text-black rounded-lg shadow-md ${chatProps}`}>
        <pre className="whitespace-normal break-words font-thin">{remark?.message ?? ''}</pre>
      </div>
    </div>
  );
}
