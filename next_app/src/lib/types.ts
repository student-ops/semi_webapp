export type Chatlog = {
    message:string,
    id?:number,
    response?:string
    loading?:boolean,
}

export type RemarkType = {
    message:string,
    user:number, //0 =ai ,1 = user
}