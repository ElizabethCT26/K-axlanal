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
    <div className='w-[80.8vw] flex flex-wrap flex-col md:flex-row overflow-x-auto gap-[0.5vw] gap-y-[5vh] py-[2vh]'>
    {
            data ? (
                data.map((producto, index) => (
                    <Link to={`/producto/${producto.id}/${(producto.nombre).trim().replaceAll(' ', '-')}`}>
                        <div className={` ${darkMode ? 'bg-darkCardBottom ' : 'bg-cardBottom' }  w-full md:w-[13vw]  h-full md:h-[45vh] flex flex-wrap md:flex-row flex-col overflow-x-auto`} key={index}>
                            <div className={` ${darkMode ? 'bg-darkCardBg ' : 'bg-cardBg' } h-[70%] w-full relative z-0`}>
                                <img src={`https://localhost:8082${producto.img_path}`} className="w-full h-full  flex flex-col md:flex-row object-cover"/>
                                {producto.descuento && (
                                <div className=" w-[1.5vw] h-[3.5vh] text-xs text-white font-normal flex justify-center items-center flex-wrap px-[1vw] absolute top-0">
                                    {producto.descuento}%
                                </div>
                            )}
                            </div>
                            <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' }  w-full h-[30%] px-[.5vw] py-[1vh]`}>
                                <div className='  w-full h-full flex flex-wrap'>
                                    <h2 className='  text-sm w-full'>{producto.nombre}</h2>
                                    <Link to={`/tienda/${producto.id_tienda}/${(producto.tienda).trim().replaceAll(' ', '-')}`} onClick={(e)=>e.stopPropagation()}>
                                        <h2 className=' w-full text-xs text-[#868686]'>{producto.tienda}</h2>
                                    </Link>
                                    {producto.id_estado == 1 ? (
                                        <h2 className=" text-xs font-medium text-red-600 w-full">En descuento</h2>
                                    ) : (
                                        <div className="w-full h-[2.5vh]"></div>
                                    )}
                                    <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' }  w-full flex flex-wrap items-center justify-between`}>
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
                                            className=" w-[1.7vw] h-[3.2vh] rounded-md flex justify-center items-center"
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

export default ProductSearchBody