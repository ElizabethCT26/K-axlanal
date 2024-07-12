import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function CreateProduct() {

    const [dataForm, setDataForm] = useState();

    const [data, setData] = useState({
        nombre: '',
        precio: '',
        cantidad: '',
        id_tienda: '',
        id_categoria: ''
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data, [name]: value
        })
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()      
        console.log(data)
    }

  return (
    <>
    <Header/>
    <div>
        <div className='flex px-[5vw] py-[8vh] w-full' >
            <div className='bg-[#D9D9D9] justify-between border  border-b-[#341CA7] md:h-[60vh] sm:h-[10vh] md:w-[28vw] sm:w-[18vw] px-[5vw]'>
                <h4 className='text-[#ABABAB] flex justify-center items-center '>Seleccionar foto del producto</h4>
            </div>
            <form className="flex flex-col  px-[4vw] " onSubmit={handleSubmit}>
                <div className="flex justify-between mt-[1.5vh]">
                    <h1 className="mx-[2v] md:w-[20vw] p-[.3vw] font-semibold">Crear un producto</h1>
                </div>
                <div >
                    <input className='bg-[#F6F6F6] md:w-[25vw] md:h-[4vh] p-[1vw] rounded-sm text-[#868686]'
                        placeholder='Escribe el titulo del producto'
                        name='nombre'
                        value={data.nombre}
                        onChange={handleInputChange}
                    />
                    <h4 className='border-b-[#341CA7] md:w-[25vw] border-b-2 py-[1vh]'></h4>
                </div>
                <div className='pt-[5vh] text-[#868686]'>
                        <div className='md:w-[50vw] md:h-[30vh]' >
                            <textarea className=' bg-[#F6F6F6] md:w-[53vw] md:h-[28vh] p-2 capitalize'
                                placeholder='Escribe la descripción del producto'
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex ">
                                <h2 >Categoría:</h2>
                                <label>
                                    <select name='Seleccione la categoría' className='bg-[#F6F6F6] p-[1vw] text-[#868686] text-sm md:w-[48vw] md:h-[2vh] rounded-sm'
                                    />
                                </label>
                        </div>
                 
                      <div className='flex justify-between'>
                        <div className="flex py-[1vh]">
                                <h2 className='pr-[1.8vw]'  >Precio:</h2>
                                <div>
                                    <input className='bg-[#F6F6F6] p-[1vw]  text-[#868686] text-sm md:w-[20vw] md:h-[2vh] rounded-sm'
                                        placeholder='$90.00'
                                    />
                                </div>
                                                
                            </div>
                            <div className="flex py-[1vh]">
                                <h2  >Cantidad:</h2>
                                <div>
                                    <input name='Seleccione la fecha' className='bg-[#F6F6F6] p-[1vw]  text-[#868686] text-sm md:w-[20vw] md:h-[2vh] rounded-sm'
                                        placeholder='1'
                                    />
                                </div>
                                                
                            </div>
                      </div>
                    <div className="flex self-end justify-around p-[1vw] px-[.1vw] ">
                            <button className='bg-[#70C5BB] md:w-[8vw] md:h-[4vh] rounded-sm text-white'>Guardar</button>
                    </div>
                    
                 
                    
            </form>  

        </div>
    </div>
    <Footer/>
    </>
  )
}

export default CreateProduct