import React from 'react';
import Image from 'next/image';

const Test: React.FC = () => {
  return (
    <>
      <p>Component</p>
      <div>
      <a href="">
      <Image className=''
      src="/profile.png"
      width={50}
      height={50}
      alt="a"
      />
      </a>
      </div>
    </>
  );
};

export default Test;
