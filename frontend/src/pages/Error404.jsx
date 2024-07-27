import React from 'react'
import { Link } from 'react-router-dom'

function Error404() {
  return (
    <div className='min-h-screen'>
        <div className='text-center w-full px-[5vw] py-[8vh]'>
            <h1 className='text-4xl  font-bold text-orange-600'>Whoops!</h1>
            <h2 className='text-3xl font-bold'>404</h2>
            <h3 className='text-xl font-semibold'>La página que intenta solicitar no esta en el servidor(Error 404)</h3>
                <div>
                    <h4 className='font-semibold'>Pruebe nuevamente regresando al inicio</h4>
                    <Link to='/' className='border-b font-bold text-blue-500'>Regresar</Link>
                </div>
        </div>
      
    </div>
  )
}

export default Error404
