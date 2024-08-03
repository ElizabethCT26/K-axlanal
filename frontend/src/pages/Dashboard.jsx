import React from 'react'
import { useGeneralContext } from '../contexts/GeneralContext'
import { Link } from 'react-router-dom';
import GraphStore from './GraphStore';
import GraphCategories from './GraphCategories'

function Dashboard() {

    const {darkMode} = useGeneralContext();
  return (
    <>
    
        <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} py-[5vh] `} >
            <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} px-[5vw] text-xl font-semibold py-[2vh]`} >Dashboard</h1>

            <div className='flex flex-col md:flex-row justify-between px-5'>
          
                    <div className='flex flex-col mb-5 md:mb-0'>
                        <h2 className={` ${darkMode ? ('text-white ') : ('text-black')} md:py-[2vh]`}>Categoría más buscada en el mes</h2>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')} rounded-md  md:w-[52vw] px-[2vw]  md:h-[55vh] shadow-lg transition-all transform hover:scale-105 sm:w-[30vw]`}><GraphCategories/> </div>
                    </div>
                
                    <div className='flex flex-col mb-2 md:mb-0' >
                        <h2 className={` ${darkMode ? ('text-white ') : ('text-black')} md:py-[2vh]`}>Tienda más popular</h2>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')} rounded-  md:h-[55vh] md:w-[40vw] shadow-lg transition-all transform hover:scale-105`}>   <GraphStore/></div>
                    </div>
            </div>
            <div className='flex flex-col justify-between md:flex-row px-5 py-2'>
          
                    <div className='flex flex-col my-2 md:mb-0 '>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')}   md:w-[20vw] rounded-sm px-[2vw]  md:h-[20vh] shadow-lg transition-all transform hover:scale-105 sm:w-[30vw]`}>
                            <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center md:p-[2vh]`}>CRUD de Usuarios</h1>
                            <div className="flex justify-center py-[2vh] ">
                               <Link to="/crud-usuarios">
                                    <button className={` ${darkMode ? ('bg-darkCardBottom ') : ('bg-colorBottom')} md:w-[8vw] md:h-[4vh] rounded-sm text-white `} type='button'>Ver más</button>
                               </Link>
                        </div>
                        </div>
                    </div>
                    
                
                    <div className='flex flex-col my-2 md:mb-0'>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')}   md:w-[20vw] rounded-sm px-[2vw]  md:h-[20vh] sm:w-[30vw] shadow-lg transition-all transform hover:scale-105`}>
                                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center md:p-[2vh]`}>CRUD de Productos</h1>
                            <div className="flex justify-center py-[2vh] ">
                            <Link to="/crud-productos">
                                    <button className={` ${darkMode ? ('bg-darkCardBottom ') : ('bg-colorBottom')} md:w-[8vw] md:h-[4vh] rounded-sm text-white `} type='button'>Ver más</button>
                               </Link>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col my-2 md:mb-0'>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')}   md:w-[20vw] rounded-sm px-[2vw]  md:h-[20vh] sm:w-[30vw] shadow-lg transition-all transform hover:scale-105`}>
                                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center md:p-[2vh]`}>CRUD de Categoría</h1>
                            <div className="flex justify-center py-[2vh] ">
                            <Link to="/crud-categorias">
                                    <button className={` ${darkMode ? ('bg-darkCardBottom ') : ('bg-colorBottom')} md:w-[8vw] md:h-[4vh] rounded-sm text-white `} type='button'>Ver más</button>
                               </Link>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col my-2 md:mb-0'>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')}   md:w-[20vw] rounded-sm px-[2vw]  md:h-[20vh] sm:w-[30vw] shadow-lg transition-all transform hover:scale-105`}>
                                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center md:p-[2vh]`}>CRUD de Tiendas</h1>
                            <div className="flex justify-center py-[2vh] ">
                            <Link to="/crud-tienda">
                                    <button className={` ${darkMode ? ('bg-darkCardBottom ') : ('bg-colorBottom')} md:w-[8vw] md:h-[4vh] rounded-sm text-white `} type='button'>Ver más</button>
                               </Link>
                            </div>
                        </div>
                    </div>
                
                   
                  
            </div>
      </div>

    </>

  )
}

export default Dashboard