import Image from 'next/image'
import { Inter } from 'next/font/google'
import { defaultMaxListeners } from 'events'
import Comment from '../components/comments'
import InputField from '../components/input_field'

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  let contents = "hello"
  return (
    <>
      <h1>main page</h1>
      <Comment  contents = {contents}/>
      <br />
      <Comment contents='second component'/>
      <InputField/>
    </>
  )
}