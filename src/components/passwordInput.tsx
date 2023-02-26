import React from "react"
import Head from "next/head"
import { Input, InputRightElement, InputGroup, Button } from "@chakra-ui/react"

export default function PasswordInput() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='********'
          background={"barber.400"}
          variant="filled"
          size={"lg"}
          mb={6}
        />
        <InputRightElement width='6.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick} mt={2} color={"barber.400"} background="barber.100">
            {show ? 'Hide' : 'Mostrar'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }