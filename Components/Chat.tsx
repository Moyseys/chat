import React, { useState, useEffect, useRef } from 'react';
import { User, Message } from '../interface/types';
import { Button, Input } from "@nextui-org/react";
import { SendHorizontal } from 'lucide-react';
import styles from "../styles/Chat.module.css";

interface ChatProps {
  user: User;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const urlServerWs = 'wss://chat-k2jz.onrender.com';

  useEffect(() => {
    const websocket = new WebSocket(urlServerWs);
    setWs(websocket);

    websocket.onopen = () => {
      console.log('Conexão aberta com o servidor');
    };

    websocket.onmessage = (event) => {
      processMessage(event);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const processMessage = (event: MessageEvent) => {
    const message: Message = JSON.parse(event.data);
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.userName} - ${message.text}`;

    if (chatMessagesRef.current) {
      if (message.userName === user.userName) {
        messageElement.classList.add(styles.messageSelf);
      } else {
        messageElement.classList.add(styles.message);
      }
      chatMessagesRef.current.appendChild(messageElement);
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  const sendMessage = (type: string, text: string) => {
    if (ws?.readyState !== WebSocket.OPEN) return console.log('A conexão deve ser iniciada!');

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
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages} id="chatMessages" ref={chatMessagesRef}></div>
      
      <div className={styles.inputContainer}>
        <Input
          id="messageInput"
          ref={messageInputRef}
          fullWidth
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const message = (e.target as HTMLInputElement).value.trim();
              if (message) sendMessage('message', message);
            }
          }}
        />
        <Button
          variant='flat'
          color="success"
          id="sendButton"
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
