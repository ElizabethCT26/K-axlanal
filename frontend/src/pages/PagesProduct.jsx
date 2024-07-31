import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCards from "../components/ProductCards";
import axios from "axios";
import { useGeneralContext } from "../contexts/GeneralContext";

function PagesProduct() {
    const { darkMode, likes, setLikes, enqueueSnackbar } = useGeneralContext();

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

        const fetchLikes = async () => {
            try{
                const response  = await axios.get('https://localhost:8082/favorite/user', { withCredentials: true })
                console.log(response.data)
    
                const likedProductIds = response.data.map(like => like.id_product);
                console.log(likedProductIds)
                setLikes(likedProductIds);
            } catch (error){
                console.log('algo ha salido mal')
            }
        }
    
        const handleLike = async (e, productId) => {
            e.preventDefault()
    
            try{
                console.log(productId)
                const response  = await axios.post('https://localhost:8082/favorite', { productId }, { withCredentials:true })
                setLikes(prevLikes => [...prevLikes, productId]);
                enqueueSnackbar(' Agregado correctamente a favoritos', { variant: 'success' });
                
            } catch (error){
                enqueueSnackbar('Hubo un error al agregar a favoritos', { variant: 'error' });
                
            }
        }
       
    
        const removeLike = async (e, productId) => {
            e.preventDefault()
    
            try{
                console.log(productId)
                const response  = await axios.delete(`https://localhost:8082/favorite/${productId}`, { withCredentials:true })
                setLikes(prevLikes => prevLikes.filter(like => like !== productId))
          
                enqueueSnackbar('Removido correctamente de favoritos', { variant: 'success' });
            } catch (error){
                console.log('algo ha salido mal')
                enqueueSnackbar('Hubo un error al removerlo de favoritos', { variant: 'success' });
            }
        }

    useEffect(()=>{
        fetchProduct(id);
        fetchLikes();
    },[params.id])



    return (
        <>
         
     
      <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex flex-col md:flex-row font-light min-h-screen  `}>
        
            {
                data ? (
                    data.map((product, index)=> (
                        <div className="flex flex-col md:flex-row px-[5vw] my-[3%] gap-4" key={index}>
                            <div className=" bg-[#D9D9D9] md:w-[25vw] md:h-[45vh] object-contain  border-b-2 border-[#00B7EB]">
                                <img src={`https://localhost:8082${product.img_path}`} className="object-contain w-full h-full"/>
                            </div>
                        <div className="flex flex-col md:w-[50vw]  ">
                            <div className="flex justify-between my-[1.5vh]">
                                <h1 className={` ${darkMode ? ('text-white') : ('text-black')} border-b-[#341CA7] border-b-2 mx-[2vw] md:w-[20vw] p-[.3vw] font-normal`}>{product.nombre}</h1>
                                <div >
                                
                                {likes.includes(product.id) ? (
                                                    <button
                                                        className="w-[12vw] md:w-[3vw] h-[3.7vh] rounded-md flex justify-center items-center"
                                                        onClick={(e) => removeLike(e, product.id)}
                                                    >
                                                           <svg width="100%"  className="fill-red-600 p-[.4vh]" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                        <g transform="matrix(2.58512,0,0,2.26442,-441.491,-438.056)">
                                                            <path d="M209.876,402.256L208.881,215.742C209.983,210.138 207.419,198.419 218.975,197.808L320.263,197.018C333.036,196.357 331.15,205.636 331.908,211.529L332.171,405.884C326.739,418.731 309.124,415.011 303.821,409.307L284.599,383.005C281.409,378.526 266.772,374.68 260.93,382.215L238.168,409.19C230.612,417.607 217.431,417.558 209.876,402.256Z" />
                                                        </g>
                                                    </svg>
                                                        
                                                    </button>
                                                    ) : (
                                                    <button
                                                        className=" w-[12vw] pr-[1vw] md:w-[3vw] h-[3.7vh]  rounded-md flex justify-center items-center"
                                                        onClick={(e) => handleLike(e, product.id)}
                                                    >
                                                    <svg width="100%" className="fill-blue-400 p-[.4vh]"  height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                        <g transform="matrix(1,0,0,1,6.11998,16.0914)">
                                                            <path d="M100.302,347.69L25.468,383.304C22.916,384.518 19.859,383.432 18.645,380.881L14.244,371.635C13.03,369.083 14.116,366.026 16.667,364.811L483.606,142.593C486.158,141.379 489.216,142.465 490.43,145.016L494.83,154.263C496.044,156.814 494.959,159.872 492.407,161.086L416.771,197.081L417.211,481.038C403.169,510.128 357.631,501.706 343.922,488.79L294.231,429.23C285.985,419.087 248.148,410.378 233.044,427.442L174.201,488.525C154.67,507.583 120.595,507.472 101.064,472.823L100.302,347.69Z" />
                                                        </g>
                                                        <g transform="matrix(1,0,0,0.96223,6.58281,-4.81787)">
                                                            <path d="M100.171,326.148L98.492,50.476C101.34,37.785 94.712,11.247 124.586,9.864L386.428,8.075C419.446,6.579 414.572,27.591 416.53,40.936L416.756,187.32C382.467,205.528 343.954,224.58 290.353,249.217L100.171,343.278L100.171,326.148Z" />
                                                        </g>
                                                    </svg>
                                                    </button>
                                                )}
                                </div>
                            </div>
                    
                            <div className=" w-full flex flex-col md:h-[28vh] ">
                                <h2 className="text-[#868686]  px-[5%] md:w-[40vw]">{product.descripcion}</h2>
                            </div>
                            <div className="flex  justify-around gap-[.4vw]">
                                    <h2 className="text-[#2374AB] border-b-[#70C5BB] border-b-2  px-[1vw]">$ {product.precio}</h2>
                                <div className="bg-[#70C5BB] md:w-[8vw] text-[#FFFFFF] rounded-md text-center">
                                    <a href={waUrl}>Contactar</a>
                                   
                                </div>
                            </div>
                        </div>  
                    </div>
                    ))
                ) : (
                    <h2>nuthin</h2>
                )
            }
        
     
        
    </div>
      {/*Importacion de cards */}
      <div className= {` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex-col flex  px-[5vw]`}>
    <div className="mb-[1%] font-normal  w-[20vw] border-b-2 border-b-[#341CA7] py-[.4vh]">
        <h1 className={` ${darkMode ? 'text-white' : 'text-black'} font-normal mx-[.3vw]`}>
            {storeId ? 'Productos relacionados' : 'Productos populares'}
        </h1>
    </div>
</div>

        {storeId ? (<ProductCards endpoint={`popular/${storeId}`}  />) : (<ProductCards endpoint={`popular`}/>)} 
        
   

    </>
    )}
export default PagesProduct