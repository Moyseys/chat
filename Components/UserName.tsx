import React, { useRef } from 'react';
import { User } from '../interface/types';
import { Card, CardHeader, CardBody, Divider, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import sty from "../styles/user.module.css";

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
        <div className={sty.container}>
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-1">
                    <div className="flex center">
                        <p className="text-md">Enter your Username</p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <form onSubmit={onSubmit}>
                        <Input id="inputField" ref={inputFieldRef} type="text" label="Username" required />
                        <Button color='primary' type="submit">Progress</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default UserName;
