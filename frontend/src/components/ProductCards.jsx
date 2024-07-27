import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useGeneralContext } from "../contexts/GeneralContext";

function ProductCards(prop) {


    const { darkMode } = useGeneralContext()

    const navigate = useNavigate();
    const url = `https://localhost:8082/products/${prop.endpoint}`;
    const message = encodeURIComponent(`Hola, estoy interesado en comprar `)
    const [data, setData] = useState([]);

    const empty = [{},{},{},{},{},{},{}]



    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Algo ha salido mal');
        }
    };

    useEffect(() => {
        fetchData();
    }, [prop.endpoint]);

    return (
        <div className='font-light'>
            {data.length > 0 ? (
                <div className="">
                    <div className="flex mx-[5vw] gap-[1vw]  overflow-y-auto ">
                        {data.map((product, index) => ( 
                            <Link to={`/producto/${product.id}`}>
                                <div className="flex flex-col " key={index} >
                                    <div className={` ${darkMode ? ' text-white' : 'bg-cardBg' } border-b border-b-[#6287AF] w-[44vw] md:w-[11vw] h-[28vh] relative`}>
                                        {product.id_estado == 1 && (
                                            <div className="bg-red-500 w-[1.5vw] h-[3.5vh] text-xs text-white font-normal flex justify-center items-center flex-wrap px-[1vw] absolute">
                                                {product.porcentaje}%
                                            </div>
                                        )}
                                        <img src={`https://localhost:8082${product.img_path}`} alt="" className="w-full h-full object-cover"/>
                                    </div>
                                    <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'  } w-full h-full flex flex-col md:flex-row md:w-[11vw] md:h-[15vh]`}>
                                        <h2 className="px-[5%] text-sm">{product.nombre}</h2>
                                        <Link to={`/tienda/${product.id_tienda}`} onClick={(e) => {e.stopPropagation}}>
                                            <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs">{product.tienda}</h3>
                                        </Link>
                                        {product.id_estado == 1 ? (
                                            <h2 className="px-[5%] text-xs  font-medium text-red-600">En descuento</h2>
                                        ) : (
                                            <div className="w-full h-[2.5vh]"></div>
                                        )}
                                        <div className="flex justify-between">
                                            <h3 className={`${product.id_estado == 1 && 'text-red-500'} text-[#2374AB] text-xs p-[2%] px-[5%] font-normal`}>
                                                MXN$ {product.id_estado == 1 ? (
                                                <>
                                                    {(product.precio * (1 - (product.porcentaje / 100))).toFixed(2)}
                                                    {' '}
                                                    <s className='text-xs font-light text-slate-400'>{product.precio}</s> 
                                                </>
                                                ) : (product.precio)}
                                            </h3>
                                            <a
                                                href={`https://wa.me/1${product.contacto}?text=${message}${product.nombre}`}
                                                target="_blank"
                                                className="bg-[#70C5BB] w-[2vw] h-[4vh] mx-[6%] rounded-md flex justify-center items-center"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                💬
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                
            ) : (
                <div>
                <div className="flex mx-[5vw] gap-[1vw] overflow-y-auto">
{            empty.map((empty, index) => (
                <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } flex flex-col  bg-[#eaeaea] `} key={index}>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } bg-[#D9D9D9] border-b animate-pulse  border-b-[#6287AF] w-[11vw] h-[28vh]`}>
                    </div>
                        <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' } bg-[#F5F5F5] animate-pulse  w-[11vw] h-[15vh]`}>
                            <h2 className="px-[5%] text-sm"></h2>
                            <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs"></h3>
                            <div className="flex justify-between">
                                    <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%] font-normal"></h3>
                            </div>
                        </div>
                    </div>
            ))}

            </div>
            </div>
            )}
        </div>
    );
}

export default ProductCards;
