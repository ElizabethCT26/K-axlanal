import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

function Products() {
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState([])
    const message = encodeURIComponent(`Hola, estoy interesado en comprar `)
    const toggleVisibility = () => {
    setIsVisible(!isVisible);
    };

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8082/products')
        console.log(response.data)
            setData(response.data)
    }

    useEffect(()=>{
        fetchData();
    },[])

  return (
    <>
    <Header />
    <div className=' flex flex-wrap '>
        <div className='bg-[#FAFAFA] h-[80vh] w-[12vw] px-[2vw] py-[3vh] flex flex-wrap gap-y-[2vh] flex-col border-r-[.2vw] border-[#EEEEEE]'>
            <ul className='flex flex-wrap gap-y-[1vh] flex-col'>
                    <li className='text-sm'>• Más populares</li>
                    <li className='text-sm'>• Más recientes</li>
                    <li className='text-sm'>• Mayor a 500</li>
                    <li className='text-sm'>• Menor a 500</li>
            </ul>            
                <div className=''>
                    <h2 className='text-sm' onClick={toggleVisibility}>{isVisible? '▼' : '►'} Apicultura</h2>
                    {isVisible && (
                        <ul>
                            <li>Miel</li>
                            <li>Jalea real</li>
                            <li>Propoleo</li>
                            <li>Cera de abejas</li>
                        </ul>
                        
                    )}
                </div>
        </div>
            <div className='flex flex-wrap w-[86vw] bg-white  px-[3vw] pt-[4vh]'>
                <div className=' w-full h-full gap-[0.5vh]'>
                    <div className='w-full  h-[6vh] flex items-center '>
                        <h2>Productos relacionados con: "Oa"</h2>
                    </div>
                    <div className='w-[80.8vw] flex flex-wrap gap-[0.5vw] py-[2vh]'>
                    {
                            data ? (
                                data.map((producto, index) => (
                                    <div className='bg-cardBottom w-[13vw] h-[45vh] flex flex-wrap flex-col ' key={index}>
                                        <div className='bg-cardBg h-[70%] w-full relative z-0'>
                                            <img src={`http://localhost:8082${producto.img_path}`} className="w-full h-full object-cover"/>
                                            {producto.descuento && (
                                            <div className="bg-red-500 w-[1.5vw] h-[3.5vh] text-xs text-white font-normal flex justify-center items-center flex-wrap px-[1vw] absolute top-0">
                                                {producto.descuento}%
                                            </div>
                                        )}
                                        </div>
                                        <div className='bg-cardBottom w-full h-[30%] px-[.5vw] py-[1vh]'>
                                            <div className='w-full h-full flex flex-wrap'>
                                                <h2 className='text-sm w-full'>{producto.nombre}</h2>
                                                {producto.descuento ? (
                                                    <h2 className=" text-xs font-medium text-red-600 w-full">En descuento</h2>
                                                ) : (
                                                    <div className="w-full h-[2.5vh]"></div>
                                                )}
                                                <div className='w-full flex flex-wrap items-center justify-between'>
                                                    <h2 className='text-sm font-md text-prices'>MXN$ {producto.descuento ? (producto.precio * (1 - (producto.descuento / 100))).toFixed(2) : producto.precio}</h2>
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
                                ))
                            ) : (<h2>nada</h2>)
                        }
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
    );
}

export default Products;
