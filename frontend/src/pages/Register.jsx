import React, { useState } from 'react'
import Footer from '../components/Footer'
import { useSnackbar } from 'notistack';
import axios from 'axios'

function Register() {
    const { enqueueSnackbar } = useSnackbar();

    const [data, setData] = useState({
        email: '',
        password: '',
        nombre: '',
        apellido: '',
        telefono: '',
        id_tipo: 2
    })

    const url = 'http://localhost:8082/register'


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
            {   isValid: data.nombre.trim().length > 0, message: 'Correo electrónico no válido' },
            {   isValid: data.apellido.trim().length > 0, message: 'Correo electrónico no válido' },
            {   isValid: data.telefono.trim().length > 0, message: 'Telefono no válido' }
        ]

        for(let validation of validations){
            if(!validation.isValid){
                enqueueSnackbar(validation.message, { variant: 'error' });
                return;
            }
            
        }
        

        try{
            const response = await axios.post(url, data);
            
                enqueueSnackbar('Gracias por registrarte!', { variant: 'success' });
        } catch(error){
            if(error.response.status == 409){
                enqueueSnackbar('Esta cuenta de correo ya ha sido registrada', { variant: 'warning' });
            } else {
                enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
            }
        }

        
            
        console.log(data)
    }

  return (
    <>
        <div>
            <div className='bg-[#022F40] w-full h-[7.5vh]'>
                <h2 className='text-white text-xl px-[3vh]'>K'axlanal</h2>
            </div>
            <div className='bg-[#40556D] w-full md:h-[3.8vh] px-[2vw] flex flex-wrap justify-around'>
            </div>
           <div className='  px-[5vw] w-full flex justify-center py-[8vh]'>
                <form className='bg-[#F6F6F6] md:w-[80vw] md:h-[79vh] flex justify-between' onSubmit={handleSubmit}>
               
                    <div className='md:w-[35vw]  '>
                        <div className='bg-[#D9D9D9] md:w-[35vw] md:h-[79vh]'>
                        </div>
                    </div>
                            <div className='flex flex-col px-[5vw] py-[4vh] '>
                            <h4 className='text-2xl text-[#022F40]'> °Registrarse</h4>
                            <h4 className='border-[#304D6D] border-b-2 py-[.5vw] md:w-[14vw]'></h4>
                                <div className='py-[2vh] '>
                                    <h2>Nombre</h2>
                                    <input className='bg-[#D9D9D9] text-[#868686]  rounded-sm p-[1vh] md:w-[30vw] md:h-[4vh]'
                                        type='text'
                                        placeholder='Juana Maria'
                                        name="nombre"
                                        value={data.nombre}
                                        onChange={handleInputChange}
                                        
                                    />
                                    
                                </div>
                                    <div className='py-[1vh] '>
                                        <h2>Apellido</h2>
                                        <input className='bg-[#D9D9D9] text-[#868686] rounded-sm p-[1vh] md:w-[30vw] md:h-[4vh]'
                                            type='text'
                                            placeholder='López Sanchez'
                                            name="apellido"
                                            value={data.apellido}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                        <div className='py-[1vh] '>
                                            <h2>Correo</h2>
                                            <input className='bg-[#D9D9D9] text-[#868686] rounded-sm p-[1vh] md:w-[30vw] md:h-[4vh]'
                                                type='email'
                                                placeholder='Ejemplo@gmail.com'
                                                name="email"
                                                value={data.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                            <div className='py-[1vh] '>
                                                <h2>Contraseña</h2>
                                                <input className='bg-[#D9D9D9] text-[#868686] rounded-sm p-[1vh] md:w-[30vw] md:h-[4vh]'
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                                <div className='py-[1vh] '>
                                                    <h2>Teléfono</h2>
                                                    <input className='bg-[#D9D9D9] text-[#868686] rounded-sm p-[1vh] md:w-[30vw] md:h-[4vh]'
                                                        type='tel'
                                                        name="telefono"
                                                        value={data.telefono}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className='py-[2vh] px-[10vw]'>
                                                    <button className='bg-[#526F8E] md:w-[10vw] md:h-[4vh] text-sm rounded-sm text-white'>Registrarse</button>
                                                    
                                                </div>
                                                <div className='py-[2vh] px-[7vw]'>
                                                    <h2 className='md:w-[20vw] flex items-center'>
                                                        ¿Ya tienes cuenta?
                                                        <button className='text-[#F10000] ml-2'>Iniciar sesión</button>
                                                    </h2>
                                                </div>
                                                                    
                                            </div>
                        
                    </form>
            </div>
        
        </div>
        <Footer/>
    </>
  )
}

export default Register

