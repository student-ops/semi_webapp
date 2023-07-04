import { useState } from "react"
import { Chatlog } from "@/lib/types"

export default function Chat(){
    let initial_chatlog :Chatlog[]= [
        {
            message:"type question and send it !!",
            response:""
        },
    ]
    const [] = useState(initial_chatlog)
    const [loadState, setloadState] = useState(false)
}