import React, { useEffect, useState } from 'react';
import { useGeneralContext } from '../contexts/GeneralContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StoreSearchBody(prop) {

    const {darkMode}= useGeneralContext();

    const message = encodeURIComponent(`Hola, me ustaria conocer más acerca de la tienda! `)

    const [data, setData] = useState([])
    const fetchData = async () => {
        const response = await axios.get(`https://localhost:8082/stores${prop.endpoint}`)
        console.log(response.data)
            setData(response.data)
    };

  

    useEffect(()=>{
        fetchData();
    },[prop.endpoint])

  return (
    <div className='w-[80.8vw] flex flex-wrap gap-[0.5vw] py-[2vh] '>
    {
            data ? (
                data.map((tienda, index) => (
                    <Link to={`/tienda/${tienda.id}/${tienda.tienda.replaceAll(' ','-')}`}>
                        <div className={` ${darkMode ? 'bg-darkCardBottom ' : 'bg-cardBottom' } w-[26.2vw] h-[13vh] flex flex-wrap flex-col justify-center items-center`} key={index}>
                            <div className={` ${darkMode ? 'bg-darkCardBg ' : 'bg-cardBg' } h-[90%] w-[30%] relative z-0 `}>
                                <img src={`https://localhost:8082${tienda.profile_path}`} className="w-full h-full object-cover "/>
                            </div>
                            <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' } w-[60%] h-full py-[.5vh]`}>
                                <div className='w-full h-full flex flex-wrap items-center'>
                                    <h2 className='text-sm font-inriaSans'>{tienda.tienda}</h2>
                                    <h2 className='text-xs font-inriaSans text-[#868686] w-full'>{tienda.eslogan}</h2>    
                                    <h2 className='text-xs font-inriaSans font-light italic text-[#868686]'>{tienda.area_comercial}</h2> 
                                    <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' } w-full flex flex-wrap items-center justify-end gap-1 `}>
                                        
                                        <button type='button' className='bg-[#6287AF] w-[42%] rounded-sm text-sm text-white font-inriaSans font-light' >
                                            
                                            Guardar</button>
                                        <a
                                            href={`https://wa.me/1${tienda.contacto}?text=${message}${tienda.nombre}`}
                                            target="_blank"
                                            className="bg-[#70C5BB] w-[1.7vw] h-[3.2vh] rounded-md flex justify-center items-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                        💬
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (<h2>nada</h2>)
        }
    </div>
  )
}

export default StoreSearchBody