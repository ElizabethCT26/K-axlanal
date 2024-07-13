import React from 'react'

function Footer() {
  const darkMode = true;
  return (
  <div>
      
        <div className={` ${darkMode ? 'bg-darkPrimary text-white' : 'bg-primaryColor' } h-[9vh] flex  justify-end`}>
          
        </div>
      
  </div>
  )
}

export default Footer
