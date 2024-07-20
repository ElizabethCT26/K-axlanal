import React from "react";
import ProductCards from "../components/ProductCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useGeneralContext } from "../contexts/GeneralContext";

import Mapbox from "../components/Mapbox";

function ProfileStore (){

    const {darkMode} = useGeneralContext();

    return(
<>
<Header/>


    <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} font-light`}>
            <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')}   w-full h-[30vh]`}>
            <img className="w-full h-full object-cover" src={'http://localhost:8082/uploads/mainBanner.jpg'}/>
            </div>

        <div className="w-full py-[8vh] px-[5vw] flex justify-between bg-blue-200">
            Aqui ira el carrusel
            <div className="w-[28vw] h-[18vw]">
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
    <Footer/>
</>
    )

}

export default ProfileStore
