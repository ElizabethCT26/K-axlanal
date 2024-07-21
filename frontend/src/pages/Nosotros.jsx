import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useGeneralContext } from '../contexts/GeneralContext'

function Nosotros() {
    const {darkMode} = useGeneralContext();
  return (
    <>
    <Header/>
        <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:py-[8vh]  md:px-[5vw]`}>
            <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center font-semibold text-2xl `}>Sobre nosotros</h1>
            <h2 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center text-sm md:pb-[4vh]`}>K’axlanal directorio electrónico de vendedores informales de productos locales</h2>
       <div className='flex justify-between'>
            <div className={` ${darkMode ? 'bg-darkSidebar' : 'bg-white border-gray-300 border'} md:w-[50vw]  rounded-md  md:p-[4vh] shadow-lg  `}>
                <h2 className={` ${darkMode ? 'text-white' : 'text-gray-800'} text-2xl font-semibold mb-4`}>Misión</h2>
                <span className='md:w-[30vw] text-justify'>Agilizar el proceso de compra-venta de los productos provenientes de comunidades rurales, proporcionando la herramienta necesaria para la comunicación entre el comprador y el vendedor.Nuestro objetivo es aumentar la visibilidad de las Microempresas provenientes de comunidades rurales del Estado de Quintana Roo, al igual que facilitar el acceso a sus productos y ubicaciónes mediante una plataforma intuitiva y facil de usar.</span>
            </div>
            <div className= {` ${darkMode ? 'bg-darkSidebar' : 'bg-colorBanner'} rounded-md md:w-[30vw]`}>
                Imagen 
            </div>
       </div>

        <div className='md:py-[4vh]'>
        <div className='flex justify-between'>
        <div className= {` ${darkMode ? 'bg-darkSidebar' : 'bg-colorBanner'} rounded-md md:w-[30vw]`}>
                Imagen 
            </div>
            <div className={` ${darkMode ? 'bg-darkSidebar' : 'bg-white border-gray-300 border'} md:w-[50vw]  rounded-md  md:p-[4vh] shadow-lg  `}>
                <h2 className={` ${darkMode ? 'text-white' : 'text-gray-800'} text-2xl font-semibold mb-4`}>Visión</h2>
                <span className='md:w-[30vw] text-justify'>Convertirnos en la plataforma principal para la promoción de productos de las microempresas de comunidades rurales del Estado de Quintana Roo. Nos esforzamos por facilitar el acceso a los compradores tanto locales como internacionales, contribuyendo al crecimiento económico sostenible de estas microempresas. </span>
            </div>
           
       </div>
       </div>
            
        </div>

        <Footer/>
    </>
  )
}

export default Nosotros
