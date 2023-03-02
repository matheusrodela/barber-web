import { useState, ChangeEvent } from 'react'

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
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";


interface HaircutsItem{
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface HaircutsProps{
    haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps){

    const [isMobile] = useMediaQuery("(max-width: 500px)")

    const [haircutList, setHaircutList] = useState<HaircutsItem[]>(haircuts || [])

    const [disableHaircut, setDisableHaircut] = useState("enabled")

    async function handleDisabled(e: ChangeEvent<HTMLInputElement>){
        const apiClient = setupAPIClient();

        if(e.target.value === 'disabled'){
            setDisableHaircut("enabled")
            
            const response = await apiClient.get("/haircuts", {
                params:{
                    status: true
                }
            })

            setHaircutList(response.data);

        }else{
            setDisableHaircut("disabled")
            
            const response = await apiClient.get("/haircuts", {
                params:{
                    status: false
                }
            })

            setHaircutList(response.data);

        }
    }

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
                                    value={disableHaircut}
                                    onChange={ (e: ChangeEvent<HTMLInputElement>) => handleDisabled(e)}
                                    isChecked={disableHaircut === 'disabled' ? false : true}
                                />
                        </Stack>

                    </Flex>

                    {haircutList.map(haircut => (
                            <Link key={haircut.id} href={`/haircuts/${haircut.id}`} legacyBehavior >
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
                                    <Text fontWeight={isMobile ? 'inherit' : 'bold'} ml="4" noOfLines={2} color="white">{haircut.name}</Text>
                                </Flex>
    
                                <Text fontWeight={isMobile ? 'inherit' : 'bold'} color="white">Preço: R$ {haircut.price}</Text>
    
                            </Flex>
                        </Link>
                    ))}


                </Flex>
            </Sidebar>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try{

        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get("/haircuts",
        {
            params:{
                status: true,
            }
        })


        if(response.data === null){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        return{
            props: {
                haircuts: response.data
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