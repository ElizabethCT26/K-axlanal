import React from "react";
import ProductCards from "../components/ProductCards";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PagesProduct() {
    return (
        <>
            <Header/>
     
      <div className=' font-light   '>
        <div className="flex  flex-row justify-center  my-[3%] ">
            <div className=" bg-[#D9D9D9] md:w-[49vw] md:h-[45vh]  ">
                <h2 className="text-center">imagen</h2>
            </div>
            <div className="flex flex-col  ">
                <div className="flex justify-between my-[1.5vh]">
                    <h1 className="border-b-[#341CA7] border-b-2 mx-[2vw] md:w-[20vw] p-[.3vw] font-normal">Selección especial - Verano fresco!!!</h1>
                    <div >
                        <h4>❤️</h4>
                    </div>
                </div>
           
                <div className="md:h-[28vh]">
                    <h2 className="text-[#868686] px-[5%] md:w-[40vw]">Frutas de temporada a precios extraordinarios!!</h2>
                </div>
                <div className="flex self-end justify-around gap-[.4vw]">
                        <h2 className="text-[#2374AB] border-b-[#70C5BB] border-b-2  px-[1vw]">$500</h2>
                    <div className="bg-[#70C5BB] md:w-[8vw] text-[#FFFFFF] rounded-md text-center">
                        <button>💬Contactar</button>
                    </div>
                </div>
            </div>  
          
            
        </div>
       {/*Importacion de cards */}
        <div className="w-full flex px-[5vw]">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Productos relacionados</h1>
            </div>
            
        </div>
        <ProductCards/> 
        <div className="w-full flex pt-[2%] px-[5vw]">
            <div className="mb-[1%] font-normal md:w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Más de esta tienda</h1>
            </div>
            
        </div>
        <ProductCards/> 
    </div>
    <Footer/>
    </>
    )}
export default PagesProduct