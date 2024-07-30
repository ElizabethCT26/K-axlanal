import React, { useEffect, useState, useRef } from 'react';
import { useGeneralContext } from '../contexts/GeneralContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StoreCards(prop) {

    const {darkMode}= useGeneralContext();

    const message = encodeURIComponent(`Hola, me ustaria conocer más acerca de la tienda! `)
    const scrollContainerRef = useRef(null);
    

    const [data, setData] = useState([])
    const fetchData = async () => {
        const response = await axios.get(`https://localhost:8082/stores${prop.endpoint}`)
        console.log(response.data)
            setData(response.data)
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 1080;
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 1080;
        }
    };
  

    useEffect(()=>{
        fetchData();
    },[prop.endpoint])

  return (

    <div className='font-light relative'>
            <button
                className="absolute left-[3vw] top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-300 rounded-sm text-black transition-all duration-500 ease-in-out px-2 py-2 md:hover:py-[18vh] z-40  "
                onClick={scrollLeft}
            >
                &lt;
            </button>
            <button
                className="absolute right-[3vw] top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-sm text-black transition-all duration-500 ease-in-out px-2 py-2 md:hover:py-[18vh] z-40"
                onClick={scrollRight}
            >
                &gt;
            </button>
        {data.length > 0 ? (
            <div className="flex flex-wrap flex-col justify-center mx-[5vw] gap-[1vw] overflow-x-auto no-scrollbar h-[15vw]" ref={scrollContainerRef}>
                {
            data ? (
                data.map((tienda, index) => (
                    <Link to={`/tienda/${tienda.id}/${tienda.tienda.replaceAll(' ', '-')}`}>
                        <div className={`  ${darkMode ? 'bg-darkCardBottom ' : 'bg-cardBottom' } w-[26.2vw] h-[13vh] flex flex-wrap flex-col justify-center items-center ` } key={index}>
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
                ) : (
                    <div className="flex mx-[5vw] gap-[1vw] overflow-x-auto no-scrollbar" ref={scrollContainerRef}>

                    </div>
                )}
    </div>
  )
}

export default StoreCards