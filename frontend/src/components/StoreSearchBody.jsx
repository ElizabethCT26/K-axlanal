import React, { useEffect, useState } from 'react';
import { useGeneralContext } from '../contexts/GeneralContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import missing from '../assets/image.jpg'

function StoreSearchBody(prop) {

    const { darkMode, likes, setLikes, enqueueSnackbar } = useGeneralContext();

    const message = encodeURIComponent(`Hola, me ustaria conocer más acerca de la tienda! `)

    const [data, setData] = useState([])
    const fetchData = async () => {
        const response = await axios.get(`https://localhost:8082/stores${prop.endpoint}`)
        setData(response.data)
    };

    const fetchLikes = async () => {
        try{
            const response  = await axios.get('https://localhost:8082/interest/user', { withCredentials: true })
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
    <div className='w-[80.8vw] flex flex-wrap gap-[0.5vw] py-[2vh] '>
    {
            data ? (
                data.map((tienda, index) => (
                    <Link to={`/tienda/${tienda.id}/${(tienda.tienda).trim().replaceAll(' ', '-')}`}>
                        <div className={` ${darkMode ? 'bg-darkCardBottom ' : 'bg-cardBottom' } w-[26.2vw] h-[13vh] flex flex-wrap flex-col justify-center items-center`} key={index}>
                            <div className={` ${darkMode ? 'bg-darkCardBg ' : 'bg-cardBg' } h-[90%] w-[30%] relative z-0 `}>
                                <img src={ !tienda.profile_path ? (missing) : (`https://localhost:8082${tienda.profile_path}`) } className="w-full h-full object-cover "/>
                            </div>
                            <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' } w-[60%] h-full py-[.5vh]`}>
                                <div className='w-full h-full flex flex-wrap items-center'>
                                    <h2 className='text-sm font-inriaSans'>{tienda.tienda}</h2>
                                    <h2 className='text-xs font-inriaSans text-[#868686] w-full'>{tienda.eslogan}</h2>    
                                    <h2 className='text-xs font-inriaSans font-light italic text-[#868686]'>{tienda.area_comercial}</h2> 
                                    <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' } w-full flex flex-wrap items-center justify-end gap-1 `}>
                                        
                                    {likes.includes(tienda.id) ? (
                                        
                                        <button
                                                        className="w-[12vw] md:w-[3vw] h-[3.7vh] rounded-md flex justify-center items-center"
                                                        onClick={(e) => removeLike(e, tienda.id)}
                                                    >
                                                    <svg width="100%" height="100%" className=" stroke-red-500 fill-red-500 stroke-[2vw]" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                        <g transform="matrix(1.3875,0,0,1.31473,-113.296,-104.261)">
                                                            <path d="M267.337,162.085C304.293,96.549 378.206,96.549 415.163,129.317C452.121,162.085 452.121,227.621 415.163,293.157C389.293,342.309 322.772,391.461 267.337,424.229C211.902,391.461 145.381,342.309 119.512,293.157C82.555,227.621 82.555,162.085 119.512,129.317C156.468,96.549 230.381,96.549 267.337,162.085Z"/>
                                                        </g>
                                                    </svg>
                                                        
                                                    </button>
                                                    ) : (
                                                    <button
                                                        className=" w-[12vw] md:w-[3vw] h-[3.7vh]  rounded-md flex justify-center items-center"
                                                        onClick={(e) => handleLike(e, tienda.id)}
                                                    >
                                                    <svg width="100%" height="100%" className=" stroke-red-500 fill-none stroke-[2vw]" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                        <g transform="matrix(1.3875,0,0,1.31473,-113.296,-104.261)">
                                                            <path d="M267.337,162.085C304.293,96.549 378.206,96.549 415.163,129.317C452.121,162.085 452.121,227.621 415.163,293.157C389.293,342.309 322.772,391.461 267.337,424.229C211.902,391.461 145.381,342.309 119.512,293.157C82.555,227.621 82.555,162.085 119.512,129.317C156.468,96.549 230.381,96.549 267.337,162.085Z"/>
                                                        </g>
                                                    </svg>
                                                    </button>
                                                )}
                                        <a
                                            href={`https://wa.me/1${tienda.contacto}?text=${message}${tienda.nombre}`}
                                            target="_blank"
                                            className=" w-[1.7vw] h-[3.5vh] rounded-md flex justify-center items-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                                    <svg width="100%" className="fill-[#4fcc5d]" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                        <path d="M180.753,141.858C66.686,215.234 306.672,436.374 377.821,349.275C386.066,337.509 388.67,324.762 386.515,311.186L333.108,283.034C328.947,281.952 326.275,282.607 324.828,284.69L304.541,310.358C302.598,313.503 300.014,315.049 296.261,313.671C260.968,301.638 232.175,278.575 211.804,241.219C210.009,235.283 210.841,232.726 212.218,230.869L227.95,209.755C229.486,207.595 229.879,204.577 229.606,201.061L207.778,146.057C205.59,144.578 203.876,142.33 200.423,141.359C195.302,139.919 187.78,140.271 180.753,141.858Z"/>
                                                        <path d="M32.802,501.062L65.923,372.616C5.933,257.68 46.045,144.124 95.648,88.825C149.159,29.169 267.858,-29.158 396.223,48.499C652.407,245.07 403.012,607.776 157.684,464.931L32.802,501.062ZM89.476,444.186L162.756,423.971C222.798,460.319 285.762,466.471 352.273,435.974C413.861,403.076 450.554,351.835 460.93,281.201C467.404,210.422 445.36,149.828 395.231,99.265C334.831,51.143 270.408,39.234 201.923,63.888C149.293,83.813 111.745,121.219 89.476,176.335C76.77,205.408 71.48,237.447 74.946,272.989C78.966,307.065 90.392,339.432 108.428,370.274L89.476,444.186Z"/>
                                                    </svg>
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