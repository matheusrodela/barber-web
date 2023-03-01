import Head from "next/head";
import { Sidebar } from "@/components/sidebar"; 

import { 
    Flex,
    Text, 
    Heading,
    Button,
    useMediaQuery,
    Input
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
                        rounded={4}
                        direction="column"
                    >
                        <Heading mb={4} fontSize={ isMobile ? "22px" : "3xl" } color="white" >Cadastrar modelo</Heading>

                        <Input
                            placeholder="Nome do corte"
                            size={"lg"}
                            type="text"
                            w="85%"
                            borderColor={"gray.600"}
                            bg={"gray.900"}
                            mb="3"
                        />

                        <Input
                            placeholder="Valor do corte - Exemplo: 59.90"
                            size={"lg"}
                            type="text"
                            w="85%"
                            borderColor={"gray.600"}
                            bg={"gray.900"}
                            mb={4}
                        />

                        <Button
                            w="85%"
                            size={"lg"}
                            color="gray.900"
                            mb="6"
                            bg={"button.cta"}
                            _hover={{ bg: "#ff9900" }}
                        >
                            Cadastrar
                        </Button>
                    </Flex>

                </Flex>
            </Sidebar>
        </>
    )
}