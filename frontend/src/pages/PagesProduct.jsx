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
        setStoreId(response.data[0].id_tienda)
        setWaUrl(`https://wa.me/1${response.data[0].contacto}?text=${message}`)
        }

        const fetchLikes = async () => {
            try{
                const response  = await axios.get('https://localhost:8082/favorite/user', { withCredentials: true })
    
                const likedProductIds = response.data.map(like => like.id_product);
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
         
     
      <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex flex-col md:flex-row font-light min-h-[65vh]  `}>
        
            {
                data ? (
                    data.map((product, index)=> (
                        <div className="flex flex-col md:flex-row px-[5vw] my-[3%] gap-4" key={index}>
                            <div className=" bg-[#D9D9D9] md:w-[25vw] md:h-[45vh] object-contain  border-b-2 border-[#00B7EB]">
                                <img src={`https://localhost:8082${product.img_path}`} className="object-contain w-full h-full"/>
                            </div>
                        <div className="flex flex-col md:w-[50vw]  ">
                            <div className="flex justify-between my-[1.5vh]">
                                <h1 className={` ${darkMode ? ('text-white') : ('text-black')} border-b-[#341CA7] border-b-2 mx-[2vw] md:w-[20vw] p-[.3vw] text-xl font-normal`}>{product.nombre}</h1>
                                <div >
                                
                                {likes.includes(product.id) ? (
                                                    <button
                                                        className="w-[12vw] md:w-[3vw] h-[3.7vh] rounded-md flex justify-center items-center"
                                                        onClick={(e) => removeLike(e, product.id)}
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
                                                        onClick={(e) => handleLike(e, product.id)}
                                                    >
                                                    <svg width="100%" height="100%" className=" stroke-red-500 fill-none stroke-[2vw]" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                        <g transform="matrix(1.3875,0,0,1.31473,-113.296,-104.261)">
                                                            <path d="M267.337,162.085C304.293,96.549 378.206,96.549 415.163,129.317C452.121,162.085 452.121,227.621 415.163,293.157C389.293,342.309 322.772,391.461 267.337,424.229C211.902,391.461 145.381,342.309 119.512,293.157C82.555,227.621 82.555,162.085 119.512,129.317C156.468,96.549 230.381,96.549 267.337,162.085Z"/>
                                                        </g>
                                                    </svg>
                                                    </button>
                                                )}
                                </div>
                            </div>
                    
                            <div className=" w-full flex flex-col md:h-[28vh] ">
                                <h2 className="text-[#868686]  px-[4%] md:w-[40vw] py-[1.2%]">{product.descripcion}</h2>
                            </div>
                            <div className="flex  justify-between gap-[.4vw]">
                                        <h2 className="text-[#21587d] border-b-[#70C5BB] border-b-2 mx-[3vw] px-[2vw]">$ {product.precio}</h2>
                                
                            <a href={waUrl} target="_blank">
                                <div className="border-[.2vw] border-[#25d366] text-[#25d366] font-normal md:w-[10vw] rounded-md text-center flex items-center justify-center py-[.5vh]">
                                    <div className="w-[1vw] mx-[.2vw]">
                                        <svg width="100%" height="100%" className=" fill-[#25d366] w-full h-full object-cover" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/">
                                            <path d="M180.753,141.858C66.686,215.234 306.672,436.374 377.821,349.275C386.066,337.509 388.67,324.762 386.515,311.186L333.108,283.034C328.947,281.952 326.275,282.607 324.828,284.69L304.541,310.358C302.598,313.503 300.014,315.049 296.261,313.671C260.968,301.638 232.175,278.575 211.804,241.219C210.009,235.283 210.841,232.726 212.218,230.869L227.95,209.755C229.486,207.595 229.879,204.577 229.606,201.061L207.778,146.057C205.59,144.578 203.876,142.33 200.423,141.359C195.302,139.919 187.78,140.271 180.753,141.858Z" />
                                            <path d="M32.802,501.062L65.923,372.616C5.933,257.68 46.045,144.124 95.648,88.825C149.159,29.169 267.858,-29.158 396.223,48.499C652.407,245.07 403.012,607.776 157.684,464.931L32.802,501.062ZM89.476,444.186L162.756,423.971C222.798,460.319 285.762,466.471 352.273,435.974C413.861,403.076 450.554,351.835 460.93,281.201C467.404,210.422 445.36,149.828 395.231,99.265C334.831,51.143 270.408,39.234 201.923,63.888C149.293,83.813 111.745,121.219 89.476,176.335C76.77,205.408 71.48,237.447 74.946,272.989C78.966,307.065 90.392,339.432 108.428,370.274L89.476,444.186Z" />
                                        </svg>
                                    </div>
                                    Contactar
                                </div>
                                </a>
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