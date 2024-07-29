import React from 'react'
import { useGeneralContext } from '../contexts/GeneralContext';
import { Link } from 'react-router-dom';


function Profile() {
    const {darkMode} = useGeneralContext();
    return (
        <>
        <div>
        
  
            <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:flex-row flex-col flex px-[5vw] py-[8vh] w-full`} >
        <div className='flex flex-col py-[4vh] '>
                <div className='py-[4vh]'>
                <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} py-[2vh] justify-between border  border-b-[#341CA7] md:h-[60vh] sm:h-[20vh] md:w-[28vw] sm:w-[18vw] px-[5vw]`}>
                    <h4 className='text-[#ABABAB] flex justify-center items-center '>Seleccionar foto de perfil</h4>
                </div>
                </div>
        </div>
                <form className="flex flex-col  px-[4vw] ">
                    <div className="flex justify-between mt-[1.5vh]">
                        <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} mx-[2v] md:w-[20vw] p-[.3vw] font-semibold `}>Perfil</h1>
                    </div>
                    <div className='flex '>
                        <div className='py-[1.4vh] w-full'>
                        <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Maria Elizabeth Chuc Tun</h2>
                            
                               
                        </div>
                    
                        
                   </div>
                        <h4 className='border-b-[#341CA7] md:w-[50vw] border-b-2 py-[1vh]'></h4>
                    <div className='py-[5vh] text-[#868686] ]'>
                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} text-justify flex flex-col md:flex-row w-full  md:w-[55vw] p-[.3vw] `}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna ligula, scelerisque a lacus in, faucibus varius velit. Nullam pharetra condimentum mauris. Nunc dignissim imperdiet imperdiet. In et dui nisi. Maecenas scelerisque non ex vitae imperdiet. Nam fermentum augue volutpat enim accumsan mattis. Fusce tincidunt turpis non lectus commodo, sit amet ullamcorper dui rhoncus.

Nunc consectetur imperdiet bibendum. Proin sollicitudin molestie nisi, eget condimentum arcu placerat eu. Aliquam et pharetra arcu. Aenean ante odio, elementum id urna quis, tempor fringilla dolor. Sed porta convallis dui ullamcorper venenatis. Morbi eu nisl faucibus, varius diam vitae, dapibus est. Donec vitae urna pellentesque, posuere neque non, ultrices lorem. Sed ac dolor vel tortor rutrum rhoncus id ut dolor. Curabitur scelerisque dui hendrerit est tempor, eu scelerisque magna bibendum. Aliquam sed ultrices ante. Quisque erat odio, gravida et nibh ac, eleifend blandit ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam risus tellus, aliquet in urna sed, cursus laoreet mi. Aenean lacinia lobortis est sodales hendrerit. Phasellus quis mauris in ante pretium aliquam at et ligula. Proin magna tellus, commodo non risus quis, ornare fermentum est.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam tincidunt vitae dui vel varius. Nulla commodo consectetur fermentum. Donec porta diam sed velit sagittis feugiat. Etiam a vulputate dolor. Praesent iaculis velit sed magna convallis congue. Duis ullamcorper, neque a tincidunt vulputate, enim neque efficitur quam, id facilisis metus purus quis erat. Sed ut metus tortor. Etiam sit amet tellus nec risus tristique mollis vitae ac libero.

</h1>
                            
                        </div>
                    
                            <div className="flex py-[1vh] justify-between">
                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Teléfono:</h2>
                                <div>
                                    <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >9984117524</h2>
                                </div>
                                                
                            </div>
                            <div className="flex justify-between py-[1vh] ">
                                    <h2  className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Correo electrónico:</h2>
                                    <div>
                                    <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >mariachuc@gmail.com</h2>
                                </div>
                                    
                            </div>
                        
                            <div className='flex self-end '>
                            <div className="flex self-end justify-around px-2 py-[5vh] ">
                                <Link to='/editar-perfil'><button className='bg-[#3b5998] w-full md:w-[8vw] md:h-[4vh] rounded-sm text-white'>Editar perfil</button></Link>
                        </div>
                    
                       
                            </div>
                        
                </form>  
    
            </div>
        </div>
 
        </>
    )
    }

export default Profile
