import Image from 'next/image'
import { Inter } from 'next/font/google'
import { defaultMaxListeners } from 'events'
import Comment from '../components/comments'
import InputField from '../components/input_field'
import Suggestion from '@/components/chat_suggestion'

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  let contents = "hello"
  return (
    <>
      <h1>index {contents}</h1>
      <Suggestion />
    </>
  )
}