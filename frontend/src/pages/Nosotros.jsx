import React from 'react'
import { useGeneralContext } from '../contexts/GeneralContext'

function Nosotros() {
    const {darkMode} = useGeneralContext();
  return (
    <>

        <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')}   py-[8vh]  px-[5vw]`}>
            <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center font-semibold text-2xl `}>Sobre nosotros</h1>
            <h2 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center w-full text-sm pb-[4vh]`}>K’axlanal directorio electrónico de vendedores informales de productos locales</h2>
       <div className='flex justify-between  flex-col md:flex-row gap-4 md:gap-8'>
            <div className={` ${darkMode ? 'bg-darkSidebar' : 'bg-white border-gray-300 border'} md:w-[50vw]  rounded-md  md:pb-[4vh] shadow-lg  `}>
                <h2 className={` ${darkMode ? 'text-white' : 'text-gray-800'} text-center text-2xl font-semibold mb-4`}>Misión</h2>
                <p className={` ${darkMode ? ('text-white ') : ('text-black')} w-full p-5 text-justify`}>Agilizar el proceso de compra-venta de los productos provenientes de comunidades rurales, proporcionando la herramienta necesaria para la comunicación entre el comprador y el vendedor.Nuestro objetivo es aumentar la visibilidad de las Microempresas provenientes de comunidades rurales del Estado de Quintana Roo, al igual que facilitar el acceso a sus productos y ubicaciónes mediante una plataforma intuitiva y facil de usar.</p>
            </div>
            <div className= {` ${darkMode ? 'bg-darkSidebar' : 'bg-colorBanner'} w-full mb-[3vh] rounded-md md:w-1/2 h-40 md:h-60`}>
                <img className='w-full h-full object-cover' src='https://i.etsystatic.com/28232683/r/il/154b62/5500911886/il_fullxfull.5500911886_o53o.jpg'/>
            </div>
       </div>

        <div className='md:py-[4vh]'>
        <div className='flex justify-between  flex-col md:flex-row gap-4 md:gap-8'>
        <div className= {` ${darkMode ? 'bg-darkSidebar' : 'bg-colorBanner'} rounded-md w-full md:w-1/2 h-40 md:h-60`}>
                <img className='w-full h-full object-cover' src='https://tb-static.uber.com/prod/image-proc/processed_images/0ca27eeaae5320467c765d78a75a4e92/fb86662148be855d931b37d6c1e5fcbe.jpeg'/>
            </div>
            <div className={` ${darkMode ? 'bg-darkSidebar' : 'bg-white border-gray-300 border'} w-full md:w-[50vw]  rounded-md  md:p-[4vh] shadow-lg  `}>
                <h2 className={` ${darkMode ? 'text-white' : 'text-gray-800'} text-center text-2xl font-semibold mb-4`}>Visión</h2>
                <p className={` ${darkMode ? ('text-white ') : ('text-black')} w-full p-5 text-justify`}>Convertirnos en la plataforma principal para la promoción de productos de las microempresas de comunidades rurales del Estado de Quintana Roo. Nos esforzamos por facilitar el acceso a los compradores tanto locales como internacionales, contribuyendo al crecimiento económico sostenible de estas microempresas. </p>
            </div>
           
       </div>
       </div>
            
        </div>


    </>
  )
}

export default Nosotros
