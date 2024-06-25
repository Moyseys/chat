export interface User{
    id: String,
    userName: string
}

export interface Message{
    userName: string,
    type: string,
    text: string,
    id: string,
    date: number
}