import React, { useState, useEffect } from "react";
import axios from 'axios';

function ProductCards(prop) {
    const darkMode = true;
    const url = `http://localhost:8082/products/${prop.endpoint}`;
    const [data, setData] = useState([]);

    const empty = [{},{},{},{},{},{},{}]

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='font-light'>
            {data.length > 0 ? (
                <div>
                    <div className="flex mx-[5vw] gap-[1vw] overflow-y-auto">
                        {data.map((product, index) => (
                            <div className="flex flex-col bg-black" key={index}>
                                <div className=" w-full h-10 text-white">
                                    <img src={`http://localhost:8082${product.img_path}`} alt="" className="w-full h-full"/> {/* Basicamente para conseguir las imagenes, las jala del servidor */}
                                </div>
                                <div className={` ${darkMode ? 'bg- text-white' : 'bg-cardBg' }"bg-[#D9D9D9] border-b border-b-[#6287AF] w-[11vw] h-[28vh]`}>
                                    {product.descuento && (
                                        <div className="bg-red-500 w-[1.5vw] h-[3.5vh] text-xs text-white font-normal flex justify-center items-center flex-wrap px-[1vw]">
                                            {product.descuento}%
                                        </div>
                                    )}
                                </div>
                                <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' }  w-[11vw] h-[15vh]`}>
                                    <h2 className="px-[5%] text-sm">{product.nombre}</h2>
                                    <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs">{product.tienda}</h3>
                                    {product.descuento ? (
                                        <h2 className="px-[5%] text-xs font-medium text-red-600">En descuento</h2>
                                    ) : (
                                        <div className="w-full h-[2.5vh]"></div>
                                    )}
                                    <div className="flex justify-between">
                                        <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%] font-normal">
                                            MXN$ {product.descuento ? (product.precio * (1 - (product.descuento / 100))).toFixed(2) : product.precio}
                                        </h3>
                                        <div className="bg-[#70C5BB] w-[2vw] h-[4vh] mx-[6%] rounded-md">
                                            <h2 className="text-center">💬</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                <div className="flex mx-[5vw] gap-[1vw] overflow-y-auto">
{            empty.map(() => (


                        
                            <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } flex flex-col  bg-[#eaeaea] `} >
                                <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } bg-[#D9D9D9] border-b animate-pulse  border-b-[#6287AF] w-[11vw] h-[28vh]`}>

                                </div>
                                <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom' } bg-[#F5F5F5] animate-pulse  w-[11vw] h-[15vh]`}>
                                    <h2 className="px-[5%] text-sm"></h2>
                                    <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs"></h3>

                                    <div className="flex justify-between">
                                        <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%] font-normal">
                                           
                                        </h3>

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
