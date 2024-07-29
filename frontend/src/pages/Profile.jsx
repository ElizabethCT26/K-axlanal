import React, { useState, useEffect, useRef } from 'react'
import { useGeneralContext } from '../contexts/GeneralContext';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCards from '../components/ProductCards';
import StoreSearchBody from '../components/StoreSearchBody';
import StoreCards from '../components/StoresCards';
import StoreSearchBody from '../components/StoreSearchBody'


function Profile() {
    const {darkMode} = useGeneralContext();
    const [data, setData] = useState([])



    const params = useParams()

    const fetchData = async (profileId) => {
        const response = await axios.get(`https://localhost:8082/profiles/${profileId}`)
        setData(response.data)
        console.log(response.data)
    }

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

    useEffect(() => {
        fetchData(params.id)
    }, [])

    return (
        <>
        <div>
            {
                data ? (
                    data.map((perfil, index)=>(
                        <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:flex-row flex-col flex px-[5vw] py-[8vh] w-full`} >
                        <div className='flex flex-col py-[4vh] bg-red'>
                                <div className='py-[4vh]'>
                                    <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} justify-between border  border-b-[#341CA7] md:h-[60vh] sm:h-[20vh] md:w-[28vw] sm:w-[18vw]`}>
                                        <img
                                                className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} w-full h-full object-cover`}
                                                src={`https://localhost:8082${perfil.profile_path}`}
                                                
                                            />
                                    </div>
                                </div>
                        </div>
                            <div className="flex flex-col  px-[4vw] ">
                                <div className="flex justify-between mt-[1.5vh]">
                                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} mx-[2v] md:w-[20vw] p-[.3vw] font-semibold `}>Perfil</h1>
                                </div>
                                <div className='flex '>
                                    <div className='py-[1.4vh] w-full'>
                                    <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} > {perfil.nombre} {perfil.apellido} </h2>
                                        
                                           
                                    </div>
                                
                                    
                               </div>
                                    <h4 className='border-b-[#341CA7] md:w-[50vw] border-b-2 py-[1vh]'></h4>
                                <div className='py-[5vh] text-[#868686] ]'>
                                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-justify flex flex-col md:flex-row w-full  md:w-[55vw] p-[.3vw] `}>
                                        {perfil.descripcion}
                                    </h1>
                                        
                                    </div>
                                
                                        <div className="flex py-[1vh] justify-between">
                                            <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Teléfono:</h2>
                                            <div>
                                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >{perfil.telefono}</h2>
                                            </div>
                                                            
                                        </div>  
                                        <div className='flex self-end '>
                                        <div className="flex self-end justify-around px-2 py-[5vh] ">
                                            <Link to='/editar-perfil'><button className='bg-[#3b5998] w-full md:w-[8vw] md:h-[4vh] rounded-sm text-white'>Editar perfil</button></Link>
                                    </div>
                                    
                                    
                                        </div>
                                    
                            </div>  
                
                        </div>
                        
                    ))
                ) : (
                    <h2> Nada que ver aquí </h2>
                )
            }
                <div className= {`${darkMode ? ('bg-darkMainBackground text-white ') : ('bg-darkMainColor text-black')}  px-[5vw] `}>
                    <div className={`${darkMode ? ' text-white' : ' text-black'} mb-[1%] mx-[5vw] font-normal w-[14vw] border-b-2 border-b-[#341CA7] `}>
                        <h2 className=" font-normal mx-[.3vw]">Productos favoritos</h2>
                        
                    </div>
                    <ProductCards endpoint={`favorite/${params.id}`} />
               
               <StoreCards endpoint={`/`}/>
                </div>
                   
            
            </div>
            
              
       
        </>
    )
}

export default Profile
