import { createContext, ReactNode, useState } from "react"
import { destroyCookie } from 'nookies'
import Router from 'next/router'

//informações do contexto
interface AuthContextData{
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
}

//Tipagem do usuário
interface UserProps{
    id: string;
    name: string;
    email: string;
    endereco: string | null;
    subscriptions?: SubscriptionProps | null;  //? declara que é opcional
}

//Tipagem da assinatura
interface SubscriptionProps{
    id: string;
    status: string;
}

//Tipagem dos elementos filhos
type AuthProviderProps = {
    children: ReactNode
} 

interface SignInProps{
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
    console.log("ERRO NO LOGOUT")
    try{
        destroyCookie(null, '@barber.token', { path: '/'})
        Router.push('/login');
    }catch(err){
        console.log("Erro ao sair")
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user; // !! converte o resultado para booleano. Se tem info = true e se vazio = false

    async function signIn({ email, password }: SignInProps){
        console.log({
            email,
            password
        })
    }


    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}