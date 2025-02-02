import React, { useContext } from 'react'
import { useGeneralContext } from '../contexts/GeneralContext'

function Product() {
    const {darkMode} =useGeneralContext();
  return (
    <>
    <div>
        <div className= {` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:flex-row flex-col flex px-[5vw] py-[8vh] w-full`} >
            <div className= {` ${darkMode ? ('bg-darkCardBg border-darkAccents') : ('bg-cardBg border-prices')} border-b w-full md:w-[28vw] sm:w-[38vw] h-[40vh] md:h-[60vh] p-4`}>
            </div>
            <div className="flex flex-col  px-[4vw] ">
                <div className="flex justify-between mt-[1.5vh]">
                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} border-b-[#341CA7] border-b-2 mx-[2v] md:w-[20vw] p-[.3vw] font-normal`}>Selección especial - Verano fresco!!!</h1>
                </div>
                <div className='pt-[5vh] text-[#868686]'>
                        <div className='md:w-[50vw] md:h-[30vh]' >
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Aenean eu lobortis urna. Sed quis lacus arcu. Donec accumsan 
                            mi fermentum, posuere nunc cursus, euismod nisl. Suspendisse
                            ornare ligula eget porttitor dignissim. Vivamus viverra, 
                            tortor vitae elementum lobortis, libero felis lobortis eros,
                            id suscipit augue dolor quis libero. Maecenas tincidunt augue 
                            non erat imperdiet, at commodo erat mollis. Quisque pharetra 
                            arcu quis ante lacinia vehicula. Fusce tristique, 
                            libero pretium mattis molestie, ante lectus imperdiet ipsum,
                            eu euismod urna est et neque. Proin aliquet </h4>
                        </div>
                    </div>
                    <div className="flex py-[1vh]">
                        <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Fecha de producción:</h2>
                        <h3 className='text-[#868686] px-[1vw]'>19/Septiembre/2024</h3>
                       
                     </div>
                     <div className="flex ">
                            <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Categoría</h2>
                            <h2 className="  pl-[5.8vw]">:</h2>
                            <h3 className='text-[#868686] px-[1vw]'>Frutas de temporada</h3>
                        </div>
           
                
                <div className="flex self-end py-[6.5vh] justify-around gap-[.4vw]">
                        <h2 className="text-[#2374AB] border-b-[#70C5BB] border-b-2 text-xl px-[1vw]">$500</h2>
                  
                </div>
            </div>  

        </div>
    </div>

    </>
    )
}

export default Product
