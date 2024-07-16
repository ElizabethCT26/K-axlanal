import React from "react";
import { useGeneralContext } from "../contexts/GeneralContext";

function CardsVendedor() {
    const {darkMode} = useGeneralContext();
    return (
      <div className=' font-light   '>
        {/*Aqui empiezan las cards*/}
       <div>
       <div className="flex justify-center  ">
            <div className="flex flex-col mx-[1%]">
                <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  border-b border-b-[#6287AF]  w-[11vw] h-[28vh]`}>
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'  }   w-[11vw] h-[15vh] `}>
                        <h2 className="px-[5%] text-sm">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className={` ${darkMode ? 'bg-darkEdit' : 'bg-colorEdit' }  w-[2vw] h-[4vh]  rounded-md`}>
                        <h2 className="text-center">✒️</h2>
                    </div>
                    <div className={` ${darkMode ? 'bg-darkDelete' : 'bg-deleteColor' }  w-[2vw] h-[4vh] mx-[6%] rounded-md`}>
                        <img className="w-[5vw] h-[4vh]" src="https://cdn-icons-png.flaticon.com/128/3541/3541990.png"/>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-[1%]">
                <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } border-b border-b-[#6287AF]  w-[11vw] h-[28vh]`}>
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'  }   w-[11vw] h-[15vh] `}>
                        <h2 className="px-[5%] text-sm">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className={` ${darkMode ? 'bg-darkEdit' : 'bg-colorEdit' }  w-[2vw] h-[4vh]  rounded-md`}>
                        <h2 className="text-center">✒️</h2>
                    </div>
                    <div className={` ${darkMode ? 'bg-darkDelete' : 'bg-deleteColor' } w-[2vw] h-[4vh] mx-[6%] rounded-md`}>
                        <img className="w-[5vw] h-[4vh]" src="https://cdn-icons-png.flaticon.com/128/3541/3541990.png"/>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-[1%]">
                <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  border-b border-b-[#6287AF]  w-[11vw] h-[28vh]`}>
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'  }  w-[11vw] h-[15vh] `}>
                        <h2 className="px-[5%] text-sm">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className={` ${darkMode ? 'bg-darkEdit' : 'bg-colorEdit' }  w-[2vw] h-[4vh]  rounded-md`}>
                        <h2 className="text-center">✒️</h2>
                    </div>
                    <div className={` ${darkMode ? 'bg-darkDelete' : 'bg-deleteColor' } w-[2vw] h-[4vh] mx-[6%] rounded-md`}>
                        <img className="w-[5vw] h-[4vh]" src="https://cdn-icons-png.flaticon.com/128/3541/3541990.png"/>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-[1%]">
                <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  border-b border-b-[#6287AF]  w-[11vw] h-[28vh]`}>
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'  }   w-[11vw] h-[15vh] `}>
                        <h2 className="px-[5%] text-sm">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className={` ${darkMode ? 'bg-darkEdit' : 'bg-colorEdit' }  w-[2vw] h-[4vh]  rounded-md`}>
                        <h2 className="text-center">✒️</h2>
                    </div>
                    <div className={` ${darkMode ? 'bg-darkDelete' : 'bg-deleteColor' } w-[2vw] h-[4vh] mx-[6%] rounded-md`}>
                        <img className="w-[5vw] h-[4vh]" src="https://cdn-icons-png.flaticon.com/128/3541/3541990.png"/>
                    </div>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col mx-[1%]">
                <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } border-b border-b-[#6287AF]  w-[11vw] h-[28vh]`}>
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'  }   w-[11vw] h-[15vh] `}>
                        <h2 className="px-[5%] text-sm">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className={` ${darkMode ? 'bg-darkEdit' : 'bg-colorEdit' }  w-[2vw] h-[4vh]  rounded-md`}>
                        <h2 className="text-center">✒️</h2>
                    </div>
                    <div className={` ${darkMode ? 'bg-darkDelete' : 'bg-deleteColor' } w-[2vw] h-[4vh] mx-[6%] rounded-md`}>
                        <img className="w-[5vw] h-[4vh]" src="https://cdn-icons-png.flaticon.com/128/3541/3541990.png"/>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-[1%]">
                <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' }  border-b border-b-[#6287AF]  w-[11vw] h-[28vh]`}>
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'  }   w-[11vw] h-[15vh] `}>
                        <h2 className="px-[5%] text-sm">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className={` ${darkMode ? 'bg-darkEdit' : 'bg-colorEdit' }  w-[2vw] h-[4vh]  rounded-md`}>
                        <h2 className="text-center">✒️</h2>
                    </div>
                    <div className={` ${darkMode ? 'bg-darkDelete' : 'bg-deleteColor' } w-[2vw] h-[4vh] mx-[6%] rounded-md`}>
                        <img className="w-[5vw] h-[4vh]" src="https://cdn-icons-png.flaticon.com/128/3541/3541990.png"/>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-[1%]">
                <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } border-b border-b-[#6287AF]  w-[11vw] h-[28vh]`}>
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className={` ${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'  }   w-[11vw] h-[15vh] `}>
                        <h2 className="px-[5%] text-sm">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className={` ${darkMode ? 'bg-darkEdit' : 'bg-colorEdit' } w-[2vw] h-[4vh]  rounded-md`}>
                        <h2 className="text-center">✒️</h2>
                    </div>
                    <div className={` ${darkMode ? 'bg-darkDelete' : 'bg-deleteColor' } w-[2vw] h-[4vh] mx-[6%] rounded-md`}>
                        <img className="w-[5vw] h-[4vh]" src="https://cdn-icons-png.flaticon.com/128/3541/3541990.png"/>
                    </div>
                    </div>
                </div>
            </div>
     
        </div>
       </div>

    
    </div>
    )}
export default CardsVendedor