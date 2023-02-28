import { useState, useContext } from "react"
import Head from "next/head"
import Image from 'next/image'
import Link from 'next/link'

import logoImg from  '../../../public/images/logo.svg'
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react"

import { AuthContext } from "../../context/AuthContext"

import { canSSRGuest } from "@/utils/canSSRGuest"

export default function Login(){
  const { signIn } = useContext(AuthContext)

  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')

  async function handleLogin(){

    if(email === '' || password === ''){
      return;
    }

    await signIn({
      email,
      password,
    })
  }
  
  return(
    <>
      <Head>
        <title>BarberPRO - Faça login para acessar!</title>
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
                placeholder={"Seu melhor email"}
                type="email"
                mb={3}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                background={"barber.400"}
                variant="filled"
                size={"lg"}
                placeholder={"**********"}
                type="password"
                mb={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                background={"button.cta"}
                mb={6}
                color="gray.900"
                size={"lg"}
                _hover={{bg: "#fcbb5a"}}
                _active={{bg: "#ff9900"}}
                onClick={handleLogin}
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

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return{
    props: {}
  }
})