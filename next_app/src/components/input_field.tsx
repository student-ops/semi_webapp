import { NextPage } from "next"
import { FormEvent, useState } from "react"
import Router, { useRouter } from "next/router"

export default function InputField() {
    const [message, setMessage] = useState("")
    
        return (
            <form
            onSubmit={(e)=>{
                e.preventDefault();
                console.log(message)
            }}>
                <div className="editor rounded-lg  flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                    <input
                        className="title rounded bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                        spellCheck="false"
                        placeholder="Send a message"
                        type="text"
                        value={message}
                        onChange={(e) => {
                            // console.log(e.currentTarget.value)
                            setMessage(e.currentTarget.value)
                        }}
                    />
                    <div className="buttons flex mt-3">
                        <button type="submit" className="bg-blue-400">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
    )
}