import React from 'react'

function Header() {
  const darkMode = true;
  return (
  <div>
    <div className={` ${darkMode ? 'bg-darkPrimary text-white' : 'bg-primaryColor' } w-full h-[7.5vh]`}></div>
      <div className={` ${darkMode ? 'bg-darkLittleHeader text-white' : 'bg-secondaryColor' } w-full md:h-[3.8vh] px-[2vw] flex flex-wrap justify-around`}>
        <ul className='flex flex-wrap justify-around text-sm w-[80vw]'>
          <li className='text-white font-light'>
            <a>
              Categoria
            </a>
          </li>

          <li className='text-white font-light'>
            <a>
              Categoria
            </a>
          </li>

          <li className='text-white font-light'>
            <a>
              Categoria
            </a>
          </li>

          <li className='text-white font-light'>
            <a>
              Categoria
            </a>
          </li>

          <li className='text-white font-light'>
            <a>
              Categoria
            </a>
          </li>

          <li className='text-white font-light'>
            <a>
              Categoria
            </a>
          </li>

        </ul>
      </div>
  </div>
  )
}

export default Header
