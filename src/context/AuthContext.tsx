import { createContext, ReactNode, useState } from "react"

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

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    async function signIn({ email, password }){
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