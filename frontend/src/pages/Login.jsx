import React from 'react'
import Footer from '../components/Footer'

function Login() {
  return (
    <>
    <div>
    
    <div className='bg-[#022F40] w-full h-[7.5vh]'>
        <h2 className='text-white text-xl px-[3vh]'>K'axlanal</h2>
    </div>
        <div className='bg-[#40556D] w-full md:h-[3.8vh] px-[2vw] flex flex-wrap justify-around'>
        </div>
            <div className='  px-[5vw] w-full flex justify-center py-[8vh]'>
                <div className='bg-[#F6F6F6] md:w-[80vw] md:h-[79vh] flex justify-between'>
            
                   <div className='md:w-[50vw] py-[8vh] px-[5vw] '>
                   <h4 className='text-2xl text-[#022F40]'> °Iniciar sesión</h4>
                    <h4 className='border-[#304D6D] border-b-2 py-[.5vw] md:w-[14vw]'></h4>
                        <div className='py-[8vh] px-[3vw]'>
                            <h2>Correo</h2>
                            <input className='bg-[#D9D9D9] text-[#868686]  rounded-sm p-[1vh] md:w-[25vw] md:h-[4vh]'
                                type='email'
                                placeholder='ejemplo@gmail.com'
                                
                            />
                           
                        </div>
                            <div className='py-[2vh] px-[3vw]'>
                                <h2>Contraseña</h2>
                                <input className='bg-[#D9D9D9] text-[#868686] rounded-sm p-[1vh] md:w-[25vw] md:h-[4vh]'
                                    type='password'
                                    placeholder='********'
                                />
                            </div>
                                <div className='py-[2vh] px-[10vw]'>
                                    <button className='bg-[#526F8E] md:w-[10vw] md:h-[4vh] text-sm rounded-sm text-white'>Iniciar Sesión</button>
                                    
                                </div>
                                <div className='py-[4vh] px-[7vw]'>
                                    <h2 className='md:w-[20vw] flex items-center'>
                                        ¿No tiene una cuenta?
                                        <button className='text-[#F10000] ml-2'>Registrarse</button>
                                    </h2>
                                </div>
                   </div>
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

export default Login
