import React from "react"
import Head from "next/head"
import Image from 'next/image'
import Link from 'next/link'

import PasswordInput from "./passwordInput"
import logoImg from  '../../../public/images/logo.svg'
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react"

export default function Login(){

  return(
    <>
      <Head>
        <title>BarberPRO - Faça login para acessar!</title>
      </Head>
      <Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center" color={"white"}>
        
        <Flex width={640} direction="column" p={14} rounded={8}>
            <Center p={4} >
                <Image src={logoImg} quality={100} objectFit="fill" alt={"Logo Barber"} />
            </Center>

            <Input
                background={"barber.400"}
                variant="filled"
                size={"lg"}
                placeholder={"Digite aqui seu melhor email"}
                type="email"
                mb={3}
            />

            <PasswordInput/>

            <Button
                background={"button.cta"}
                mb={6}
                color="gray.900"
                size={"lg"}
                _hover={{bg: "#ff9900"}}
            >
                Acessar
            </Button>

            <Center>
                <Link href="/register">
                    <Text color="white">Ainda não tem uma conta? <strong>Cadastre-se</strong></Text>
                </Link>
            </Center>
        </Flex>

      </Flex>
    </>
  )
}