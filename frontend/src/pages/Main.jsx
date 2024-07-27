import React from "react";
import ProductCards from "../components/ProductCards";
import { useGeneralContext } from "../contexts/GeneralContext";

import Mapbox from "../components/Mapbox";

function ProfileStore (){

    const {darkMode} = useGeneralContext();

    return(
    <>
        <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} font-light`}>
                <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')}   w-full h-[30vh]`}>
                <img className="w-full h-full object-cover" src={'https://localhost:8082/uploads/mainBanner.jpg'}/>
                </div>

            <div className="w-full py-[8vh] px-[5vw] flex md:flex-row justify-between flex-col-reverse">
                <div className=" w-full flex  flex-col md:w-[50vw]">
                    <h2 className="font-inriaSans text-[1.65rem] border-b-2 border-slate-600 px-2 py-[1vh] ">Microempresas locales - K'axlanal, directorio de comercio</h2>
                    <p className="py-2 font-inriaSans font-light italic text-justify">Ofrecemos una vista completa de todos los comerciantes locales en el area norte de Quintana Roo  una vista completa de los negocios que forman parte de nuestra comunidad. Descubre la variedad de comercios disponibles, sus ubicaciones exactas en el mapa y aprovecha la información detallada para conectar con los proveedores locales. Ya sea que busques productos específicos o simplemente quieras explorar las opciones cercanas.  ¡Explora, descubre y disfruta de la riqueza comercial de nuestra región!</p>
                </div>
                <div className="w-full  flex flex-col md:flex-row lg:w-[30vw] h-[18vw]">
                    <Mapbox endpoint='/directions'/>
                </div>
            </div>
            <div className="w-full flex px-[5vw]">
                <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} font-normal  mx-[.3vw] `}>Productos populares</h1>
                </div>
            </div>
            <ProductCards endpoint={'popular'} /> 
            <div className="w-full flex px-[5vw]">
                <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black')}font-normal  mx-[.3vw] `}>Más recientes</h1>
                </div>
            </div>
            <ProductCards endpoint={'latest'} /> 
            <div className="w-full flex px-[5vw]">
                <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black')}font-normal  mx-[.3vw] `}>Descuentos</h1>
                </div>
            </div>
            <ProductCards endpoint={'discounts'} />  
        <div className="w-full flex px-[5vw] ">
                <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                    <h1  className={` ${darkMode ? ('text-white ') : ('text-black')}font-normal  mx-[.3vw] `}>Selección K'axlanal</h1>
                </div>
            </div>
            <div className=" w-full flex flex-wrap justify-center ">
                <div className="w-[89vw] flex flex-wrap justify-between">
                    <div className= {` ${darkMode ? ('bg-darkCardBottom border-darkCardBg') : ('bg-colorBanner ')} w-[30%] h-[50vh]  flex flex-wrap`}>
                        <div className="h-[15%] w-full flex items-center px-[1.5vw]">
                            <h2 className={` ${darkMode ? ('text-white') : ('text-black ')} `}>Frutas de temporada</h2>
                        </div>
                        <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')}  w-full h-[85%]  border-t-2 border-[#4525D2]`}>
                        </div>
                    </div>

                    <div className={` ${darkMode ? ('bg-darkCardBottom border-darkCardBg') : ('bg-colorBanner ')} w-[30%] h-[50vh]  flex flex-wrap `}>
                        <div className="h-[15%] w-full flex items-center px-[1.5vw]">
                            <h2 className={` ${darkMode ? ('text-white') : ('text-black ')} `}>Artesanias populares</h2>
                        </div>
                        <div className= {` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} w-full h-[85%]  border-t-2 border-[#4525D2]`}>
                        </div>
                    </div>

                    <div className={` ${darkMode ? ('bg-darkCardBottom ') : ('bg-colorBanner ')} w-[30%] h-[50vh]  flex flex-wrap`}>
                        <div className="h-[15%] w-full flex items-center px-[1.5vw]">
                            <h2 className={` ${darkMode ? ('text-white') : ('text-black ')} `}>Comida tradicional</h2>
                        </div>
                        <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')}  w-full h-[85%]  border-t-2 border-[#4525D2]`}>
                        </div>
                    </div>

                </div>
            </div>
                
        </div>  
        
    </>
    )

}

export default ProfileStore
