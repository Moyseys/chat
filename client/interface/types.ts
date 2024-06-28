export interface User{
    id: String,
    userName: string
}

export interface Message{
    message: ReactNode
    userName: string,
    type: string,
    text: string,
    id: string,
    date: number
}