import React, { useState, useEffect } from "react";
import { useGeneralContext } from "../contexts/GeneralContext";
import axios from "axios";

function CardsVendedor(prop) {
    const {darkMode} = useGeneralContext();
    const [ data, setData ] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8082/products/${prop.endpoint}`)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(()=>{
        fetchData();
    },[])

    return (
      <div className=' font-light   '>
        {/*Aqui empiezan las cards*/}
       <div>
       <div className="flex px-[5vw] gap-[1vw]">
        {
            data.length > 0 ? (
                data.map((producto, index)=>(
                    <div className="flex flex-col bg-red-200">
                        <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  border-b border-b-[#6287AF]  w-[11vw] h-[28vh]`}>
                            <img className="w-full h-full object-cover" src={`http://localhost:8082${producto.img_path}`}/>
                        </div>
                        <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'  }   w-[11vw] h-[15vh] `}>
                                <h2 className="px-[5%] text-sm">{producto.nombre}</h2>
                                <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs ">{producto.tienda}</h3>
                            <div className="flex justify-between">
                                <h3 className={`${darkMode ? 'text-darkPrices' : 'text-prices' } text-[#2374AB] text-xs text-normal p-[2%] px-[5%]`}>MXN$ {producto.precio}</h3>
                            <div className={` ${darkMode ? 'bg-darkEdit' : 'bg-colorEdit' }  w-[2vw] h-[4vh]  rounded-md`}>
                                <h2 className="text-center">✒️</h2>
                            </div>
                            <div className={` ${darkMode ? 'bg-darkDelete' : 'bg-deleteColor' }  w-[2vw] h-[4vh] mx-[6%] rounded-md`}>
                                <img className="w-[5vw] h-[4vh]" src="https://cdn-icons-png.flaticon.com/128/3541/3541990.png"/>
                            </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (<h2> nada que ver </h2>)
        }
        </div>
       </div>

    
    </div>
    )}
export default CardsVendedor