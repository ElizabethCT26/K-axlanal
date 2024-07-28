import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet, Navigate } from 'react-router-dom'
import { useGeneralContext } from './contexts/GeneralContext'

function PrivateRoutes({reqRole}) {

    const { auth,setUserId, setUserType, setAuth, userType } = useGeneralContext()

    const [dummy, setDummy] = useState(false);
    const [isSet, setIsSet] = useState(false);
    console.log( auth )

    const getUserData = async() => {
        try{
            const response = await axios.get('https://localhost:8082/data', { withCredentials: true })
            setUserId(response.data.userId);
            setUserType(response.data.userType);
            setAuth(true);

            setIsSet(true);
        } catch(err){
            console.log('Algo ha salido mal')
            setIsSet(true);
        }
    };

    useEffect(()=>{
        getUserData()
    },[auth])    

    return(
        isSet && (
            reqRole ? (
                auth && reqRole == userType ? <Outlet/> : <Navigate to="/"/>
            ): (
                auth ? <Outlet/> : <Navigate to="/"/>
            )
        ) 
    ) 
}

export default PrivateRoutes