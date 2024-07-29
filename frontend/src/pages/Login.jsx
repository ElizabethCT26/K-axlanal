import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useGeneralContext } from '../contexts/GeneralContext';

function Login() {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { login } = useGeneralContext();

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
    
    const handleSubmit = async (e) => {
        
        e.preventDefault(); 

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-\+><~&()])[A-Za-z\d@$~!%*?&\-\+><~&()]{8,}$/

        const validations = [
            {   isValid: emailPattern.test(data.email), message: 'Correo electrónico no válido' },
            {   isValid: passwordPattern.test(data.password), message: 'La contraseña debe contener al menos 8 caracteres, un caracter especial ( A-Za-z\d@$~!%*?&\-\+><~&() ), una letra mayuscula y un numero' },
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
    <div className='flex flex-col min-h-screen'>
    
  
    
        <div className='bg-[#40556D] w-full md:h-[3.8vh] px-[2vw] flex flex-wrap justify-around'>
        </div>
            <div className='  px-[5vw] w-full flex justify-center py-[8vh]'>
                <div className='bg-[#F6F6F6] md:w-[80vw] md:h-[79vh] flex justify-between'>
            
                   <form className='md:w-[50vw] py-[8vh] px-[5vw] ' onSubmit={handleSubmit}>
                   <h4 className='text-2xl text-[#022F40]'> °Iniciar sesión</h4>
                    <h4 className='border-[#304D6D] border-b-2 py-[.5vw] md:w-[14vw]'></h4>
                        <div className='py-[8vh] px-[3vw]'>
                            <h2>Correo electrónico</h2>
                            <input className='bg-[#D9D9D9] text-[#868686]  rounded-sm p-[1vh] w-full md:h-[4vh]'
                                type='email'
                                placeholder='ejemplo@gmail.com'
                                name='email'
                                value={data.email}
                                onChange={handleInputChange}
                                
                            />
                           
                        </div>
                            <div className='py-[2vh] px-[3vw]'>
                                <h2>Contraseña</h2>
                                <input className='bg-[#D9D9D9] text-[#868686] rounded-sm p-[1vh] w-full md:h-[4vh]'
                                    type='password'
                                    placeholder='********'
                                    name='password'
                                    value={data.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                                <div className='py-[2vh] px-[10vw]'>
                                    <button className='bg-[#526F8E] w-full  md:h-[4vh] text-sm rounded-sm text-white' type="submit">Iniciar Sesión</button>
                                    
                                </div>
                                <div className='py-[2vh] md:px-[11vw]'>
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

                                    </div>
                                </div>

                                
                        
                </div>
                

        </div>
  </div>

</>
  )
}

export default Login
