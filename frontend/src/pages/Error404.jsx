import React from 'react'
import { Link } from 'react-router-dom'
import { useGeneralContext } from '../contexts/GeneralContext'

function Error404() {
  const { darkMode } = useGeneralContext();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-darkMainBackground text-white' : 'bg-lightMainBackground text-black'}`}>
      <div className='text-center p-6'>
      <h2 className='text-5xl font-bold mb-2 text-[#1d0af8] animate-bounce'>404</h2>
        <h1 className='text-6xl font-bold text-[#fd1205] mb-4'>Oh no!</h1>
        <h3 className='text-2xl font-semibold mb-4'>La página que intenta solicitar no está en el servidor (Error 404)</h3>
        <p className='text-lg font-medium mb-6'>Lo sentimos, pero la página que está buscando no existe.</p>
        <div>
          <h4 className='text-xl font-semibold mb-4'>Pruebe nuevamente regresando al inicio</h4>
          <Link to='/' className='px-4 py-2 bg-[#1d0cc4] text-white font-bold rounded hover:bg-blue-600 transition duration-300'>
            Regresar
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error404
