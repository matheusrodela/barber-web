import { useState } from "react";
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
import Router from "next/router";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";


interface NewHaircutProps{
    subscription: boolean;
    count: number;
}

export default function NewHaircut({subscription, count}: NewHaircutProps){

    const [isMobile] = useMediaQuery("(max-width: 500px)");

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    async function handleRegister() {
        if(name === '' || price === ''){
            return;
        }

        try{

            const apiClient = setupAPIClient();
            await apiClient.post('/haircut', {
                name: name,
                price: Number(price)
            })

            Router.push("/haircuts")

        }catch(err){
            console.log(err);
            alert("Erro ao cadastrar")
        }
    }

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
                            bg={"barber.900"}
                            mb="3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder="Valor do corte - Exemplo: 59.90"
                            size={"lg"}
                            type="text"
                            w="85%"
                            borderColor={"gray.600"}
                            bg={"barber.900"}
                            mb={6}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <Button
                            onClick={handleRegister}
                            w="85%"
                            size={"lg"}
                            color="gray.900"
                            mb="6"
                            bg={"button.cta"}
                            _hover={{ bg: "#ff9900" }}
                            isDisabled={!subscription && count >= 3? true : false}
                        >
                            Cadastrar
                        </Button>

                        {!subscription && count >= 3 && (
                            <Flex direction={"row"} align="center" justify="center">
                                <Text>
                                    Você atingiu seu limite de cadastros.
                                </Text>
                                <Link href={"/planos"}>
                                    <Text fontWeight={"bold"} color="#0eec4d" cursor="pointer" ml={2}>Seja Premium</Text>
                                </Link>
                                <Text ml={1}>e tenha acesso ilimitado.</Text>
                            </Flex>
                        )}

                    </Flex>

                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try{

        const apiClient = setupAPIClient(ctx);

        const response = await apiClient.get("/haircut/check")
        const count = await apiClient.get("/haircut/count")

        return{
            props:{
                subscription: response.data?.subscriptions?.status === 'active' ? true : false,
                count: count.data
            }
        }

    }catch(err){
        console.log(err);

        return{
            redirect:{
                destination: '/dashboard',
                permanent: false
            }
        }
    }

})