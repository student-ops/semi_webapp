export type Chatlog = {
    message:string,
    id:string,
    response?:string
    loading?:boolean,
    verification?:Verification
}

export type RemarkType = {
    message:string,
    user:number, //0 =ai ,1 = user
}

export type Verification = {
    nodes?:string[],
    verifing?:boolean,
    correctness?:string[],
}
