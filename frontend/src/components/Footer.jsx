import React from 'react'
import { useGeneralContext } from '../contexts/GeneralContext'

function Footer() {
  const { darkMode } = useGeneralContext()
  return (
  <div>
      
        <div className={` ${darkMode ? 'bg-darkPrimary text-white' : 'bg-primaryColor' } md:h-[12vh] flex  justify-center`}>
            <div>
              <div className='flex justify-center items-centers md:py-[2vh]'>
                  <button className={` ${darkMode ? ' text-white' : 'text-white' }`}>Contactanos</button>
              </div>
              <div>
                  <h2 className='border border-white md:w-[80vw]'></h2>
                  <h3 className='text-white text-center'>Copyright © 2024 I  K’axlanal</h3>

              </div>
             
            </div>
        </div>
      
  </div>
  )
}

export default Footer
