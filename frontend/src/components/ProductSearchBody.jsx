import React, { useEffect, useState } from 'react';
import { useGeneralContext } from '../contexts/GeneralContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductSearchBody(prop) {

    const {darkMode}= useGeneralContext();

    const message = encodeURIComponent(`Hola, estoy interesado en comprar `)

    const [data, setData] = useState([])
    const fetchData = async () => {
        const response = await axios.get(`https://localhost:8082/products${prop.endpoint}`)
        console.log(response.data)
            setData(response.data)
    };

  

    useEffect(()=>{
        fetchData();
    },[prop.endpoint])

  return (
    <div className='w-[80.8vw] flex flex-wrap flex-col md:flex-row overflow-x-auto gap-[0.5vw] py-[2vh]'>
    {
            data ? (
                data.map((producto, index) => (
                    <Link to={`/producto/${producto.id}`}>
                        <div className={` ${darkMode ? 'bg-darkCardBottom ' : 'bg-cardBottom' } w-full md:w-[13vw] h-full md:h-[45vh] flex flex-wrap md:flex-row flex-col overflow-x-auto`} key={index}>
                            <div className={` ${darkMode ? 'bg-darkCardBg ' : 'bg-cardBg' } h-[70%] w-full relative z-0`}>
                                <img src={`https://localhost:8082${producto.img_path}`} className="w-full h-full flex flex-col md:flex-row object-cover"/>
                                {producto.descuento && (
                                <div className="bg-red-500 w-[1.5vw] h-[3.5vh] text-xs text-white font-normal flex justify-center items-center flex-wrap px-[1vw] absolute top-0">
                                    {producto.descuento}%
                                </div>
                            )}
                            </div>
                            <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' } w-full h-[30%] px-[.5vw] py-[1vh]`}>
                                <div className='w-full h-full flex flex-wrap'>
                                    <h2 className='text-sm w-full'>{producto.nombre}</h2>
                                    <Link to={`/tienda/${producto.id_tienda}`} onClick={(e)=>e.stopPropagation()}>
                                        <h2 className=' w-full text-xs text-[#868686]'>{producto.tienda}</h2>
                                    </Link>
                                    {producto.id_estado == 1 ? (
                                        <h2 className=" text-xs font-medium text-red-600 w-full">En descuento</h2>
                                    ) : (
                                        <div className="w-full h-[2.5vh]"></div>
                                    )}
                                    <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' } w-full flex flex-wrap items-center justify-between`}>
                                    <h2 className={`${producto.id_estado == 1 && 'text-red-500'} text-sm font-md text-prices`}>
                                        <span >MXN$</span>
                                    {producto.id_estado === 1 ? (
                                        <>
                                            {(producto.precio * (1 - (producto.porcentaje / 100))).toFixed(2)}
                                            {' '}
                                            <s className='text-xs font-light text-slate-400'>{producto.precio}</s> 
                                        </>
                                    ) : (
                                        
                                        producto.precio
                                    )}
                                    </h2>

                                        <a
                                            href={`https://wa.me/1${producto.contacto}?text=${message}${producto.nombre}`}
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
  )
}

export default ProductSearchBody