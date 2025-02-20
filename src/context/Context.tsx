import { createContext, ReactNode, useContext, useState } from "react"

interface  CountyContextType{
country:string;
state:string;
setCountry:(newCountry:string)=>void;
setState:(newState:string)=>void;
}

const CountyContext = createContext<CountyContextType | null>(null)

export default function LocationProvider({children}:{children:ReactNode}){
    const [country, setCountry] = useState<CountyContextType["country"]>("India")
    const [state, setState] = useState<CountyContextType["state"]>("Mumbai")
    return(
        <CountyContext.Provider  value={{ country, state, setCountry, setState }}>
            {children}
        </CountyContext.Provider>
    )
}
export const useLocation=()=>{
    const context = useContext(CountyContext);
    if (!context) {
        throw new Error("useLocation must be used within a LocatorPorvider");
    }
    return context;
}