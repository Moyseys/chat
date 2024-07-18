import React, { useState, useEffect, useRef } from 'react'
import {SendHorizontal, MessageSquareOff } from 'lucide-react'
import {Input, Card, CardHeader, CardBody, CardFooter, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react"
import Loading from './Loading'
import styles from "../styles/chat.module.css"
import { User, Message } from '../interface/types'
import listIcons from '@/utils/iconsArray'
import * as lu from "lucide-react"

interface ChatProps {
  user: {
    icon: any
    userName: string
  }
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const chatMessagesRef = useRef<HTMLDivElement | null>(null)
  const messageInputRef = useRef<HTMLInputElement | null>(null)
  const urlServerWs = 'wss://chat-k2jz.onrender.com'
  const [isLoading, setLoading] = useState(true)
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const [backdrop, setBackdrop] = useState<'blur'>('blur')

  useEffect(() => {
    const websocket = new WebSocket(urlServerWs)
    setWs(websocket)

    websocket.onopen = () => {
      console.log('Conexão aberta com o servidor')
      setLoading(false)
    }

    websocket.onmessage = (event) => {
      processMessage(event)
    }

    websocket.onerror = (error) => {
      console.error('Erro no WebSocket:', error)
      setLoading(true)
    }

    websocket.onclose = () => {
      console.log('Conexão com o servidor encerrada')
      setLoading(true)
    }

    return () => {
      websocket.close()
      setLoading(true)
    }
  }, [])

  useEffect(() => {
    if(chatMessagesRef.current){
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [messages])

  const processMessage = (event: MessageEvent) => {
    const message: Message = JSON.parse(event.data)
    setMessages((prevMessages) => [...prevMessages, message])
  }

  const sendMessage = (type: string, text: string) => {
    if (ws?.readyState === WebSocket.OPEN) {
      const msg = {
        userName: user.userName,
        type,
        icon: user.icon,
        text,
        id: crypto.randomUUID(),
        date: Date.now(),
      }
      ws.send(JSON.stringify(msg))
      if (messageInputRef.current) {
        messageInputRef.current.value = ''
      }
    } else {
      console.warn('A conexão WebSocket não está aberta.')
    }
  }

  if (isLoading) {
    return <Loading />
  }

  const handleClearLocalStorage = () => {
    localStorage.removeItem('chatUser')
    window.location.reload()
    setLoading(true)
  }

  const formatTime = (date:any) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <div className={styles.chatContainer}>

      <Button onClick={onOpen}
        color='danger'
        variant='flat'
        isIconOnly
        className={styles.buttonPosition}
      >

    <Modal backdrop={backdrop} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Close Chat</ModalHeader>
              <ModalBody>
                <p> 
                  this action ll'log you out. 
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="success" variant="flat" onPress={onClose}>
                  Stay here
                </Button>
                <Button color="danger" variant='light' onClick={handleClearLocalStorage} onPress={onClose}>
                  exit 
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        <MessageSquareOff />
      </Button>

      <div className={styles.chatMessages} ref={chatMessagesRef}>
        {messages.map((message) => {
          const mySelf = message.userName === user.userName
          return (
            <Card key={message.id} className={`${styles.chatMessage} ${mySelf ? styles.myMessage : styles.otherMessage}`}>
              <CardHeader className="flex gap-3">
                {listIcons.map((icon) => {
                  if (message.icon === icon.id) {
                    return icon.icon
                  }
                  return null
                })}
                <div className="flex flex-col">
                  {message.userName}
                </div>
              </CardHeader>
              <CardBody>
                {message.text}
              </CardBody>
              <CardFooter className="flex justify-end">
                <lu.Clock10 size={15} />
                <div className={styles.time}>
                  {formatTime(new Date(message.date))}
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      <div className={styles.inputContainer}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
          fullWidth
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const message = inputValue.trim()
              if (message) {
                sendMessage('message', message)
              }
              setInputValue('')
            }
          }}
/>
        <Button
          isIconOnly
          color="success"
          onClick={() => {
            const message = inputValue.trim()
            if (message) {
              sendMessage('message', message)
            }
            setInputValue('')
          }}
        >
          <SendHorizontal size={15} />
        </Button>
      </div>
    </div>
  )
}

export default Chat
