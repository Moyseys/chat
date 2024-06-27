import React, { useRef, useEffect } from 'react';
import { User } from '../interface/types';
import { Card, CardBody, Button } from "@nextui-org/react";
import ChooseIcons from './ChooseIcons';
import { Input } from "@nextui-org/input";
import sty from "../styles/user.module.css";
import { SendHorizontal } from 'lucide-react';

interface FormLoginProps {
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserName: React.FC<FormLoginProps> = ({ setUser }) => {
    const inputFieldRef = useRef<HTMLInputElement | null>(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem('chatUser')
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
    }, [setUser])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userName = inputFieldRef.current?.value.trim() || '';
        if (userName) {
            const newUser: User = {id: crypto.randomUUID(), userName}
            setUser(newUser);
            localStorage.setItem('chatUser', JSON.stringify(newUser))
        }
    };

    return (
        <> 
        <div className={sty.container}>
            <h1 className={sty.title}> chat </h1>
            <Card className={sty.card}>
                <CardBody>
                    <form className='flex items-center' onSubmit={onSubmit}>
                        <Input id="inputField" ref={inputFieldRef} type="text" label="Username" required />
                        <Button variant="light" color="success" type="submit"><SendHorizontal /></Button>
                    </form>
                </CardBody>
            </Card>
        <ChooseIcons />
        </div>

        </>
    );
};

export default UserName;
