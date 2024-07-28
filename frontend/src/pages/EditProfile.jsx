import React from 'react'
import { useGeneralContext } from '../contexts/GeneralContext'


function EditProfile() {

    const {darkMode} = useGeneralContext();
    return (
        <>
        <div >
        
     
            <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:flex-row flex flex-col px-[5vw] py-[8vh] w-full`} >
        <div className='flex flex-col py-[4vh] md:flex-row '>
                <div className='py-[4vh]'>
                <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} md:flex-row flex flex-col py-[2vh] justify-between border  border-b-[#341CA7] w-full md:h-[60vh] sm:h-[20vh] md:w-[28vw] sm:w-[18vw] px-[5vw]`}>
                    <h4 className='text-[#ABABAB] flex justify-center items-center '>Seleccionar foto de perfil</h4>
                </div>
                </div>
        </div>
                <form className="flex flex-col  px-[4vw]   ">
                    <div className="flex mt-[1.5vh]">
                        <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} mx-[2v] md:w-[20vw] p-[.3vw] font-semibold `}>Editar perfil</h1>
                    </div>
                   <div className='flex '>
                        <div className='py-[1.4vh] w-full'>
                        <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Nombre:</h2>
                                <input className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} w-full md:w-[23vw] md:h-[4vh] p-[1vw]   rounded-sm text-[#868686]`}
                                    placeholder='Nombre '
                                />
                               
                        </div>
                        <div className='py-[1.3vh] w-full  px-[4vw]' >
                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Apellido:</h2>
                                <input className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} w-full md:w-[23vw] md:h-[4vh] p-[1vw] rounded-sm text-[#868686]`}
                                    placeholder='Apellido '
                                />
                                
                        </div>
                        
                   </div>
                        <h4 className='border-b-[#341CA7] md:w-[50vw] border-b-2 py-[1vh]'></h4>
                    <div className='py-[5vh] text-[#868686]'>
                    <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Descripción:</h2>
                            <div className='md:w-[50vw] md:h-[30vh]' >
                                <textarea className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput border-prices')} bg-[#F6F6F6] w-full md:h-[28vh] p-[1vw]`}
                                    placeholder='Escribe la descripción del usuario'
                                />
                            </div>
                        </div>
                    
                            <div className="flex py-[1vh] ">
                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black')} pr-[5.2vw]`} >Teléfono:</h2>
                                <div>
                                    <input type='tel' className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} p-[1vw]  text-[#868686] md:w-[42vw] text-sm w-full md:h-[4vh] rounded-sm`}
                                        placeholder='9984117623'
                                    />
                                </div>
                                                
                            </div>
                           
                            <div className="flex justify-between py-[1vh] ">
                                    <h2  className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Correo electrónico:</h2>
                                    <input type='email' className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} p-[1vw]  text-[#868686] text-sm md:w-[42vw] md:h-[4vh] rounded-sm`}
                                        placeholder='ejemplo@gmail.com'
                                    />
                            </div>
                        
                    
                        <div className="flex self-end justify-around py-[5vh] ">
                                <button className='bg-[#70C5BB] w-full md:w-[8vw] md:h-[4vh] rounded-sm text-white'>Guardar</button>
                        </div>
                        
                </form>  
    
            </div>
        </div>

        </>
    )
    }

export default EditProfile