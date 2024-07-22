import { createContext, useContext, useEffect, useState } from "react";
import { useSnackbar } from 'notistack';

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
    const [trigger, setTrigger] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        setUserId(sessionStorage.getItem('userId'));
        console.log(setUserId)
    },[])

    return (
        <GeneralContext.Provider value={{ darkMode, setDarkMode, userId, setUserId, trigger, setTrigger, enqueueSnackbar}} >
            {children}
        </GeneralContext.Provider>
    )
}

