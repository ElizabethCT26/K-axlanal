import React from "react";
import ProductCards from "../components/ProductCards";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ProfileStore (){
    return(
<>
<Header/>
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
                <h1 className="font-normal  mx-[.3vw] ">Seleccion K'axlanal</h1>
            </div>
        </div>
        <div className=" w-full flex flex-wrap justify-center ">
            <div className="w-[89vw] flex flex-wrap justify-between">
                <div className="w-[30%] h-[50vh] bg-[#F5F5F5] flex flex-wrap ">
                    <div className="h-[15%] w-full flex items-center px-[1.5vw]">
                        <h2>Frutas de temporada</h2>
                    </div>
                    <div className="w-full h-[85%] bg-[#D9D9D9] border-t-2 border-[#4525D2]">
                    </div>
                </div>

                <div className="w-[30%] h-[50vh] bg-[#F5F5F5] flex flex-wrap ">
                    <div className="h-[15%] w-full flex items-center px-[1.5vw]">
                        <h2>Artesanias populares</h2>
                    </div>
                    <div className="w-full h-[85%] bg-[#D9D9D9] border-t-2 border-[#4525D2]">
                    </div>
                </div>

                <div className="w-[30%] h-[50vh] bg-[#F5F5F5] flex flex-wrap ">
                    <div className="h-[15%] w-full flex items-center px-[1.5vw]">
                        <h2>Comida tradicional</h2>
                    </div>
                    <div className="w-full h-[85%] bg-[#D9D9D9] border-t-2 border-[#4525D2]">
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
