import React, { useEffect, useState } from "react";
import CardsVendedor from "../components/CardsVendedor";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useGeneralContext } from "../contexts/GeneralContext";
import Mapbox from "../components/Mapbox";

function MyStore (){

    const {darkMode} = useGeneralContext();

    const [data, setData] = useState([])
    const [directions, setDirections] = useState([])
    const [showMap, setShowMap] = useState(true)
    const [location, setLocation] = useState(null);

    const params = useParams()

    const fetchData = async (idStore) => {
        try{
            const response =  await axios.get(`http://localhost:8082/stores/${idStore}`);
            setData(response.data)
        } catch(error){
            console.error(error);
        }
    }

    
    const fetchDirections = async (idStore) => {
        try{
            const response =  await axios.get(`http://localhost:8082/directions/${idStore}`);
            setDirections(response.data[0])
        } catch(error){
            console.error(error);
        }
    }

    const sendUbi = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
                const averageLatitude = ( (position.coords.latitude) + parseFloat(directions.latitude))/2
                const averageLongitude = ( (position.coords.longitude) + parseFloat(directions.longitude))/2
                console.log(`https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/${directions.latitude},${directions.longitude}/@${averageLatitude},${averageLongitude}`)
                window.location.href = `https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/${directions.latitude},${directions.longitude}/@${averageLatitude},${averageLongitude}`;
              },
              (error) => {
                console.error(error);
                // Handle location errors (e.g., permission denied)
              }
            );
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
    }

    useEffect(()=>{
        fetchData(params.id);
        fetchDirections(params.id)
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
                            <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-white ')} px-[1vw]`}>
                                <button className="bg-primaryColor px-[1vw] text-white rounded-t-xl   hover:bg-[#022F80] duration-300 active:bg-white active:text-[#022F80] active:border-[#022F80] border-2" type="button" onClick={() => setShowMap(!showMap)}>{ showMap ? ('Mostrar perfil') : ('Ver mapa')}</button>
                            </div>
                            {
                                showMap ? (
                                    <Mapbox endpoint={`/directions/${params.id}`}/>
                                ) : (

                                    <img
                                    className="w-full h-full object-cover"
                                    src={`http://localhost:8082${tienda.profile_path}`}
                                    alt="Store Banner"
                                />
                                )
                            }
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
                                <Link to={`/tienda/${tienda.id}/edit`} className={` ${darkMode ? ('bg-darkBottomEdit ') : ('bg-BottomEdit')}  text-white px-3 py-1 rounded-sm`}>
                                Editar perfil
                                </Link>
                            </div>
                        </div>
                            <div className="md:w-[40vw] text-[#868686] py-[2vh]">
                                <p>{tienda.descripcion}</p>
                            </div>
                            <div className={` ${darkMode ? (' text-white') : ('text-[#110952]')} md:w-[45vw] flex justify-between text-sm text-[#110952] py-[2vh] font-normal `}>
                                <h2>📍Calle Margaritas #123, Colonia Centro,Cancún, Quintana Roo.</h2>
                                <button type="button" onClick={sendUbi} className="bg-primaryColor px-[1vw] text-white rounded-sm  py-[.5vh] hover:bg-[#022F80] duration-300 active:bg-white active:text-[#022F80] active:border-[#022F80] border-2">Como llegar</button>
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
