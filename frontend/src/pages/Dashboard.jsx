import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useGeneralContext } from '../contexts/GeneralContext'
import { Link } from 'react-router-dom';
import GraphStore from './GraphStore';
import GraphCategories from './GraphCategories'

function Dashboard() {

    const {darkMode} = useGeneralContext();
  return (
    <>
    <Header/>
        <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:py-[5vh] `} >
            <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} md:px-[5vw] text-xl font-semibold md:py-[2vh]`} >Dasboard</h1>

            <div className='flex justify-between md:px-[5vw]'>
          
                    <div className='flex flex-col'>
                        <h2 className={` ${darkMode ? ('text-white ') : ('text-black')} md:py-[2vh]`}>Categoría más buscada en el mes</h2>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')} rounded-md  md:w-[52vw] px-[2vw]  md:h-[55vh] sm:w-[30vw]`}><GraphCategories/> </div>
                    </div>
                
                    <div className='flex flex-col'>
                        <h2 className={` ${darkMode ? ('text-white ') : ('text-black')} md:py-[2vh]`}>Tienda más popular</h2>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')} rounded-md  md:h-[55vh] md:w-[36vw]`}>   <GraphStore/></div>
                    </div>
            </div>
            <div className='flex justify-between md:px-[5vw] md:py-[2vh]'>
          
                    <div className='flex flex-col '>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')}   md:w-[20vw] rounded-sm px-[2vw]  md:h-[20vh] sm:w-[30vw]`}>
                            <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center md:p-[2vh]`}>CRUD de Usuarios</h1>
                            <div className="flex self-end justify-around py-[2vh] ">
                               <Link to="/crud-usuarios">
                                    <button className={` ${darkMode ? ('bg-darkCardBottom ') : ('bg-colorBottom')} md:w-[8vw] md:h-[4vh] rounded-sm text-white `} type='button'>Ver más</button>
                               </Link>
                        </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')}   md:w-[20vw] rounded-sm px-[2vw]  md:h-[20vh] sm:w-[30vw]`}>
                                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center md:p-[2vh]`}>CRUD de Productos</h1>
                            <div className="flex self-end justify-around py-[2vh] ">
                            <Link to="/crud-productos">
                                    <button className={` ${darkMode ? ('bg-darkCardBottom ') : ('bg-colorBottom')} md:w-[8vw] md:h-[4vh] rounded-sm text-white `} type='button'>Ver más</button>
                               </Link>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')}   md:w-[20vw] rounded-sm px-[2vw]  md:h-[20vh] sm:w-[30vw]`}>
                                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center md:p-[2vh]`}>CRUD de Categoría</h1>
                            <div className="flex self-end justify-around py-[2vh] ">
                            <Link to="/crud-categorias">
                                    <button className={` ${darkMode ? ('bg-darkCardBottom ') : ('bg-colorBottom')} md:w-[8vw] md:h-[4vh] rounded-sm text-white `} type='button'>Ver más</button>
                               </Link>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorBanner')}   md:w-[20vw] rounded-sm px-[2vw]  md:h-[20vh] sm:w-[30vw]`}>
                                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-center md:p-[2vh]`}>CRUD de Tiendas</h1>
                            <div className="flex self-end justify-around py-[2vh] ">
                            <Link to="/crud-tienda">
                                    <button className={` ${darkMode ? ('bg-darkCardBottom ') : ('bg-colorBottom')} md:w-[8vw] md:h-[4vh] rounded-sm text-white `} type='button'>Ver más</button>
                               </Link>
                            </div>
                        </div>
                    </div>
                   
                  
            </div>
      </div>
    <Footer/>
    </>

  )
}

export default Dashboard