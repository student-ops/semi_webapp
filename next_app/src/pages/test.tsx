import Image from 'next/image'
import { Inter } from 'next/font/google'
import Test from "../components/hello"
import Footer from "../components/footer"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <h1>hello</h1>
    <Test/>
    <Footer/>
    </>
  )
  
}