import Head from "next/head"
import { Sidebar } from "@/components/sidebar"
import {
    Flex,
    Heading,
    Text,
    Button,
    Stack,
    Switch,
    useMediaQuery,
} from '@chakra-ui/react'

import Link from "next/link";

import { IoMdPricetag } from 'react-icons/io'

export default function Haircuts(){

    const [isMobile] = useMediaQuery("(max-width: 500px)")

    return(
        <>
            <Head>
                <title>Modelos de corte - Minha barbearia</title>
            </Head>

            <Sidebar>
                <Flex direction={"column"} alignItems={"flex-start"} justifyContent={"flex-start"} >
                    
                    <Flex
                        direction={isMobile ? 'column' : 'row'}
                        w="100%"
                        alignItems={isMobile ? 'center' : 'center'}
                        justifyContent={"center"}
                        mb={isMobile ? '45px' : '55px'}
                    >
                        <Heading
                            fontSize={isMobile ? "28px" : "3xl"}
                            mt={4}
                            mb={4}
                            mr={isMobile ? '0' : '4'}
                            color={"orange.900"}
                        >
                            Modelos de corte
                        </Heading>

                        <Link href={"/haircuts/new"}>
                            <Button 
                                bg="gray.700" 
                                size={"md"} 
                                mt={isMobile ? '3' : '0'} 
                                _hover={{ bg: "gray.800" }}
                                >
                                    Cadastrar novo
                            </Button>
                        </Link>

                        <Stack 
                            ml={isMobile ? '0' : 'auto'} 
                            mt={isMobile ? '7' : '0'} 
                            align="center" 
                            direction={"row"}
                            >
                                <Text fontWeight={isMobile ? 'inherit' : 'bold'}>ATIVOS</Text>
                                <Switch
                                    colorScheme={"green"}
                                    size="lg"
                                />
                        </Stack>

                    </Flex>

                    <Link href={"/haircuts/123"} legacyBehavior >
                        <Flex
                            cursor={"pointer"}
                            w="100%"
                            p="4"
                            bg={"barber.400"}
                            direction="row"
                            rounded={4}
                            mb={2}
                            justifyContent="space-between"
                            _hover={{ border:"1px", borderColor: "gray.400", bg: "gray.800" }}
                        >

                            <Flex direction={"row"} alignItems="center" justifyContent={"center"}>
                                <IoMdPricetag size={28} color="#fba931"/>
                                <Text fontWeight={isMobile ? 'inherit' : 'bold'} ml="4" noOfLines={2} color="white">Nome do corte</Text>
                            </Flex>

                            <Text fontWeight={isMobile ? 'inherit' : 'bold'} color="white">Preço: R$ 59.90</Text>

                        </Flex>
                    </Link>


                </Flex>
            </Sidebar>
        </>
    )
}