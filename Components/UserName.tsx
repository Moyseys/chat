import React, { useRef } from 'react';
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

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userName = inputFieldRef.current?.value.trim() || '';
        if (userName) {
            setUser({ id: crypto.randomUUID(), userName });
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
