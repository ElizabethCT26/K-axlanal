import { createContext, useContext, useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import axios from 'axios'

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
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);
    const [auth, setAuth] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [isSet, setIsSet] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [likes, setLikes] = useState([]);
    const [locationModal, setLocationModal] = useState(false)

    useEffect(()=>{
        const darkModeSetting = localStorage.getItem('darkMode');
        setDarkMode(darkModeSetting === 'true');
    }, [])

    const login = (data) => {
        setUserId(data.userId);
        setUserType(data.userType);
        setAuth(true);
        setIsSet(true);
    }

    const getUserData = async() => {
        try{
            const response = await axios.get('https://localhost:8082/data', { withCredentials: true })
            login(response.data)
        } catch(err){
            console.log('Algo ha salido mal')
        }
    };


    useEffect(()=>{
        if(!auth){
            getUserData();
        }
    },[])

    return (
        <GeneralContext.Provider value={{ darkMode, setDarkMode, setUserId, userId, setUserType, userType, setAuth, auth, login, trigger, setTrigger, enqueueSnackbar, getUserData, likes, setLikes, setLocationModal, locationModal}} >
            {children}
        </GeneralContext.Provider>
    )
}

