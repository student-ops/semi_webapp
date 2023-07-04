import { useState } from "react"

type Chatlog = {
    message:string,
    user:number, //0 =ai ,1 = user
    id?:number,
}

export default function Chat(){
    let initial_chatlog :Chatlog[]= [
        {
            message:"type question and send it !!",
            user : 0,
        },
    ]
    const [] = useState(initial_chatlog)
    const [loadState, setloadState] = useState(false)
}