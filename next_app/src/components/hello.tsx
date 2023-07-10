import React from 'react';
import Image from 'next/image';

const Test: React.FC = () => {
  return (
    <>
      <p>Component</p>
      <div>
      <a href="">
      <Image
      src="/profile.png"
      width={500}
      height={500}
      alt="a"
      />
      </a>
      </div>
    </>
  );
};

export default Test;
