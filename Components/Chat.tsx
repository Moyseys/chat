import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { SendHorizontal, MessageSquareOff  } from 'lucide-react';
import Loading from './Loading';
import styles from "../styles/chat.module.css";
import { User, Message } from '../interface/types';

interface ChatProps {
  user: {
    userName: string;
  };
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const urlServerWs = 'wss://chat-k2jz.onrender.com';
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const websocket = new WebSocket(urlServerWs);
    setWs(websocket);

    websocket.onopen = () => {
      console.log('Conexão aberta com o servidor');
      setLoading(false);
    };

    websocket.onmessage = (event) => {
      processMessage(event);
    };

    websocket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
      setLoading(true);
    };

    websocket.onclose = () => {
      console.log('Conexão com o servidor encerrada');
      setLoading(true);
    };

    return () => {
      websocket.close();
      setLoading(true);
    };
  }, []);

  const processMessage = (event: MessageEvent) => {
    const message: Message = JSON.parse(event.data);

    const messageContainer = document.createElement('div');
    messageContainer.classList.add(styles.messageContainer);

    const userNameElement = document.createElement('div');
    userNameElement.textContent = message.userName;
    userNameElement.classList.add(styles.userName);

    const textElement = document.createElement('div');
    textElement.textContent = message.text;
    textElement.classList.add(styles.messageText);

    messageContainer.appendChild(userNameElement);
    messageContainer.appendChild(textElement);

    if (chatMessagesRef.current) {
      if (message.userName === user.userName) {
        messageContainer.classList.add(styles.messageSelf);
      } else {
        messageContainer.classList.add(styles.message);
      }
      chatMessagesRef.current.appendChild(messageContainer);
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  const sendMessage = (type: string, text: string) => {
    if (ws?.readyState === WebSocket.OPEN) {
      const msg: Message = {
        userName: user.userName,
        type,
        text,
        id: crypto.randomUUID(),
        date: Date.now(),
      };
      ws.send(JSON.stringify(msg));
      if (messageInputRef.current) {
        messageInputRef.current.value = '';
      }
    } else {
      console.warn('A conexão WebSocket não está aberta.');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleClearLocalStorage = () =>{
    localStorage.removeItem('chatUser');
    window.location.reload()
  }
  return (
      <div className={styles.chatContainer}>
        <Button  onClick={handleClearLocalStorage}
        color='danger'
        variant='flat'
        isIconOnly
        className={styles.buttonPosition}
        >
          <MessageSquareOff />
        </Button>
      <div className={styles.chatMessages} ref={chatMessagesRef}></div>
      <div className={styles.inputContainer}>
        <Input
          ref={messageInputRef}
          fullWidth
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const message = e.currentTarget.value.trim();
              if (message) sendMessage('message', message);
            }
          }}
        />
        <Button
          color="success"
          onClick={() => {
            const message = messageInputRef.current?.value.trim();
            if (message) sendMessage('message', message);
          }}
        >
          <SendHorizontal size={15} />
      </Button>
      </div>
    </div>
  );
};

export default Chat;
