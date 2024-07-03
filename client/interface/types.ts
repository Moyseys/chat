import { ReactNode } from "react"

export interface User{
    id: String,
    userName: string,
    icon: string
}

export interface Message{
    message: ReactNode,
    userName: string,
    type: string,
    text: string,
    icon: string,
    id: string,
    date: number
}