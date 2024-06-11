import React from "react";
import ProductCards from "../../components/ProductCards";

function PagesProduct() {
    return (
      <div className=' font-light   '>
        <div className="flex  flex-row justify-center  my-[3%] ">
            <div className=" bg-[#D9D9D9] w-[49vw] h-[45vh]  ">
                <h2 className="text-center">imagen</h2>
            </div>
            <div className="flex flex-col  ">
                <div className="flex justify-between my-[1.5vh]">
                    <h1 className="border-b-[#341CA7] border-b-2 mx-[2vw] w-[20vw] p-[.3vw] font-normal">Selección especial - Verano fresco!!!</h1>
                    <div >
                        <h4>❤️</h4>
                    </div>
                </div>
           
                <div className="h-[28vh]">
                    <h2 className="text-[#868686] px-[5%] w-[40vw]">Frutas de temporada a precios extraordinarios!!</h2>
                </div>
                <div className="flex self-end justify-around gap-[.4vw]">
                        <h2 className="text-[#2374AB] border-b-[#70C5BB] border-b-2  px-[1vw]">$500</h2>
                    <div className="bg-[#70C5BB] w-[8vw] text-[#FFFFFF] rounded-sm text-center">
                        <h2>💬Contactar</h2>
                    </div>
                </div>
            </div>  
            <ProductCards/> 
            
        </div>
       
      
    </div>
    )}
export default PagesProduct