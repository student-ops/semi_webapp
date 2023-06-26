import Image from 'next/image'
import Head from "../../components/chatwindow"
import StreamingJsonComponent from "../../components/streaming"

export default function Home() {
  return (
    <>
      <Head />
      <h1>hello from maemura semi</h1>
      <b>building web site</b>
      <StreamingJsonComponent />
    </>
  )
}
