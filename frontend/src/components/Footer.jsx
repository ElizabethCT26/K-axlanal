import React from 'react'
import { useGeneralContext } from '../contexts/GeneralContext'

function Footer() {
  const { darkMode } = useGeneralContext()
  return (
  <div>
      
        <div className={` ${darkMode ? 'bg-darkPrimary text-white' : 'bg-primaryColor' } md:h-[9vh] flex  justify-end`}>
          
        </div>
      
  </div>
  )
}

export default Footer
