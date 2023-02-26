import React from "react"
import Head from "next/head"
import Image from 'next/image'
import Link from 'next/link'

import PasswordInput from "../../components/passwordInput"
import logoImg from  '../../../public/images/logo.svg'
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react"

export default function Register(){

  return(
    <>
      <Head>
        <title>BarberPRO - Crie sua conta!</title>
      </Head>
      <Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center" color={"white"}>
        
        <Flex width={640} direction="column" p={14} rounded={8}>
            <Center p={4} >
                <Image 
                src={logoImg} 
                quality={100}
                width={"240"} 
                objectFit="fill" 
                alt={"Logo Barber"} />
            </Center>

            <Input
                background={"barber.400"}
                variant="filled"
                size={"lg"}
                placeholder={"Nome da barbearia"}
                type="text"
                mb={3}
            />

            <Input
                background={"barber.400"}
                variant="filled"
                size={"lg"}
                placeholder={"Seu melhor email"}
                type="email"
                mb={3}
            />

            <PasswordInput/>

            <Button
                background={"button.cta"}
                mb={6}
                color="gray.900"
                size={"lg"}
                _hover={{bg: "#fcbb5a"}}
                _active={{bg: "#ff9900"}}
            >
                Cadastrar
            </Button>

            <Center>
                <Link href="/login">
                    <Text color="white">Já possui uma conta? <strong>Faça login</strong></Text>
                </Link>
            </Center>
        </Flex>

      </Flex>
    </>
  )
}