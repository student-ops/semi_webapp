import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      <footer className='absolute bottom-0 bg-slate-500 w-full'>
        <div className="w-full">
          <div>
            
            <div className="flex w-full">
              <div className="pr-10 pl-10 text-slate-300">HOME</div>
              <div className="pr-10 text-slate-300">CHAT</div>
              <div className="pr-10 text-slate-300">CONTACT</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;