import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGeneralContext } from '../contexts/GeneralContext';
import axios from 'axios';

function Header() {

  const { darkMode, setDarkMode } = useGeneralContext();
  const [useModal, setUserModal] = useState(false);
  const [ user, setUser ] = useState('')
  const [data,setData] = useState([])

  const logOut = () => {
    sessionStorage.clear();
  }

  const fetchProfile = async () => {
    const response = await axios.get(`http://localhost:8082/profiles/${user}`)
    setData(response.data)
  }

  useEffect(()=>{
    setUser(sessionStorage.getItem('userId'))
    if(user){
      fetchProfile()
    }
  }, [user])


  return (
  <div>
    <div className={` ${darkMode ? 'bg-darkPrimary text-white' : 'bg-primaryColor' } w-full h-[7.3vh] flex flex-wrap items-center justify-between px-[2vw]`}>
      <div className='text-white'> K'axlanal</div>
      <div className='bg-white w-[2.3vw] h-[5vh] rounded-full ' onClick={() => setUserModal(true)}>
      {
        data ? (
          data.map((profile, index) => (
        <img src={`http://localhost:8082${profile.profile_path}`} className='w-full h-full object-cover rounded-full'/>
      ))
        ) : ('a')
      }
      </div>
      {
        useModal && (
          <div className={` ${darkMode ? ('bg-darkMainBackground border-darkCardBg') : ('bg-cardBg border-[#CECECE]')} border-l border-b rounded-sm w-[14vw] flex-fit fixed right-0 top-0 flex flex-wrap z-50`}>
            <div className='w-full h-full relative rounded-sm'>

              <div className=' flex justify-center bg-cardBackground'>
                <div className='w-full h-[8vh] px-[.5vw] py-[1vh]'>
                  <button type='button' className={` ${darkMode ? ('bg-darkCardBottom') : ('bg-cardBottom')}  rounded-full flex flex-wrap  w-[1.8vw] h-[4vh] items-center justify-center`} onClick={() => setUserModal(false)}>
                  x
                  </button>
                </div>
                
                <div className='w-[3.7vw] h-[8vh] rounded-full border-2  border-[#341CA7] absolute top-[4.5vh]'>
                  {
                    data ? (
                      data.map((profile, index) => (
                        <img src={`http://localhost:8082${profile.profile_path}`} key={index} className='w-full h-full object-cover rounded-full '/>
                      ))
                    ) : ('a')
                  }
                </div>
              </div>
              <div className={` ${darkMode ? ('bg-darkCardBg border-darkPrices') : ('bg-cardBg border-prices')} pb-[3vh] pt-[6vh] w-full flex flex-wrap gap-[.5vh] bg-cardBottom rounded-b-sm`}>
                <div className='w-full flex items-center justify-center pb-[1vh]'>
                  {
                    data ? (
                      data.map((profile, index) => (
                        <div className='w-full flex flex-col items-center'>
                          <h2 key={index}>Hola {profile.nombre} {profile.apellido}!</h2>
                          <h2 key={index + 1} className='font-light text-xs'>{profile.correo}</h2>
                        </div>
                      ))
                      ) : (
                        <h2 >Hola!</h2>
                      )
                  }
                </div>
                <button type='button' className='w-full text-left mx-[1.5vw] px-[1vw] py-[1%] text-sm  font-light border-b-2 border-b-darkAccents'>
                  Ver perfil
                </button>
                <button type='button' className='w-full text-left mx-[1.5vw] px-[1vw] py-[1%] text-sm font-light border-b-2 border-b-darkAccents' onClick={() => setDarkMode(!darkMode)}>
                  { darkMode ? ('Modo claro') : ('Modo oscuro') }
                </button>
                <button type='button' className='w-full text-left mx-[1.5vw] px-[1vw] py-[1%] text-sm  border-b-2 border-red-500 text-red-500' onClick={() => logOut()}>
                  Crear tienda
                </button>
                <button type='button' className='w-full text-left mx-[1.5vw] px-[1vw] py-[1%] text-sm  border-b-2 border-red-500 text-red-500' onClick={() => logOut()}>
                  Cerrar sesión
                </button>

              </div>
            </div>
          </div>
        )
      }
    </div>
      <div className={` ${darkMode ? 'bg-darkLittleHeader text-white' : 'bg-secondaryColor' } w-full md:h-[3.8vh] px-[2vw] flex flex-wrap justify-around`}>
        <ul className='flex flex-wrap justify-around text-sm w-[80vw]'>
        <Link to='/'>
          <li className='text-white font-light border-b-2 border-b-transparent hover:border-[#00B7EB] px-2 transition-all ease-in-out duration-200'>
              Inicio
          </li>
        </Link>

        <Link to='/categorias'>
          <li className='text-white font-light border-b-2 border-b-transparent hover:border-[#00B7EB] px-2 transition-all ease-in-out duration-200'>
              Categorias
          </li>
        </Link>


        </ul>
      </div>


  </div>
  )
}

export default Header
