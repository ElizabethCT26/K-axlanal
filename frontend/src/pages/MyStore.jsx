import React, { useState } from "react";
import CardsVendedor from "../components/CardsVendedor";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyStore (){

    const oscuro = useState(true)

    return(
<>
<Header/>
    <div className="font-light">
            <div className={` w-full h-[30vh] ${oscuro? '' : 'bg-[#D9D9D9]'}`}>
                <h2 className="text-center">IMAGEN</h2>
            </div>

        <div className="w-full py-[8vh] px-[5vw] flex justify-between">
                <div className="bg-[#D9D9D9] md:w-[37vw] md:h-[43vh] ">
                    <h2 className="text-centfuller">IMAGEN</h2>
                </div>
            <div className="p-[5vh] md:w-[50vw]">
                {/*Cambiar el font por inter */}
            <div className=" flex justify-between ">
                <div className="md:w-[14vw]">
                    <h2 className="text-4xl font-inter border-b-2 border-b-[#1EBEE1] px-[.5vw] py-1">Palazzo's</h2>
                    <h2 className="border-b border-b-[#1EBEE1] p-[0.5%]"></h2>
                    <h2 className="border-b-2 border-b-[#1EBEE1] p-[0.6%]"></h2>
                </div>
                <div>
                <button></button>
                    <button className="bg-[#304D6D] text-white px-3 py-1 rounded-sm">
                    Editar perfil
                    </button>
                </div>
            </div>
                <div className="md:w-[30vw] text-[#868686] py-[2vh]">
                    <p>Los mejores productos de apicultura artesanal en Quintana Roo. 
                    Nuestro compromiso es ofrecerte productos naturales y de 
                    la más alta calidad, directamente de nuestras colmenas a tu mesa.</p>
                </div>
                <div className="md:w-[30vw] text-sm text-[#110952] py-[2vh] font-normal">
                    <h2>📍Calle Margaritas #123, Colonia Centro,Cancún, Quintana Roo.</h2>
                </div>
            </div>
                
        </div>
        <div className="w-full justify-between flex px-[5vw]">
           
            <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Productos populares</h1>
            </div>
            <div className="flex justify-between">
                 <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
            </div>
            
        </div>
        <CardsVendedor/> 
        <div className="w-full justify-between flex px-[5vw]">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Mejor vendidos</h1>
            </div>
            <div className="flex justify-between">
                 <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
            </div>
        </div>
        <CardsVendedor/> 
        <div className="w-full justify-between flex px-[5vw]">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Descuentos</h1>
            </div>
            <div className="flex justify-between">
                 <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
            </div>
        </div>
        <CardsVendedor/>  
       <div className="w-full justify-between flex px-[5vw] ">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Seleccion del vendedor</h1>
            </div>
            <div className="flex justify-between">
                 <h2 className="text-2xl text-[#00BFB4] font-bold">+</h2>
            </div>
        </div>
        <div className=" w-full flex flex-wrap justify-center ">
            <div className="w-[89vw] flex flex-wrap justify-between">
                <div className="flex flex-wrap justify-between md:w-[31vw]">
                    <div className="bg-[#D9D9D9] md:w-[31vw] md:h-[35vh]">      
                    </div>
                    <div className="md:h-[26vh] md:w-[14.7vw] bg-[#D9D9D9] self-end">  
                    
                    </div>
                    <div className="md:h-[26vh] md:w-[14.7vw] bg-[#D9D9D9] self-end">  
                    
                    </div>
                    
                </div>
                <div className="flex flex-wrap justify-between w-[56vw] gap-3">
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] md:w-[13vw] md:h-[20vh]">        
                    </div>
                </div>
            </div>
        </div>
            
    </div>  
    <Footer/>
</>
    )

}

export default MyStore
