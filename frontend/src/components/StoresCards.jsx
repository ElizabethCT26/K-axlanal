import React, { useEffect, useState, useRef } from 'react';
import { useGeneralContext } from '../contexts/GeneralContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StoreCards(prop) {

    const { darkMode, likes, setLikes, enqueueSnackbar } = useGeneralContext();

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
    const fetchLikes = async () => {
        try{
            const response  = await axios.get('https://localhost:8082/interest/user', { withCredentials: true })
            console.log(response.data)

            const likedTiendasIds = response.data.map(like => like.id_tienda);
            console.log(likedTiendasIds)
            setLikes(likedTiendasIds);
        } catch (error){
            console.log('algo ha salido mal')
        }
    }

    const handleLike = async (e, storeId) => {
        e.preventDefault()

        try{
            console.log(storeId)
            const response  = await axios.post('https://localhost:8082/interest', { storeId }, { withCredentials:true })
            setLikes(prevLikes => [...prevLikes, storeId]);
            enqueueSnackbar(' Agregado correctamente a favoritos', { variant: 'success' });
            
        } catch (error){
            enqueueSnackbar('Hubo un error al agregar a favoritos', { variant: 'error' });
            
        }
    }
   

    const removeLike = async (e, storeId) => {
        e.preventDefault()

        try{
            console.log(storeId)
            const response  = await axios.delete(`https://localhost:8082/interest/${storeId}`, { withCredentials:true })
            setLikes(prevLikes => prevLikes.filter(like => like !== storeId))
      
            enqueueSnackbar('Removido correctamente de favoritos', { variant: 'success' });
        } catch (error){
            console.log('algo ha salido mal')
            enqueueSnackbar('Hubo un error al removerlo de favoritos', { variant: 'success' });
        }
    }
  

    useEffect(()=>{
        fetchData();
        fetchLikes();
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
            <div className="flex flex-wrap flex-col mx-[5vw] gap-[1vw] items-center overflow-x-auto no-scrollbar h-[15vw]" ref={scrollContainerRef}>
                {
            data ? (
                data.map((tienda, index) => (
                    <Link to={`/tienda/${tienda.id}/${tienda.tienda.replaceAll(' ', '-')}`}>
                        <div className={`  ${darkMode ? 'bg-darkCardBottom ' : 'bg-cardBottom' } w-[26.2vw] h-[13vh] flex flex-wrap flex-col justify-center items-center ` } key={index}>
                            <div className={` ${darkMode ? 'bg-darkCardBg ' : 'bg-cardBg' } h-[90%] w-[30%] relative z-0 `}>
                                <img src={`https://localhost:8082${tienda.profile_path}`} className="w-full h-full object-cover "/>
                            </div>
                            <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' }  w-[60%] h-full py-[.5vh]`}>
                                <div className='w-full h-full flex flex-wrap items-center'>
                                    <h2 className='text-sm font-inriaSans'>{tienda.tienda}</h2>
                                    <h2 className='text-xs font-inriaSans text-[#868686] w-full'>{tienda.eslogan}</h2>    
                                    <h2 className='text-xs font-inriaSans font-light italic text-[#868686]'>{tienda.area_comercial}</h2> 
                                    <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' } w-full flex flex-wrap items-center justify-end gap-1 `}>
                                        
                                    {likes.includes(tienda.id) ? (
                                        
                                        <button
                                                       className="w-[12vw]  md:w-[3vw] h-[3.7vh] rounded-md flex justify-center items-center"
                                                       onClick={(e) => removeLike(e, tienda.id)}
                                                   >
                                                          <svg width="100%" className="fill-red-600 p-[.4vh]" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                               <g transform="matrix(2.58512,0,0,2.26442,-441.491,-438.056)">
                                                                   <path d="M209.876,402.256L208.881,215.742C209.983,210.138 207.419,198.419 218.975,197.808L320.263,197.018C333.036,196.357 331.15,205.636 331.908,211.529L332.171,405.884C326.739,418.731 309.124,415.011 303.821,409.307L284.599,383.005C281.409,378.526 266.772,374.68 260.93,382.215L238.168,409.19C230.612,417.607 217.431,417.558 209.876,402.256Z" />
                                                               </g>
                                                           </svg>
                                                       
                                                   </button>
                                                   ) : (
                                                   <button
                                                       className=" w-[12vw] pr-[1vw] md:w-[3vw] h-[3.7vh]  rounded-md flex justify-center items-center"
                                                       onClick={(e) => handleLike(e, tienda.id)}
                                                   >
                                                           <svg width="100%" className="fill-blue-400 p-[.4vh]" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                               <g transform="matrix(1,0,0,1,6.11998,16.0914)">
                                                                   <path d="M100.302,347.69L25.468,383.304C22.916,384.518 19.859,383.432 18.645,380.881L14.244,371.635C13.03,369.083 14.116,366.026 16.667,364.811L483.606,142.593C486.158,141.379 489.216,142.465 490.43,145.016L494.83,154.263C496.044,156.814 494.959,159.872 492.407,161.086L416.771,197.081L417.211,481.038C403.169,510.128 357.631,501.706 343.922,488.79L294.231,429.23C285.985,419.087 248.148,410.378 233.044,427.442L174.201,488.525C154.67,507.583 120.595,507.472 101.064,472.823L100.302,347.69Z" />
                                                               </g>
                                                               <g transform="matrix(1,0,0,0.96223,6.58281,-4.81787)">
                                                                   <path d="M100.171,326.148L98.492,50.476C101.34,37.785 94.712,11.247 124.586,9.864L386.428,8.075C419.446,6.579 414.572,27.591 416.53,40.936L416.756,187.32C382.467,205.528 343.954,224.58 290.353,249.217L100.171,343.278L100.171,326.148Z" />
                                                               </g>
                                                           </svg>
                                                   </button>
                                                   )}
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



