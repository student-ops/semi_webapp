import { Readable } from "stream";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';


let message = "情報システム学部は「情報システム学科」「情報セキュリティ学科」の2学科で構成されています。loT・AI・情報デザイン・情報セキュリティ・生体認証の研究および、地域密着の分野である観光や環境・防災・農業にまつわる情報システムの研究を通じ、情報システムに関する知識と実践力を身につけ、高度情報社会における課題を解決できる人材を育成しています。";

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Stream initialization
  const uuid = uuidv4();
  const s = new Readable();
  s._read = () => {};

  // Set the headers
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");

  // Start the stream
  s.pipe(res);
  s.push("id:" + uuid + "\n\n")

  // Stream the message with a pause of 0.5 sec between each 3 characters
  let i = 0;
  const interval = setInterval(() => {
    if (i < message.length) {
      s.push(message.slice(i, i + 3));
      i += 3;
    } else {
      clearInterval(interval);
      s.push(null);
    }
  }, 30);
};
