import React from 'react';

const Comment: React.FC<{ contents: string }> = ({ contents }) => {
  let a = 1 + 2;
  return (
    <>
      <p className='bg-green-500'>{contents} + a</p>
    </>
  );
};

export default Comment;
