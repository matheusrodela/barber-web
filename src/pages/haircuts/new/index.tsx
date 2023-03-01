import Head from "next/head";
import { Sidebar } from "@/components/sidebar"; 

import { 
    Flex,
    Text, 
    Heading,
    Button,
    useMediaQuery
} from "@chakra-ui/react";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

export default function NewHaircut(){

    const [isMobile] = useMediaQuery("(max-width: 500px)");

    return (
        <>
            <Head>
                <title>BarberPRO - Novo modelo de corte</title>
            </Head>
            <Sidebar>
                <Flex direction={"column"} alignItems={"center"} justifyContent={"flex-start"}>
                    
                    <Flex
                        direction={"row"}
                        w="100%"
                        align={isMobile ? "flex-start" : "center"}
                        mb={isMobile ? 4 : 0}
                    >

                        <Link href={"/haircuts"}>
                            <Button
                                bg={"barber.400"}
                                _hover = {{ bg: "gray.700" }}
                                p="4"
                                display={"flex"}
                                alignItems="center" 
                                justifyItems="center"
                                mr="4"
                             >
                                <FiChevronLeft size={21} color="#FFF"/>
                                Voltar
                            </Button>
                        </Link>
                        <Heading
                            color="orange.900"
                            mb={ isMobile ? "0" : "4" }
                            mt={ isMobile ? "0" : "4" }
                            mr={ isMobile ? "0" : "4" }
                            fontSize={ isMobile ? "27px" : "3xl" }
                        >
                            Modelos de corte
                        </Heading>
                        <></>
                    </Flex>

                    <Flex
                        maxW="700px"
                        bg={"barber.400"}
                        w="100%"
                        align="center"
                        justify="center"
                        pt={8}
                        pb={8}
                    >
                        <Heading>Cadastrar modelo</Heading>
                    </Flex>

                </Flex>
            </Sidebar>
        </>
    )
}