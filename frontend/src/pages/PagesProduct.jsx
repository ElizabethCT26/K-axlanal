import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCards from "../components/ProductCards";
import axios from "axios";
import { useGeneralContext } from "../contexts/GeneralContext";

function PagesProduct() {
    const { darkMode } = useGeneralContext();

    const params = useParams();
    const [data, setData] = useState();
    const [storeId, setStoreId] = useState();
    const [waUrl, setWaUrl] = useState();

    const id = params.id;

    const fetchProduct = async (idGet) => {
        const response = await axios.get(`https://localhost:8082/products/${idGet}`)
        setData(response.data)
        const message = encodeURIComponent(`Hola, estoy interesado en comprar ${response.data[0].nombre}`)
        console.log(response.data[0].id_tienda)
        setStoreId(response.data[0].id_tienda)
        setWaUrl(`https://wa.me/1${response.data[0].contacto}?text=${message}`)
        }

    useEffect(()=>{
        fetchProduct(id);
    },[params.id])



    return (
        <>
         
     
      <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')}  font-light   `}>
        
            {
                data ? (
                    data.map((product, index)=> (
                        <div className="flex  flex-row  px-[5vw]  my-[3%] gap-x-[4vw] " key={index}>
                            <div className=" bg-[#D9D9D9] md:w-[25vw] md:h-[45vh] object-contain  border-b-2 border-[#00B7EB]">
                                <img src={`https://localhost:8082${product.img_path}`} className="object-contain w-full h-full"/>
                            </div>
                        <div className="flex flex-col w-[50vw]  ">
                            <div className="flex justify-between my-[1.5vh]">
                                <h1 className={` ${darkMode ? ('text-white') : ('text-black')} border-b-[#341CA7] border-b-2 mx-[2vw] md:w-[20vw] p-[.3vw] font-normal`}>{product.nombre}</h1>
                                <div >
                                    <h4>❤️</h4>
                                </div>
                            </div>
                    
                            <div className="md:h-[28vh]">
                                <h2 className="text-[#868686] px-[5%] md:w-[40vw]">{product.descripcion}</h2>
                            </div>
                            <div className="flex self-end justify-around gap-[.4vw]">
                                    <h2 className="text-[#2374AB] border-b-[#70C5BB] border-b-2  px-[1vw]">$ {product.precio}</h2>
                                <div className="bg-[#70C5BB] md:w-[8vw] text-[#FFFFFF] rounded-md text-center">
                                    <a href={waUrl}>💬Contactar</a>
                                </div>
                            </div>
                        </div>  
                    </div>
                    ))
                ) : (
                    <h2>nuthin</h2>
                )
            }
        
       {/*Importacion de cards */}
        <div className="w-full flex px-[5vw]">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className={` ${darkMode ? ('text-white') : ('text-black')} font-normal  mx-[.3vw] `}>{ storeId? ('Productos relacionados') : ('Productos populares')}</h1>
            </div>
            
        </div>
        {storeId ? (<ProductCards endpoint={`popular/${storeId}`} />) : (<ProductCards endpoint={`popular`}/>)} 
        <div className="w-full flex pt-[2%] px-[5vw]">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className={` ${darkMode ? ('text-white') : ('text-black')} font-normal  mx-[.3vw] `}>Más de esta tienda</h1>
            </div>
            
        </div>
        
    </div>

    </>
    )}
export default PagesProduct