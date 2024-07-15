import { createContext, useContext, useState } from "react";

export const GeneralContext = createContext();

export const useGeneralContext = () => {
    const context = useContext(GeneralContext);
    if(!context){
        throw new Error('useGeneral context must be within the limits of GeneralContextProvider');
    }

    return context
}

export const GeneralContextProvider = ({children}) => {
    const [darkMode,setDarkMode] = useState(false);
    const [userId, setUserId] = useState('');

    return (
        <GeneralContext.Provider value={{ darkMode, setDarkMode, userId, setUserId }} >
            {children}
        </GeneralContext.Provider>
    )
}

