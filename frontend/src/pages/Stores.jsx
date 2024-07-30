import React, { useEffect, useState } from 'react';
import { useGeneralContext } from '../contexts/GeneralContext';
import StoreSearchBody from '../components/StoreSearchBody';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Products() {
    const params = useParams();
    const {darkMode}= useGeneralContext();

    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState([]);
    
    const toggleVisibility = () => {
    setIsVisible(!isVisible);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:8082/business')
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        console.log(params.name);
        fetchData()
    },[])


  return (
    <>

    <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex flex-wrap `}>
        <div className={` ${darkMode ? ('bg-darkSidebar border-darkCardBg') : ('bg-colorSidebar border-borderColor ')}  h-[80vh] w-[12vw] px-[2vw] py-[3vh] flex flex-wrap gap-y-[2vh] flex-col border-r-[.2vw] `}>
            <ul className={` ${darkMode ? ('text-white') : ('text-black ')} flex flex-wrap gap-y-[1vh] flex-col`}>
                    <Link to ="/tiendas/popular">
                        <li className='text-sm'>• Más populares</li>
                    </Link>
                    <Link to ="/tiendas/latest">
                        <li className='text-sm'>• Más recientes</li>
                    </Link>
            </ul>            
                <div className={` ${darkMode ? ('text-white') : ('text-black ')}`}>
                    {
                        data  ? (
                            data.map((area, index)=>(
                                <Link to={`/tiendas/area/${area.id}/`}>
                                    <h2 className='text-sm px-2' key={index}>{area.nombre}</h2>
                                </Link>
                            ))
                        ) :
                        <h2>Vacio</h2>
                    }
                    
                    {/* 
                        {isVisible && (
                        <ul>
                            <li>Miel</li>
                            <li>Jalea real</li>
                            <li>Propoleo</li>
                            <li>Cera de abejas</li>
                        </ul>
                        
                    )}
                    */}
                </div>
        </div>
            <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex flex-wrap w-[86vw]  px-[3vw] pt-[4vh]`}>
                <div className=' w-full h-full gap-[0.5vh]'>
                    <div className='w-full  h-[6vh] flex items-center '>
                        <h2 className={` ${darkMode ? ('text-white') : ('text-black ')} `}>Tiendas: </h2>
                    </div>
                    
                    {
                        params.id  && params.areas  ? (
                            <StoreSearchBody endpoint={`/${params.areas}/${params.id}`}/>
                        ) : (
                            
                                params.name ? (
                                    <StoreSearchBody endpoint={`/${params.name}`}/>
                                ) : (
                                    <StoreSearchBody endpoint={`/`}/>
                                )
                            
                        )
                    }
                    

                </div>
            </div>
        </div>
   
    </>
    );
}

export default Products;
