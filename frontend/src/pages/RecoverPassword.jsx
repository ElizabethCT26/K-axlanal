import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useGeneralContext } from '../contexts/GeneralContext'

function RecoverPassword() {
    const {darkMode} = useGeneralContext();
  return (
    <>
    <Header/>
        <div>
        <div className='  px-[5vw] w-full flex justify-center py-[8vh]'>
                <div className='bg-[#F6F6F6] md:w-[80vw] md:h-[79vh] flex justify-between'>
            
                   <form className='md:w-[50vw] py-[8vh] px-[5vw] ' >
                   <h4 className='text-2xl text-[#022F40]'> °Restablecer contraseña</h4>
                    <h4 className='border-[#304D6D] border-b-2 py-[.5vw] md:w-[21vw]'></h4>
                        <div className='pt-[8vh] px-[3vw]'>
                            <h2>Correo electrónico</h2>
                            <input className='bg-[#D9D9D9] text-[#868686]  rounded-sm p-[1vh] md:w-[25vw] md:h-[4vh]'
                                type='email'
                                placeholder='ejemplo@gmail.com'
                                name='email'
                               
                                
                            />
                           
                        </div>
                            <div className='py-[2vh] px-[3vw]'>
                                <h2>Contraseña nueva</h2>
                                <input className='bg-[#D9D9D9] text-[#868686] rounded-sm p-[1vh] md:w-[25vw] md:h-[4vh]'
                                    type='password'
                                    placeholder='********'
                                    name='password'
                                  
                                />
                            </div>
                            <div className='py-[2vh] px-[3vw]'>
                                <h2> Confirmar contraseña</h2>
                                <input className='bg-[#D9D9D9] text-[#868686] rounded-sm p-[1vh] md:w-[25vw] md:h-[4vh]'
                                    type='password'
                                    placeholder='********'
                                    name='password'
                                  
                                />
                            </div>
                                <div className='py-[2vh] px-[8vw]'>
                                    <button className='bg-[#526F8E] md:w-[14vw] md:h-[4vh] text-sm rounded-sm text-white' type="submit">Recuperar contraseña</button>
                                    
                                </div>
                              
                   </form>
                                <div className='md:w-[35vw]'>
                                    <div className='bg-[#D9D9D9] md:w-[35vw] md:h-[79vh] '>

                                    </div>
                                </div>

                                
                        
                </div>
                

        </div>
       
        </div>

        <Footer/>
    </>
  )
}

export default RecoverPassword
