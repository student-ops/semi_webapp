export type Chatlog = {
    message:string,
    id:string,
    response?:string
    loading?:boolean,
}

export type RemarkType = {
    message:string,
    user:number, //0 =ai ,1 = user
}

export type Verifycation = {
    nodes?:string[],
    verifing?:boolean,
    correctness?:boolean[],
    id?:string
}
