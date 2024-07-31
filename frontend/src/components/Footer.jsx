import React from 'react'
import { useGeneralContext } from '../contexts/GeneralContext'
import { Link } from 'react-router-dom'

function Footer() {
  const { darkMode } = useGeneralContext()
  return (
  <div>
       <div className={` ${darkMode ? 'bg-darkPrimary text-white' : 'bg-primaryColor' } w-full md:h-[3.8vh] px-[2vw] py-[2vh] flex flex-wrap justify-around`}>
            <ul className='flex flex-wrap justify-around text-sm w-[80vw]'>
            <Link to='/'>
              <li className='text-white text-lg font-light border-b-2 border-b-transparent hover:border-[#00B7EB] px-2 transition-all ease-in-out duration-200'>
                  Inicio
              </li>
            </Link>

            <Link to='/productos'>
              <li className='text-white text-lg font-light border-b-2 border-b-transparent hover:border-[#00B7EB] px-2 transition-all ease-in-out duration-200'>
                  Productos
              </li>
            </Link>

            <Link to='/tiendas'>
              <li className='text-white text-lg font-light border-b-2 border-b-transparent hover:border-[#00B7EB] px-2 transition-all ease-in-out duration-200'>
                  Tiendas
              </li>
            </Link>

            <Link to='/nosotros'>
              <li className='text-white text-lg font-light border-b-2 border-b-transparent hover:border-[#00B7EB] px-2 transition-all ease-in-out duration-200'>
                  Nosotros
              </li>
            </Link>


            </ul>
      </div>
      
        <div className={` ${darkMode ? 'bg-darkPrimary text-white' : 'bg-primaryColor' } md:h-[12vh] flex  py-[2vh] justify-center`}>
        
            
              <div>
                  <h2 className='border border-white my-[3vh] md:w-[80vw]'></h2>
                  <h3 className='text-white text-center'>Copyright © 2024 I  K’axlanal</h3>

              </div>
             
           
        </div>
      
  </div>
  )
}

export default Footer
