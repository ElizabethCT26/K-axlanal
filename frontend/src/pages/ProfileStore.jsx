import React from "react";
import ProductCards from "../components/ProductCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useGeneralContext } from "../contexts/GeneralContext";

function ProfileStore (){

    const id = 1;
    const {darkMode} = useGeneralContext();

    return(
<>
<Header/>
    <div className={`${darkMode ? 'bg-darkMainBackground text-white' : 'bg-cardBottom'} font-light`}>
            <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-full h-[30vh]`}>
                <h2 className="text-center">IMAGEN</h2>
            </div>

        <div className="w-full py-[8vh] px-[5vw] flex justify-between">
        
                <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[37vw] h-[43vh] `}>
                    <h2 className="text-centfuller">IMAGEN</h2>
                </div>
            <div className="p-[5vh] w-[50vw]">
                {/*Cambiar el font por inter */}
            <div className=" flex justify-between ">
                <div className="w-[14vw]">
                    <h2 className="text-4xl font-inter border-b-2 border-b-[#1EBEE1] px-[.5vw] py-1">Palazzo's</h2>
                    <h2 className="border-b border-b-[#1EBEE1] p-[0.5%]"></h2>
                    <h2 className="border-b-2 border-b-[#1EBEE1] p-[0.6%]"></h2>
                </div>
                <div>
                <button></button>
                    <button className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-colorBottom' } text-white px-3 py-1 rounded-md`}>
                    💬Contactar
                    </button>
                </div>
            </div>
                <div className="w-[30vw] text-[#868686] py-[2vh]">
                    <p>Los mejores productos de apicultura artesanal en Quintana Roo. 
                    Nuestro compromiso es ofrecerte productos naturales y de 
                    la más alta calidad, directamente de nuestras colmenas a tu mesa.</p>
                </div>
                <div className={`${darkMode ? ' text-white' : 'bg-cardBottom'} w-[30vw] text-sm text-[#110952] py-[2vh] font-normal`}>
                    <h2>📍Calle Margaritas #123, Colonia Centro,Cancún, Quintana Roo.</h2>
                </div>
            </div>
                
        </div>
        <div className="w-full flex px-[5vw]">
            <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Productos populares</h1>
            </div>
        </div>
        <ProductCards endpoint={`popular/${id}`}/> 
        <div className="w-full flex px-[5vw]">
            <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Mejor vendidos</h1>
            </div>
        </div>
        <ProductCards/> 
        <div className="w-full flex px-[5vw]">
            <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Descuentos</h1>
            </div>
        </div>
        <ProductCards/>  
       <div className="w-full flex px-[5vw] ">
            <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Selección del vendedor</h1>
            </div>
        </div>
        <div className=" w-full flex flex-wrap justify-center ">
            <div className="w-[89vw] flex flex-wrap justify-between">
                <div className="flex flex-wrap justify-between w-[31vw]">
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[31vw] h-[35vh]`}>      
                    </div>
                    <div className= {` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } h-[26vh] w-[14.7vw] self-end`}>  
                    
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } h-[26vh] w-[14.7vw]  self-end`}>  
                    
                    </div>
                    
                </div>
                <div className="flex flex-wrap justify-between w-[56vw]  gap-3">
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
                    </div>
                    <div className={` ${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg' } w-[13vw] h-[20vh]`}>        
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
