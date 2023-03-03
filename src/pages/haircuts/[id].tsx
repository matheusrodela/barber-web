import { useState, ChangeEvent } from "react";
import Head from "next/head"
import { 
    Flex,
    Text,
    Heading,
    Button,
    useMediaQuery,
    Input,
    Stack,
    Switch
 } from "@chakra-ui/react";

import { Sidebar } from "@/components/sidebar"
import { FiChevronLeft } from "react-icons/fi"
import Link from "next/link";
import Router from "next/router";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

interface HaircutProps{
    id: string;
    name: string;
    price: string | number;
    status: boolean;
    user_id: string;

}

interface SubscriptionProps{
    id: string;
    status: string;
}

interface EditHaircutProps{
    haircut: HaircutProps;
    subscription: SubscriptionProps | null;
}

 export default function EditHaircut({ subscription, haircut }: EditHaircutProps){
    const [isMobile] = useMediaQuery("(max-width: 500px)")

    const [name, setName] = useState(haircut?.name)
    const [price, setPrice] = useState(haircut?.price)
    const [status, setStatus] = useState(haircut?.status)

    const [disableHaircut, setDisableHaircut] = useState(haircut?.status ? "disabled" : "enabled")

    function handleChangeStatus(e: ChangeEvent<HTMLInputElement>){
        if(e.target.value === 'disabled'){
            setDisableHaircut("enabled")
            setStatus(false)
        }  else{
            setDisableHaircut("disabled")
            setStatus(true)
        }
    }

    async function handleUpdate(){
        if(name === '' ||  price === ''){
            return;
        }

        try{
            const apiClient = setupAPIClient();
            await apiClient.put('/haircut', {
                name: name,
                price: Number(price),
                status: status,
                haircut_id: haircut?.id
            })

            alert("Corte atualizado com sucesso!")

            Router.push("/haircuts")

        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <Head>
                <title>Editando Modelo de corte - BarberPRO</title>
            </Head>
            <Sidebar>

                <Flex direction={"column"} alignItems={"center"} justifyContent={"center"}>

                    <Flex
                        direction={isMobile ? "column" : "row"}
                        w="100%"
                        alignItems={isMobile ? "flex-start" : "row"}
                        justifyContent="flex-start"
                        mb={isMobile ? "4" : "0"}
                    >

                        <Link href={'/haircuts'}>
                            <Button mr="3" bg={"barber.400"} p="4" display={"flex"} alignItems="center" justifyContent={"center"} _hover={{ bg: "gray.700" }}>
                                <FiChevronLeft size={21} color="#FFF"/>
                                Voltar
                            </Button>
                        </Link>

                        <Heading fontSize={isMobile ? "22px" : "3xl"} color={"white"} pt={isMobile ? "3" : "0"}>
                            Editar corte
                        </Heading>
                    </Flex>

                    <Flex mt={4} maxW="700px" pt={8} pb="8" w="100%" bg="barber.400" direction={"column"} align
                    ="center" justify={"center"}>
                        <Heading fontSize={isMobile ? "22px" : "3xl"} mb="4" >Editar corte</Heading>

                        <Flex w="85%" direction={"column"}>
                            <Input 
                                placeholder={"Nome do corte"}
                                bg="gray.900"
                                borderColor={"gray.600"}
                                mb="3"
                                size={"lg"}
                                type="text"
                                w="100%"
                                value={name}
                                onChange={ (e) => setName(e.target.value) }
                            />

                            <Input 
                                placeholder={"Valor do corte. Exemplo: 45.90"}
                                bg="gray.900"
                                borderColor={"gray.600"}
                                mb="3"
                                size={"lg"}
                                type="number"
                                w="100%"
                                value={Number(price).toFixed(2)}
                                onChange={ (e) => setPrice(e.target.value) }
                            />

                            <Stack direction={"row"} mb="6" mt={2} align={"center"} justify="flex-end">
                                <Text fontWeight={"bold"}>Desativar corte</Text>
                                <Switch
                                    size={"lg"}
                                    colorScheme="red"
                                    value={disableHaircut}
                                    isChecked={disableHaircut === "disabled" ? false : true}
                                    onChange={ (e: ChangeEvent<HTMLInputElement>) => handleChangeStatus(e) }
                                />
                            </Stack>

                            <Button
                                mb="6"
                                w="100%"
                                bg={"button.cta"}
                                color="gray.900"
                                _hover={{ bg: "#ff9900" }}
                                isDisabled={subscription?.status !== 'active'}
                                onClick={handleUpdate}
                            >
                                Salvar
                            </Button>

                            {subscription?.status !== 'active' && (
                                <Flex w={"100%"} justify="center" align={"center"} cursor="pointer">
                                    <Link href={"/planos"}>
                                        <Text color={"#0eec4d"} mr="1">Seja premium</Text>
                                    </Link>
                                    <Text>e tenha todos os acessos liberados.</Text>
                                </Flex>
                            )}

                        </Flex>

                    </Flex>

                </Flex>
            </Sidebar>
        </>
    )

 }


 export const getServerSideProps = canSSRAuth(async (ctx) => {
    const { id } = ctx.params;

        try{
            const apiCLient = setupAPIClient(ctx);

            const check = await apiCLient.get('/haircut/check')

            const response = await apiCLient.get('/haircut/detail', {
                params:{
                    haircut_id: id
                }
            })

            return {
                props:{
                    haircut: response.data,
                    subscription: check.data?.subscriptions
                },
            }

            
        }catch(err){
            console.log(err);

            return{
                redirect:{
                    destination: '/haircuts',
                    permanent: false,
                }
            }
        }

 })