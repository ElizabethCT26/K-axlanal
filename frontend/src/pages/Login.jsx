import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGeneralContext } from '../contexts/GeneralContext';

function Login() {
    const {darkMode} = useGeneralContext(false);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { login } = useGeneralContext();
    const [secret, setSecret] = useState(false); 



    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const url = 'https://localhost:8082/login'


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data, [name]: value
        })

    };

    

    const handleShow = () => {
        setSecret(!secret)
    }
    
    const handleSubmit = async (e) => {
        
        e.preventDefault(); 

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-\+><~&()])[A-Za-z\d@$~!%*?&\-\+><~&()]{8,}$/

        const validations = [
            {   isValid: emailPattern.test(data.email), message: 'Correo electrónico no válido' },
            {   isValid: passwordPattern.test(data.password), message: 'La contraseña debe contener al menos 8 caracteres, un caracter especial ( A-Za-z\d@$~!%*?&\-\+><~&() ), una letra mayuscula, una minuscula y un numero' },
        ]

        for(let validation of validations){
            if(!validation.isValid){
                enqueueSnackbar(validation.message, { variant: 'error' });
                return;
            }
            
        }
        

        try{
            const response = await axios.post(url, data, {
                withCredentials: true
            });
            console.log(response)
                enqueueSnackbar('Has iniciado sesion correctamente!', { variant: 'success' });
                login(response.data);
                navigate('/');
        } catch(error){
            if(error.response.status == 404){
                enqueueSnackbar('No se ha encontrado a este usuario', { variant: 'warning' });
            } else if (error.response.status == 401){
                enqueueSnackbar('Contraseña incorrecta', { variant: 'error' });
            } else {
                enqueueSnackbar('Algo ha salido mal', { variant: 'error' });
            }
            }
        }
  return (
    <>
    <div className= {` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex flex-col min-h-screen`}>
    
  
    
        <div className=' w-full  px-[2vw] flex h-full flex-wrap justify-around'>
        </div>
            <div className= 'px-[5vw] w-full h-full flex justify-center py-[8vh]'>
                <div className={` ${darkMode ? ('bg-zinc-900 border-darkCardBg') : ('bg-colorBanner ')} md:w-[80vw] md:h-[79vh] flex justify-between`}>
            
                   <form className='md:w-[50vw] py-[8vh] px-[5vw] ' onSubmit={handleSubmit}>
                   <h4 className={` ${darkMode ? ('text-white ') : ('text-[#022F40]')} text-2xl `}> °Iniciar sesión</h4>
                    <h4 className='border-[#304D6D] border-b-2 py-[.5vw] md:w-[14vw]'></h4>
                        <div className='py-[8vh] px-[3vw]'>
                            <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`}>Correo electrónico</h2>
                            <input className={` ${darkMode ? ('bg-zinc-700 text-white') : ('bg-colorBanner text-black')}  rounded-sm p-[1vh] px-[1vw] w-full md:h-[6vh]`}
                                type='email'
                                placeholder='ejemplo@gmail.com'
                                name='email'
                                value={data.email}
                                onChange={handleInputChange}
                                
                            />
                           
                        </div>
                            <div className='py-[2vh] px-[3vw] relative'>
                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`}>Contraseña</h2>
                                <input className={` ${darkMode ? ('bg-zinc-700 text-white') : ('bg-colorBanner text-black')}  rounded-sm p-[1vh] px-[1vw] w-full md:h-[6vh]`}
                                    type={ secret ? 'password' : 'text' }
                                    placeholder='********'
                                    name='password'
                                    value={data.password}
                                    onChange={handleInputChange}
                                />
                                <button type='button' className='absolute left-[87%] bottom-[25%] ' onClick={() => handleShow()}>{ secret ? ( 
                                (<svg width="25%" height="20%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                        <path d="M84.48,324.023C64.241,307.903 42.097,281.593 19.907,247.919C38.961,219.393 60.063,190.534 90.331,163.84C121.337,136.496 158.962,114.989 193.868,107.15C234.712,97.977 264.744,95.35 297.326,100.937L255.634,148.48C236.039,150.909 218.318,155.957 205.897,165.303C193.728,175.758 183.949,186.896 177.371,198.949C170.994,211.96 166.589,225.366 164.206,239.177L84.48,324.023Z" />
                                        <path d="M91.096,389.342L394.2,71.61L428.138,106.719L397.711,141.242C432.57,164.771 466.584,199.282 499.526,247.738C475.371,287.498 444.595,321.298 407.658,349.553C377.033,371.976 343.19,386.355 306.429,393.439C256.996,403.594 211.194,398.969 168.92,379.98L123.864,425.621L91.096,389.342ZM211.636,334.339C238.862,351.301 269.45,352.291 302.918,339.605C321.349,329.706 335.722,315.926 344.791,298.224C356.324,274.513 358.71,252.07 354.784,236.458C351.011,221.455 346.589,209.061 342.304,197.637L313.45,229.013C315.046,235.427 316.008,242.262 316.376,249.493C315.616,260.394 315.313,269.367 310.053,280.267C304.584,291.602 292.292,301.42 276.001,305.082C264.162,307.17 252.085,307.121 239.722,304.497L211.636,334.339Z"/>
                                    </svg>))
                                
                                 : (<svg width="25%" height="20%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                    <g transform="matrix(1.06488,0,0,1.06488,-114.749,-9.09595)">
                                        <path d="M126.266,241.302C240.045,61.07 439.883,46.531 576.694,241.566C456.051,435.925 230.877,420.125 126.266,241.302ZM350.972,147.991C299.381,147.991 257.495,189.877 257.495,241.468C257.495,293.059 299.381,334.945 350.972,334.945C402.563,334.945 444.448,293.059 444.448,241.468C444.448,189.877 402.563,147.991 350.972,147.991ZM351.108,185.414C382.212,185.414 407.465,210.667 407.465,241.772C407.465,272.876 382.212,298.129 351.108,298.129C320.003,298.129 294.75,272.876 294.75,241.772C294.75,210.667 320.003,185.414 351.108,185.414Z" />
                                    </g>
                                </svg>)} </button>
                            </div>
                                <div className='py-[2vh] px-[10vw]'>
                                    <button className='bg-[#526F8E] w-full  md:h-[4vh] text-sm rounded-sm text-white' type="submit">Iniciar Sesión</button>
                                    
                                </div>
                                <div className={` ${darkMode ? ('text-white ') : ('text-black')}py-[2vh] md:px-[11vw]`}>
                                    <h2 className='md:w-[20vw] flex items-center justify-center'>
                                        ¿No tiene una cuenta?
                                        <Link to='/registro' className='text-[#F10000] ml-2'>Registrarse</Link>
                                    </h2>
                                   
                                </div>
                                {/*<div>
                                    <Link to='/restablecer-contraseña' className='text-blue-500 w-full flex items-center px-[13vw] justify-center'>
                                            ¿Olvidaste tu contraseña?
                                        
                                        </Link>
                                </div>*/}
                   </form>
                                <div className='md:w-[35vw]'>
                                    <div className='bg-[#D9D9D9] md:w-[35vw] md:h-[79vh] '>
                                        <img  className='w-full h-full object-cover' src='https://www.mexicodesconocido.com.mx/wp-content/uploads/2021/06/cultura-de-mexico-depositphotos.jpg'/>

                                    </div>
                                </div>

                                
                        
                </div>
                

        </div>
  </div>

</>
  )
}

export default Login
