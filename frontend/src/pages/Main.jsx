import React from "react";
import ProductCards from "../components/ProductCards";
function ProfileStore (){
    return(
<>
    <div className="font-light">
            <div className="bg-[#D9D9D9] w-full h-[30vh]">
                <h2 className="text-center">IMAGEN</h2>
            </div>

        <div className="w-full py-[8vh] px-[5vw] flex justify-between bg-blue-200">
            Aqui ira el carrusel
        </div>
        <div className="w-full flex px-[5vw]">
            <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Productos populares</h1>
            </div>
        </div>
        <ProductCards/> 
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
                <h1 className="font-normal  mx-[.3vw] ">Seleccion del vendedor</h1>
            </div>
        </div>
        <div className=" w-full flex flex-wrap justify-center ">
            <div className="w-[89vw] flex flex-wrap justify-between">
                <div className="flex flex-wrap justify-between w-[31vw]">
                    <div className="bg-[#D9D9D9] w-[31vw] h-[35vh]">      
                    </div>
                    <div className="h-[26vh] w-[14.7vw] bg-[#D9D9D9] self-end">  
                    
                    </div>
                    <div className="h-[26vh] w-[14.7vw] bg-[#D9D9D9] self-end">  
                    
                    </div>
                    
                </div>
                <div className="flex flex-wrap justify-between w-[56vw] gap-3">
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                    <div className="bg-[#D9D9D9] w-[13vw] h-[20vh]">        
                    </div>
                </div>
            </div>
        </div>
            
    </div>  
</>
    )

}

export default ProfileStore
