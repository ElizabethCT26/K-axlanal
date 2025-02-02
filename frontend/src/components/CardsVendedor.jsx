import React, { useState, useEffect } from "react";
import { useGeneralContext } from "../contexts/GeneralContext";
import axios from "axios";

function CardsVendedor(prop) {
    const {darkMode} = useGeneralContext();
    const [ data, setData ] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:8082/products/${prop.endpoint}`)
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
       <div className="flex flex-wrap px-[5vw] gap-[1vw]">
        {
            data.length > 0 ? (
                data.map((producto, index)=>(
                    <div className="flex flex-col bg-red-200">
                        <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  border-b border-b-[#6287AF]  w-[11vw] h-[28vh]`}>
                            <img className="w-full h-full object-cover" src={`https://localhost:8082${producto.img_path}`}/>
                        </div>
                        <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'  }   w-[11vw] h-[15vh] `}>
                                <h2 className="px-[5%] text-sm">{producto.nombre}</h2>
                                <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs ">{producto.tienda}</h3>
                            <div className="flex justify-between">
                                <h3 className={`${darkMode ? 'text-darkPrices' : 'text-prices' } text-[#2374AB] text-xs text-normal p-[2%] px-[5%]`}>MXN$ {producto.precio}</h3>
                            <div className={` ${darkMode ? 'bg-darkEdit' : 'bg-colorEdit' }  w-[2vw] h-[4vh]  rounded-md`}>
                                <button>
                                    <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="21" viewBox="0,0,256,256">
                                            <g fill="#ffffff" fill-rule="nonzero">
                                                <g transform="scale(5.12,5.12)">
                                                    <path d="M43.125,2c-1.24609,0 -2.48828,0.48828 -3.4375,1.4375l-0.8125,0.8125l6.875,6.875c-0.00391,0.00391 0.8125,-0.8125 0.8125,-0.8125c1.90234,-1.90234 1.89844,-4.97656 0,-6.875c-0.95312,-0.94922 -2.19141,-1.4375 -3.4375,-1.4375zM37.34375,6.03125c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-32.4375,32.46875c-0.12891,0.11719 -0.22656,0.26953 -0.28125,0.4375l-2,7.5c-0.08984,0.34375 0.01172,0.70703 0.26172,0.95703c0.25,0.25 0.61328,0.35156 0.95703,0.26172l7.5,-2c0.16797,-0.05469 0.32031,-0.15234 0.4375,-0.28125l32.46875,-32.4375c0.39844,-0.38672 0.40234,-1.02344 0.01563,-1.42187c-0.38672,-0.39844 -1.02344,-0.40234 -1.42187,-0.01562l-32.28125,32.28125l-4.0625,-4.0625l32.28125,-32.28125c0.30078,-0.28906 0.39063,-0.73828 0.22266,-1.12109c-0.16797,-0.38281 -0.55469,-0.62109 -0.97266,-0.59766c-0.03125,0 -0.0625,0 -0.09375,0z"></path>
                                                </g>
                                            </g>
                                        </svg>
                                </button>
                            </div>
                            <div className={` ${darkMode ? 'bg-darkDelete' : 'bg-deleteColor' }  w-[2vw] h-[4vh] mx-[6%] rounded-md`}>
                               <button>
                               <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="21" viewBox="0,0,256,256">
                                            <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" style={{mixBlendMode: 'normal'}}>
                                            <g transform="scale(5.33333,5.33333)">
                                                <path d="M22,1c-2.19733,0 -4,1.80267 -4,4v1h-9c-1.64446,0 -3,1.35443 -3,3v2c0,1.64557 1.35554,3 3,3h24c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-24c-0.56354,0 -1,-0.43557 -1,-1v-2c0,-0.56443 0.43646,-1 1,-1h10c0.55226,-0.00006 0.99994,-0.44774 1,-1v-2c0,-1.11667 0.88333,-2 2,-2h4c1.11667,0 2,0.88333 2,2v2c0.00006,0.55226 0.44774,0.99994 1,1h10c0.56354,0 1,0.43557 1,1v2c0,0.56443 -0.43646,1 -1,1h-1c-0.26589,0.00002 -0.52082,0.10593 -0.70846,0.2943c-0.18764,0.18838 -0.29255,0.44372 -0.29154,0.7096l0.10547,27.07617c-0.04455,1.63535 -1.36204,2.91992 -2.99805,2.91992h-20.08203c-1.67641,0 -3.01058,-1.3432 -3,-3.01953c0.00001,-0.00195 0.00001,-0.00391 0,-0.00586l-0.02539,-22.97656c0.00435,-0.36061 -0.18579,-0.69564 -0.49763,-0.8768c-0.31183,-0.18117 -0.69705,-0.18042 -1.00817,0.00197c-0.31112,0.18238 -0.49995,0.51815 -0.4942,0.87874l0.02539,22.9668c-0.01742,2.76167 2.23841,5.03125 5,5.03125h20.08203c2.69799,0 4.92459,-2.16859 4.99805,-4.86523c0.00016,-0.01042 0.00016,-0.02083 0,-0.03125l-0.10156,-26.10547c1.64235,-0.00257 2.99609,-1.35404 2.99609,-2.99805v-2c0,-1.64557 -1.35554,-3 -3,-3h-9v-1c0,-2.19733 -1.80267,-4 -4,-4zM16.98438,19.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v17c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-17c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM23.98438,19.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v17c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-17c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM30.98438,19.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v17c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-17c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212z"></path>
                                            </g>
                                            </g>
                                        </svg>
                               </button>
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