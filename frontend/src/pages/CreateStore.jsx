import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useGeneralContext } from '../contexts/GeneralContext'

function CreateStore() {

    const {darkMode} = useGeneralContext();
    
    const [data,setData] = useState({
        nombre:'',
        descripcion:'',
        fecha_produccion:'',
        categorias_principales:'',
        ubicacion:'',
        ubicacion_origen:''
    })

    const url = 'http://localhost:8082/crear-tienda'
  return (
    <>
    <div>
    
    <Header/>
        <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex px-[5vw] py-[8vh] w-full`} >
       <div className='flex flex-col py-[4vh] '>
       <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')}  justify-between border py-[2vh] border-b-[#341CA7] md:h-[25vh] sm:h-[20vh] md:w-[28vw] sm:w-[18vw] px-[5vw]`}>
                <h4 className='text-[#ABABAB] flex justify-center items-center '>Seleccionar banner</h4>
            </div>
            <div className='py-[4vh]'>
            <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} py-[2vh] justify-between border  border-b-[#341CA7] md:h-[60vh] sm:h-[20vh] md:w-[28vw] sm:w-[18vw] px-[5vw]`}>
                <h4 className='text-[#ABABAB] flex justify-center items-center '>Seleccionar foto del producto</h4>
            </div>
            </div>
       </div>
            <form className="flex flex-col  px-[4vw] ">
                <div className="flex justify-between mt-[1.5vh]">
                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} mx-[2v] md:w-[20vw] p-[.3vw] font-semibold`}>Crear tienda</h1>
                </div>
                <div >
                    <input className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} md:w-[25vw] md:h-[4vh] p-[1vw] rounded-sm text-[#868686]`}
                        placeholder='Escribe el titulo de la tienda'
                    />
                    <h4 className='border-b-[#341CA7] md:w-[25vw] border-b-2 py-[1vh]'></h4>
                </div>
                <div className='py-[5vh] text-[#868686]'>
                        <div className='md:w-[50vw] md:h-[30vh]' >
                            <textarea className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput border-prices')} bg-[#F6F6F6] md:w-[53vw] md:h-[28vh]`}
                                placeholder='Escribe la descripción de la tienda'
                            />
                        </div>
                    </div>
                 
                        <div className="flex py-[1vh] justify-between">
                            <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Fecha de producción:</h2>
                            <div>
                                <input type='date' className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} p-[1vw]  text-[#868686] text-sm md:w-[42vw] md:h-[4vh] rounded-sm`}/>
                            </div>
                                            
                        </div>
                        <div className="flex justify-between py-[1vh] ">
                                <h2  className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Categorías principales:</h2>
                                <label>
                                    <select  className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} p-[1vw] text-[#868686] text-sm md:w-[42vw] md:h-[4vh] rounded-sm`}
                                    >
                                    <option>Muebles y decoración</option>
                                    <option>Alimentos y bebidas</option>
                                    <option>Cuidad corporal</option>
                                    </select>
                                </label>
                        </div>
                        <div className="flex justify-between py-[1vh] ">
                                <h2  className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Seleccione la ubicación:</h2>
                                <button className={` ${darkMode ? ('bg-darkBottom border-darkBottom') : ('bg-colorBottom ')} md:w-[10vw] text-center text-white `}>Usar ubicación</button>
                        </div>
                        <div className="flex justify-between py-[1vh] ">
                                <h2  className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Seleccione la ubicación de origen:</h2>
                                <button className={` ${darkMode ? ('bg-darkBottom border-darkBottom') : ('bg-colorBottom ')} md:w-[10vw] text-center text-white`}>Usar ubicación</button>
                        </div>
                    
                   
                    <div className="flex self-end justify-around py-[5vh] ">
                            <button className='bg-[#70C5BB] md:w-[8vw] md:h-[4vh] rounded-sm text-white'>Guardar</button>
                    </div>
                    
            </form>  

        </div>
    </div>
    <Footer/>
    </>
  )
}

export default CreateStore
