import React from 'react'

function CreateProduct() {
  return (
    <div>
        <div className='flex px-[5vw] py-[8vh] w-full' >
            <div className='bg-[#D9D9D9] justify-between border  border-b-[#341CA7] md:h-[60vh] sm:h-[20vh] md:w-[28vw] sm:w-[18vw] px-[5vw]'>
                <h4 className='text-[#ABABAB] flex justify-center items-center '>Seleccionar foto del producto</h4>
            </div>
            <div className="flex flex-col  px-[4vw] ">
                <div className="flex justify-between mt-[1.5vh]">
                    <h1 className="mx-[2v] md:w-[20vw] p-[.3vw] font-semibold">Crear un producto</h1>
                </div>
                <div >
                    <input className='bg-[#F6F6F6] md:w-[25vw] md:h-[4vh] p-[1vw] rounded-sm text-[#868686]'
                        placeholder='Escribe el titulo del producto'
                    />
                    <h4 className='border-b-[#341CA7] md:w-[25vw] border-b-2 py-[1vh]'></h4>
                </div>
                <div className='pt-[5vh] text-[#868686]'>
                        <div className='md:w-[50vw] md:h-[30vh]' >
                            <input className=' bg-[#F6F6F6] md:w-[53vw] md:h-[28vh]'
                                placeholder='Escribe la descripción del producto'
                            />
                        </div>
                    </div>
                 
                        <div className="flex py-[1vh]">
                            <h2  >Fecha de producción:</h2>
                            <label>
                                <select name='Seleccione la fecha' className='bg-[#F6F6F6] p-[1vw]  text-[#868686] text-sm md:w-[42vw] md:h-[2vh] rounded-sm'/>
                            </label>
                                            
                        </div>
                        <div className="flex ">
                                <h2 >Categoría</h2>
                                <h2 className="  pl-[5.8vw] ">:</h2>
                                <label>
                                    <select name='Seleccione la categoría' className='bg-[#F6F6F6] p-[1vw] text-[#868686] text-sm md:w-[42vw] md:h-[2vh] rounded-sm'
                                    />
                                </label>
                        </div>
                    
                    <div className="flex self-end py-[6vh] justify-around gap-[.4vw]">
                            <h2 className=" px-[1vw]">Ingrese el precio:</h2>
                            <input className='bg-[#F6F6F6] md:h-[4vh] md:w-[8vw] rounded-sm'
                                placeholder=''
                            />
                    </div>
                    <div className="flex self-end justify-around  ">
                            <button className='bg-[#70C5BB] md:w-[8vw] md:h-[4vh] rounded-sm text-white'>Guardar</button>
                    </div>
                    
                 
                    
            </div>  

        </div>
    </div>
  )
}

export default CreateProduct
