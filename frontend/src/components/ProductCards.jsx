import React from "react";

function ProductCards() {
    return (
      <div className='min-h-screen font-light   '>
        <div className="flex  flex-row justify-center  my-[3%] ">
            <div className=" bg-[#D9D9D9] w-[25vw] h-[40vh]  ">
                <h2 className="text-center">imagen</h2>
            </div>
            <div className="flex flex-col  ">
                <div className="flex justify-between my-[1.5vh]">
                    <h1 className="border-b-[#341CA7] border-b-2 mx-[2vw] w-[20vw] p-[.3vw] font-normal">Seleccion especial - Verano fresco!!!</h1>
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
            
        </div>
        <div className="w-full flex px-[16.5vw]">
            <div className="mb-[1%] font-normal w-[14vw] border-b-2 border-b-[#341CA7]  py-[.4vh]">
                <h1 className="font-normal  mx-[.3vw] ">Productos Relacionados</h1>
            </div>
        </div>
       <div className="">
       <div className="flex justify-center ">
            <div className="flex flex-col mx-[1%]">
                <div className="bg-[#D9D9D9] border-b border-b-[#6287AF]  w-[15vw] h-[28vh]">
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className="bg-[#F5F5F5]   w-[15vw] h-[16vh]">
                        <h2 className="px-[5%]">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-sm ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-sm p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className="bg-[#70C5BB] w-[2vw] h-[4vh] mx-[6%] rounded-md">
                        <h2 className="text-center">💬</h2>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-[1%]">
                <div className="bg-[#D9D9D9] border-b border-b-[#6287AF]  w-[15vw] h-[28vh]">
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className="bg-[#F5F5F5]   w-[15vw] h-[16vh]">
                        <h2 className="px-[5%]">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-sm ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-sm p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className="bg-[#70C5BB] w-[2vw] h-[4vh] mx-[6%] rounded-md">
                        <h2 className="text-center">💬</h2>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-[1%]">
                <div className="bg-[#D9D9D9] border-b border-b-[#6287AF]  w-[15vw] h-[28vh]">
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className="bg-[#F5F5F5]   w-[15vw] h-[16vh] ">
                        <h2 className="px-[5%]">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-sm ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-sm p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className="bg-[#70C5BB] w-[2vw] h-[4vh] mx-[6%] rounded-md">
                        <h2 className="text-center">💬</h2>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-[1%] ">
                <div className="bg-[#D9D9D9] border-b border-b-[#6287AF]  w-[15vw] h-[28vh]">
                    <h2 className="text-center">IMAGEN</h2>
                </div>
                <div className="bg-[#F5F5F5]   w-[15vw] h-[16vh]">
                        <h2 className="px-[5%]">Nombre del producto</h2>
                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-sm ">Categoria del producto por nombre de la tienda</h3>
                    <div className="flex justify-between">
                        <h3 className="text-[#2374AB] text-sm p-[2%] px-[5%]">MXN$ 200.00</h3>
                    <div className="bg-[#70C5BB] w-[2vw] h-[4vh] mx-[6%] rounded-md">
                        <h2 className="text-center">💬</h2>
                    </div>
                    </div>
                </div>
            </div>
            
            
           
        </div>
       </div>
        
        
      </div>
      
    )
  }
  
  export default ProductCards
  