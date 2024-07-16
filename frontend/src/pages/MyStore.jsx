import React, { useEffect, useState } from "react";
import CardsVendedor from "../components/CardsVendedor";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useGeneralContext } from "../contexts/GeneralContext";

function MyStore (){

    const {darkMode} = useGeneralContext();

    const [data, setData] = useState([])

    const params = useParams()

    const fetchData = async (idStore) => {
        try{
            const response =  await axios.get(`http://localhost:8082/stores/${idStore}`);
            setData(response.data)
            console.log(response.data)
        } catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchData(params.id);
    },[params.id])

    return(
<>
<Header/>
    <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} font-light`}>
        {
            data ? (
                data.map((tienda, index)=> (
                    <>
                    <div key={index} className="w-full h-[30vh]">
                        <img
                            className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} w-full h-full object-cover`}
                            src={`http://localhost:8082${tienda.banner_path}`}
                            alt="Store Banner"
                        />
                    </div>

                    <div className="w-full py-[8vh] px-[5vw] flex justify-between ">
                        <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} md:w-[37vw] md:h-[43vh] `}>
                            <img
                                className="w-full h-full object-cover"
                                src={`http://localhost:8082${tienda.profile_path}`}
                                alt="Store Banner"
                            />
                        </div>
                        <div className="p-[5vh] md:w-[50vw]">
                            {/*Cambiar el font por inter */}
                        <div className=" flex justify-between ">
                            <div className="md:w-[28vw] ">
                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black')} text-4xl font-inter border-b-2 border-b-[#1EBEE1] px-[.5vw] py-1 `}>{tienda.tienda}</h2>
                                <h2 className="border-b border-b-[#1EBEE1] p-[0.5%]"></h2>
                                <h2 className="border-b-2 border-b-[#1EBEE1] p-[0.6%]"></h2>
                            </div>
                            <div>
                            <button></button>
                                <button className={` ${darkMode ? ('bg-darkBottomEdit ') : ('bg-BottomEdit')}  text-white px-3 py-1 rounded-sm`}>
                                Editar perfil
                                </button>
                            </div>
                        </div>
                            <div className="md:w-[40vw] text-[#868686] py-[2vh]">
                                <p>{tienda.descripcion}</p>
                            </div>
                            <div className={` ${darkMode ? (' text-white') : ('text-[#110952]')} md:w-[30vw] text-sm text-[#110952] py-[2vh] font-normal`}>
                                <h2>📍Calle Margaritas #123, Colonia Centro,Cancún, Quintana Roo.</h2>
                            </div>
                        </div>
                    </div>
                    </>
                ))
            ) : (
                <h2> falla</h2>
            )
        }

        <div className=" w-full justify-between flex px-[5vw]">
           
            <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} font-normal  mx-[.3vw] `}>Productos populares</h1>
            </div>
            <div className="flex justify-between">
                <Link to ="/crear-producto">
                    <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
                </Link>
            </div>
            
        </div>
        <CardsVendedor endpoint={`popular/${params.id}`}/> 
        <div className="w-full justify-between flex px-[5vw]">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} font-normal  mx-[.3vw] `}>Más recientes </h1>
            </div>
            <div className="flex justify-between">
                <Link to ="/crear-producto">
                    <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
                </Link>
            </div>
        </div>
        <CardsVendedor endpoint={`latest/${params.id}`}/> 
        <div className="w-full justify-between flex px-[5vw]">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} font-normal  mx-[.3vw] `}>Descuentos</h1>
            </div>
            <div className="flex justify-between">
                <Link to ="/crear-producto">
                    <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
                </Link>
            </div>
        </div>
        <CardsVendedor endpoint={`discounts/${params.id}`}/>  
       <div className="w-full justify-between flex px-[5vw] ">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} font-normal  mx-[.3vw] `}>Mas recientes</h1>
            </div>
            <div className="flex justify-between">
                <Link to ="/crear-producto">
                    <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
                </Link>
            </div>
        </div>
        <div className=" w-full flex flex-wrap justify-center ">
            <div className="w-[89vw] flex flex-wrap justify-between">
                <div className="flex flex-wrap justify-between md:w-[31vw]">
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[31vw] md:h-[35vh]`}>      
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:h-[26vh] md:w-[14.7vw] self-end`}>  
                    
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:h-[26vh] md:w-[14.7vw] self-end`}>  
                    
                    </div>
                    
                </div>
                <div className="flex flex-wrap justify-between w-[56vw] gap-3">
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  md:w-[13vw] md:h-[20vh]`}>        
                    </div>
                </div>
            </div>
        </div>
            
    </div>  
    <Footer/>
</>
    )

}

export default MyStore
