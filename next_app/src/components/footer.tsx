import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <>
      <footer className='absolute bottom-0 bg-slate-500 w-full h-1/10'>
        <div className="w-full">
          <div>
            <div className="flex text-center w-full">
              <div className="pr-10 pl-10 text-slate-300 flex-1">
                <a href="footer_home.png">
                <Image className=''
                src="/footer_home.png"
                width={50}
                height={50}
                alt="home"
                />
                </a>
              </div>
              <div className="pr-10 text-slate-300 flex-1">
                <a href="footer_chat.png">
                <Image className=''
                src="/footer_chat.png"
                width={50}
                height={50}
                alt="chat"
                />
                </a>
              </div>
              <div className="pr-10 text-slate-300 flex-1">
              <a href="footer_context.png">
                <Image className=''
                src="/footer_context.png"
                width={50}
                height={50}
                alt="context"
                />
                </a>
              </div>
            </div>
            <div className="flex text-center w-full">
              <div className="pr-10 pl-10 text-slate-300 flex-1">HOME</div>
              <div className="pr-10 text-slate-300 flex-1">CHAT</div>
              <div className="pr-10 text-slate-300 flex-1">CONTACT</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;