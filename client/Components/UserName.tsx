import React, { useRef, useEffect, useState } from 'react'
import { User } from '../interface/types'
import { Card, CardBody, Button, Link } from "@nextui-org/react"
import ChooseIcons from './ChooseIcons'
import { Input } from "@nextui-org/input"
import sty from "../styles/user.module.css"
import { SendHorizontal } from 'lucide-react'
import Alert from "../services/Alert"

interface FormLoginProps {
    setUser: React.Dispatch<React.SetStateAction<User>>
}

const UserName: React.FC<FormLoginProps> = ({ setUser }) => {
    const inputFieldRef = useRef<HTMLInputElement | null>(null)
    const [selectedIcon, setSelectedIcon] = useState("")

    useEffect(() => {
        const storedUser = localStorage.getItem('chatUser')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [setUser])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedIcon) {
            console.log('nenhum icone selecionado')
            Alert.send("Please select an animal", false)
            return
        }

        const userName = inputFieldRef.current?.value.trim() || ''
        if (userName) {
            const newUser: User = { id: crypto.randomUUID(), userName, icon: selectedIcon }
            setUser(newUser)
            localStorage.setItem('chatUser', JSON.stringify(newUser))
        }
    }

    return (
        <>
            <div className={sty.container}>
                <h1 className={sty.title}> chat </h1>
                <Card className={sty.card}>
                    <CardBody>
                        <form className='flex items-center' onSubmit={onSubmit}>
                            <Input  isRequired id="inputField" ref={inputFieldRef} type="text" label="Username" required />
                            <Button isIconOnly variant="light" color="success" type="submit"><SendHorizontal /></Button>
                        </form>
                    </CardBody>
                </Card>
                <ChooseIcons selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />


            <div className={sty.containerFooter}>
                    <p> Developed by </p> <Link className='ml-1' href="https://github.com/geovaniorsoli" isExternal underline="always"> Geovani Orsoli </Link>
                    <p className='ml-1'> & </p>
                    <Link isExternal className='ml-1' href="https://github.com/moyseys" underline="always"> Moyseys Veroni </Link>
                </div>
            </div>
        </>
    )
}

export default UserName
