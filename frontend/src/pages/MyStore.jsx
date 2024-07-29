import React, { useEffect, useState } from "react";
import CardsVendedor from "../components/CardsVendedor";
import ProductCards from "../components/ProductCards";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useGeneralContext } from "../contexts/GeneralContext";
import Mapbox from "../components/Mapbox";
import AddMapbox from "../components/AddMapbox";

function MyStore (){

    const {darkMode, userId,enqueueSnackbar} = useGeneralContext();

    const [interests, setInterests] = useState([])

    const [data, setData] = useState([])
    const [directions, setDirections] = useState([])
    const [showMap, setShowMap] = useState(true)
    const [location, setLocation] = useState(null);
    

    const [locationModal, setLocationModal] = useState(false)

    const [formData, setFormData] = useState({
        calle: '',
        avenida: '',
        manzana: '',
        codigo_postal: '',
        latitude: '',
        longitude: '',
        id_tienda: ''
    }) 

    const params = useParams()

    const fetchData = async (idStore) => {
        try{
            const response =  await axios.get(`https://localhost:8082/stores/${idStore}`);
            setData(response.data)
        } catch(error){
            console.error(error);
        }
    }

    const fetchDirections = async (idStore) => {
        try{
            const response =  await axios.get(`https://localhost:8082/directions/${idStore}`);
            setDirections(response.data[0])
        } catch(error){
            console.error(error);
        }
    }

    const fetchInterests = async () => {
        try{
            const response  = await axios.get('https://localhost:8082/interest/user', { withCredentials: true })

            const interestedStoresIds = response.data.map(interest => interest.id_tienda);
            setInterests(interestedStoresIds);
        } catch (error){
            console.log('algo ha salido mal')
        }
    }

    const handleInterest = async (storeId) => {
        try{
            const response  = await axios.post('https://localhost:8082/interest', { storeId }, { withCredentials:true })
            setInterests(prevInterests => [...prevInterests, storeId])
            enqueueSnackbar('Agregado correctamente a interesados', { variant: 'success' });
            
        } catch (error){
            console.log('algo ha salido mal')
            enqueueSnackbar('Algo salio mal al agregarlo a interesados', { variant: 'error' });
        }
        
    }

    const removeInterest = async (storeId) => {
        try{
            const response  = await axios.delete(`https://localhost:8082/interest/${storeId}`, { withCredentials:true })
            setInterests(prevInterests => prevInterests.filter(interest => interest !== storeId))
            enqueueSnackbar('Removido correctamente a interesados', { variant: 'success' });
        } catch (error){
            console.log('algo ha salido mal')
            enqueueSnackbar('Algo salio mal al removerlo de interesados', { variant: 'error' });
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
        fetchInterests()
    },[params.id])

    return(
<>

    <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} font-light`}>
        {
            data ? (
                data.map((tienda, index)=> (
                    <>
                    <div key={index} className="w-full flex flex-col md:flex-row h-[30vh]">
                        <img
                            className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} w-full h-full object-cover`}
                            src={`https://localhost:8082${tienda.banner_path}`}
                            alt="Store Banner"
                        />
                    </div>

                    <div className="w-full py-[8vh] px-[5vw] flex flex-col md:flex-row justify-between ">
                        <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} md:w-[37vw] h-[43vh] `}>
                            <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-white ')} px-[1vw]`}>
                                <button className="bg-primaryColor px-[1vw] text-white rounded-t-xl   hover:bg-[#022F80] duration-300 active:bg-white active:text-[#022F80] active:border-[#022F80] border-2" type="button" onClick={() => setShowMap(!showMap)}>{ showMap ? ('Mostrar perfil') : ('Ver mapa')}</button>
                            </div>
                            {
                                showMap ? (
                                    <Mapbox endpoint={`/directions/${params.id}`}/>
                                ) : (

                                    <img
                                    className="w-full h-full object-cover"
                                    src={`https://localhost:8082${tienda.profile_path}`}
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
                                {
                                    userId == tienda.id_propietario ? (
                                        <Link to={`/tienda/${tienda.id}/edit`} className={` ${darkMode ? ('bg-darkBottomEdit ') : ('bg-BottomEdit')}  text-white px-3 py-1 rounded-sm`}>
                                        Editar perfil
                                        </Link>
                                    ) : (
                                        interests.includes(tienda.id) ? 
                                        (
                                            <button type="button" onClick={() => removeInterest(tienda.id)} className={` ${darkMode ? ('bg-darkBottomEdit ') : ('bg-BottomEdit')}  text-white px-3 py-1 rounded-sm`}>
                                            Quitar de interesados
                                            
                                            </button>
                                        ) : (
                                            <button type="button" onClick={() => handleInterest(tienda.id)} className={` ${darkMode ? ('bg-darkBottomEdit ') : ('bg-BottomEdit')}  text-white px-3 py-1 rounded-sm`}>
                                            Agregar a interesados
                                            
                                            </button>
                                        )
                                    )
                                }
                            </div>
                        </div>
                            <div className="md:w-[40vw] text-[#868686] py-[2vh]">
                                <p>{tienda.descripcion}</p>
                            </div>
                            <div className={` ${darkMode ? (' text-white') : ('text-[#110952]')} md:w-[45vw] flex justify-between text-sm text-[#110952] py-[2vh] font-normal `}>
                                <h2>📍Calle Margaritas #123, Colonia Centro,Cancún, Quintana Roo.</h2>
                                {
                                    userId == tienda.id_propietario ? (
                                        <button type="button" onClick={()=>setLocationModal(true)} className="bg-primaryColor px-[1vw] text-white rounded-sm  py-[.5vh] hover:bg-[#022F80] duration-300 active:bg-white active:text-[#022F80] active:border-[#022F80] border-2">Cambiar ubicacion</button>
                                    ) : (
                                        <button type="button" onClick={sendUbi} className="bg-primaryColor px-[1vw] text-white rounded-sm  w-full h-full md:w-[8vw] py-[.5vh] hover:bg-[#022F80] duration-300 active:bg-white active:text-[#022F80] active:border-[#022F80] border-2">Como llegar</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    </>
                ))
            ) : (
                <h2> falla</h2>
            )
        }

        <div className=" w-full flex-col md:flex-row justify-between flex px-[5vw]">
           
            <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} font-normal  mx-[.3vw] `}>Productos populares</h1>
            </div>
            <div className="flex justify-between">
                {
                    data && (
                        data.map((tienda, index)=>(
                            userId == tienda.id_propietario && (
                                <Link to ="/crear-producto" key={index}>
                                    <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
                                </Link>

                        ))
                    )
                ) 
                }
            </div>
            
        </div>
        <ProductCards endpoint={`popular/${params.id}`}/> 
        <div className="w-full justify-between flex px-[5vw]">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} font-normal  mx-[.3vw] `}>Más recientes </h1>
            </div>
            <div className="flex justify-between">
            {
                    data && (
                        data.map((tienda, index)=>(
                            userId == tienda.id_propietario && (
                                <Link to ="/crear-producto" key={index}>
                                    <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
                                </Link>

                        ))
                    )
                ) 
                }
            </div>
        </div>
        <ProductCards endpoint={`latest/${params.id}`}/> 
        <div className="w-full justify-between flex px-[5vw]">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} font-normal  mx-[.3vw] `}>Descuentos</h1>
            </div>
            <div className="flex justify-between">
            {
                    data && (
                        data.map((tienda, index)=>(
                            userId == tienda.id_propietario && (
                                <Link to ="/crear-producto" key={index}>
                                    <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
                                </Link>

                        ))
                    )
                ) 
                }
            </div>
        </div>
        <ProductCards endpoint={`discounts/${params.id}`}/>  
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

        {locationModal && (
    <div className='fixed inset-0  backdrop-blur-sm flex items-center justify-center z-10' onClick={()=>setLocationModal(false)}>
            <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:w-[36vw] md:h-[65vh]  border-[#126477] flex flex-wrap justify-center items-center rounded-md border-4 relative pt-[2vh] px-[2vw]`} onClick={(e)=>e.stopPropagation()}>
                <h2 className={` ${darkMode ? (' text-white ') : ('text-black')} text-xl w-full text-center`}>Cambiar ubicacion</h2>
                
                
                <div className="w-[95%] h-[70%] mb-[5vh]">
                <AddMapbox storeId={params.id}/> 
                </div>  
            </div>
        </div>
            )}
            
    </div>  
 
</>
    )

}

export default MyStore
