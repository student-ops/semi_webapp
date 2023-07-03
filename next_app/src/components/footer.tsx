import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      <ul>
      <li><a href="./"><i className="fa-solid fa-house footer-icon"></i><br>
          <p>ホーム</p>
        </a></li>
      <li><a href="./"><i className="fa-solid fa-comment-dots footer-icon"></i><br>
          <p>チャット</p>
        </a></li>
      <li><a href="./"><i className="fa-solid fa-play footer-icon"></i><br>
          <p>資料</p>
        </a></li>
    </ul>
    </>
  );
};

export default Footer;