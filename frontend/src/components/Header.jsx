import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGeneralContext } from '../contexts/GeneralContext';
import axios from 'axios';
import buscar from '../assets/buscar.svg'
import logo from '../assets/logo.svg'
import darkProfile from '../assets/darkProfile.svg'
import darkProfileCharacter from '../assets/darkProfileCharacter.svg'
import darkModeIcon from '../assets/darkModeIcon.svg'
import storeDark from '../assets/storeDark.svg'
import darkBell from '../assets/darkBell.svg'
import lightProfile from '../assets/lightProfile.svg'
import lightProfileCharacter from '../assets/lightProfileCharacter.svg'
import lightModeIcon from '../assets/lightModeIcon.svg'
import storeLight from '../assets/storeLight.svg'
import lightBell from '../assets/lightBell.svg'
import Close from '../assets/close.svg'
import LikeThat from '../svgs/LikeThat';




function Header() {

  const { darkMode, setDarkMode, setAuth,auth, userId, userType, enqueueSnackbar} = useGeneralContext();
  const [useModal, setUserModal] = useState(false);
  const [displayNoti, setDisplayNoti] = useState(false);
  const [ user, setUser ] = useState('')
  const [data,setData] = useState([])
  const [store,setStore] = useState([])

  const navigate = useNavigate()

  const handleModeChange = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', !darkMode);
  }

  const fetchProfile = async () => {
    const response = await axios.get(`https://localhost:8082/profiles/${userId}`) 
    setData(response.data)
  }

  const fetchStore = async () => {
    try{
        const response  = await axios.get('https://localhost:8082/users/checkstore', { withCredentials: true })
        setStore(response.data)
    } catch (error){
        console.log('algo ha salido mal')
    }
}

  const closer = () => {
    setAuth(false);
    setUserModal(false);
    setDisplayNoti(false);
  }

  const logOut = async () => {
    try{
      const response = await axios.get('https://localhost:8082/logout', { withCredentials: true });
      closer();
      enqueueSnackbar('Se ha cerrado la sesión', { variant: 'default' });
      navigate('/');
    }catch(error){
      enqueueSnackbar('No se ha podido cerrar sesión', { variant: 'warning' });
    }
    
}

  useEffect(()=>{
    if(auth){
      fetchProfile()
      fetchStore()
    }
  }, [auth])


  return (
  <div>
    <div className={` ${darkMode ? 'bg-darkPrimary text-white' : 'bg-primaryColor' } w-full md:h-[14vh] h-[10vh] sm:h-[6vh] flex flex-wrap items-center justify-between px-[2vw]`}>
      <div className='flex  flex-wrap gap-[3vw] items-center'>
      <Link to='/'>
        <div className='text-white flex flex-wrap items-center font-inriaSans italic font-light'>
            <div className='w-[3vw] '>
              <img src={logo} alt="" className='w-full h-full object-contain'/>
            </div>
            <div className=' flex flex-wrap'>
              <h2 className=' px-[.3vw]'>K'axlanal</h2>
              <div className='h-[.2vh] rounded-full w-full px-[.2vw]'></div>
            </div>
          </div>
      </Link>
      {/*
        <form className={`${darkMode ? 'bg-[#3A3A3A]' : 'bg-[#D9D9D9]'} md:w-[20vw] sm:w-[10vw] text-sm flex rounded-md`}>
          <input type="text" className={`${darkMode ? 'bg-[#3A3A3A]' : 'bg-[#D9D9D9]'} w-full rounded-l-md px-[1vw]`}/>
          <button className={`${darkMode ? 'bg-[#126477]' : 'bg-[#1EBEE1]'} w-[6vw] px-[1vw] sm:w-[2vw] md:px-2 rounded-md`}>
            <img  src={buscar} className='w-full h-full object-contain'/>
          </button>
        </form>
        */}
      </div>

      <div className={` ${darkMode ? 'bg-darkPrimary text-white' : 'bg-primaryColor' }  w-[70vw]  md:h-[3.8vh] flex flex-wrap justify-end`}>
              <ul className='flex flex-wrap justify-between text-sm w-[40%] '>
              <Link to='/'>
                <li className='text-white text-lg font-light border-b-2 border-b-transparent hover:border-[#00B7EB] px-2 transition-all ease-in-out duration-200 '>
                    Inicio
                </li>
              </Link>

              <Link to='/productos'>
                <li className='text-white text-lg font-light border-b-2 border-b-transparent hover:border-[#00B7EB] px-2 transition-all ease-in-out duration-200'>
                    Productos
                </li>
              </Link>

              <Link to='/tiendas'>
                <li className='text-white text-lg font-light border-b-2 border-b-transparent hover:border-[#00B7EB] px-2 transition-all ease-in-out duration-200'>
                    Tiendas
                </li>
              </Link>

              <Link to='/nosotros'>
                <li className='text-white text-lg font-light border-b-2 border-b-transparent hover:border-[#00B7EB] px-2 transition-all ease-in-out duration-200'>
                    Nosotros
                </li>
              </Link>


              </ul>
      </div>

      {
        auth ? (
          <div className=' w-[8vw] h-[5vh] md:w-[2.3vw] md:h-[5vh] rounded-full ' onClick={() => setUserModal(true)}>
          {
            data ? (
              data.map((profile, index) => (
            <img src={ profile.path ? (`https://localhost:8082${profile.profile_path}`) : ( darkMode ? (darkProfile) : (lightProfile) ) } className='w-full h-full object-cover rounded-full'/>
          ))
            ) : ('a')
          }
          </div>
        ) :(
          <Link to='/login' className={` ${darkMode ? ('text-white') : ('text-white')} `}>Iniciar sesion</Link>
        )
      }
      {
        useModal && (
          <div className={` ${darkMode ? ('bg-darkMainBackground border-darkCardBg') : ('bg-cardBg border-[#CECECE]')} border-l border-b rounded-sm w-[90vw] md:w-[20vw] md:h-[60vh] sm:w-[14vw] flex-fit h-full fixed right-0 top-0 flex flex-wrap z-50`}>
            <div className='w-full h-full relative rounded-sm '>

              <div className=' flex justify-center flex-wrap items-center'>
                <div className='w-full flex h-[8vh] px-[.5vw] py-[1vh] relative'>


                {
                    displayNoti ? (
                      <>
                        <button type='button' className={` ${darkMode ? ('bg-darkCardBottom') : ('bg-cardBottom')}  rounded-full flex flex-wrap  w-[8vw] h-[6vh] md:w-[1.8vw] md:h-[4vh] absolute items-center justify-center`} onClick={() => setDisplayNoti(false)}>
                        &lt;
                        </button>
                        
                        <h2 className='w-full h-full items-center flex text-center  justify-center text-sm'>Notificaciones</h2>
                      </>
                    ) : (
                      <button type='button' className={` ${darkMode ? ('bg-darkCardBottom') : ('bg-cardBottom')}  rounded-full flex flex-wrap w-[8vw] h-[6vh] md:w-[1.8vw] md:h-[4vh] absolute items-center justify-center`} onClick={() => setUserModal(false)}>
                      x
                      </button>
                    )
                  }
                </div>


                
              {
                !displayNoti &&  (
                  <div className=' w-[12vw] h-[8vh] md:w-[3.7vw] md:h-[8vh] rounded-full border-2 bg-[#3A4E64] border-[#341CA7] absolute top-[4.5vh]'>
                  {
                    data ? (
                      data.map((profile, index) => (
                        <img src={ profile.path ? (`https://localhost:8082${profile.profile_path}`) : ( darkMode ? (darkProfile) : (lightProfile) ) } key={index} className='w-full  h-full object-cover rounded-full '/>
                      ))
                    ) : ('a')
                  }
                </div> 
                )
              }
              </div>
              <div className={` ${darkMode ? ('bg-darkCardBg border-darkPrices') : ('bg-cardBg border-prices')} pb-[3vh] h-[90vh] md:h-[60vh]  pt-[6vh] ${ displayNoti && (' h-full md:h-[84%]')  } w-full flex flex-wrap gap-[1vh] bg-cardBottom rounded-b-sm`}>
                  {
                    displayNoti ? (<></>) : (
                      <>
                      <div className='w-full flex items-center justify-center pb-[1vh] '>
                      {
                        data ? (
                          data.map((profile, index) => (
                            <div className='w-full flex flex-col items-center'>
                              <h2 key={index}>Hola {profile.nombre} {profile.apellido}!</h2>
                              <h2 key={index + 1} className='font-light text-xs '>{profile.correo}</h2>
                            </div>
                          ))
                          ) : (
                            <h2 >Hola!</h2>
                          )
                      }
                    </div>
    
                    {/*<button type='button' className='w-full flex flex-wrap items-center justify-between text-left mx-[1.5vw] px-[1vw] py-[1%] text-sm font-light border-b-2 border-b-darkAccents pb-[1vh]' onClick={() => setDisplayNoti(true)}>
                      <h2 className=''>Notificaciones</h2>
                        <div className='w-[6vw] md:w-[1.2vw]'>
                          <img src={ darkMode ? (darkBell) : (lightBell)} className='w-[40vw]  md:w-[5vw] h-full  object-cover rounded-full'/>
                        </div>
                    </button>*/}
    
                    <button type='button' className='w-full  mx-[1.5vw] px-[1vw] py-[1%] text-sm  font-light border-b-2 border-b-darkAccents  pb-[1vh]'>
                      <Link to={`/perfil/${userId}/mi-perfil`} className='flex flex-wrap justify-between'>
                        <h2 className=''>Ver perfil</h2>
                        <div className='w-[6vw] md:w-[1.2vw]'>
                          <img src={ darkMode ? (darkProfileCharacter) : (lightProfileCharacter)} className='w-full h-full object-cover rounded-full'/>
                        </div>
                      </Link>
                    </button>
    
                    <button type='button' className='w-full flex flex-wrap justify-between items-center text-left mx-[1.5vw] px-[1vw] py-[1%] text-sm font-light border-b-2 border-b-darkAccents  pb-[1vh]' onClick={() => handleModeChange()}>
                      <h2 className=''>{ darkMode ? ('Modo claro') : ('Modo oscuro') }</h2>
                        <div className='w-[6vw] md:w-[1.2vw]'>
                          <img src={ darkMode ? (lightModeIcon) : (darkModeIcon)} className='w-full h-full object-cover rounded-full'/>
                        </div>
                    </button>
    
                    
                    <button type='button' className='w-full  mx-[1.5vw] px-[1vw] py-[1%] text-sm  font-light border-b-2 border-b-darkAccents  pb-[1vh]'>
                      <Link to={store[0] ? `/tienda/${store[0].id}/${store[0].tienda.trim().replaceAll(' ', '-')}` : ('/crear-tienda') } className='flex flex-wrap justify-between'>
                        <h2 className=''>{store[0] ? 'Ver tienda' : 'Crear tienda'}</h2>
                        <div className='w-[6vw] md:w-[1.2vw]'>
                          <img src={ darkMode ? (storeDark) : (storeLight)} className='w-full h-full object-cover rounded-full'/>
                        </div>
                      </Link>
                    </button>
    
                    <button type='button' className={`${darkMode && ('font-medium')} w-full items-center flex flex-wrap justify-between text-left mx-[1.5vw] px-[1vw] py-[1%] text-sm border-b-2 border-red-500 text-red-500  pb-[1vh]`} onClick={() => logOut()}>
                      <h2 className=''>Cerrar sesión</h2>
                        <div className='w-[6vw] md:w-[1.2vw]'>
                          <img src={Close} className='w-full h-full object-cover rounded-full'/>
                        </div>
                    </button>
                      </>
                    )
                  }
              </div>
            </div>
          </div>
        )
      }
    </div>
  


  </div>
  )
}

export default Header
