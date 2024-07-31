import React, { useEffect, useState } from 'react'
import { useGeneralContext } from '../contexts/GeneralContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function RecoverPassword() {
    const {darkMode, enqueueSnackbar} = useGeneralContext();
    const navigate = useNavigate();
    const params = useParams();

    const [confirmPassword, setConfirmPassword] = useState('')
    const [data, setData] = useState({
        email:'',
        newPassword: ''
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
            setData({
                ...data, [name]: value
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-\+><~&()])[A-Za-z\d@$~!%*?&\-\+><~&()]{8,}$/

        const validations = [
            {   isValid: emailPattern.test(data.email), message: 'Correo electrónico no válido' },
            {   isValid: passwordPattern.test(data.newPassword), message: 'La contraseña debe contener al menos 8 caracteres, un caracter especial ( A-Za-z\d@$~!%*?&\-\+><~&() ), una letra mayuscula, una minuscula y un numero' },
        ]

        for(let validation of validations){
            if(!validation.isValid){
                enqueueSnackbar(validation.message, { variant: 'error' });
                return;
            }
            
        }
            try {
                const response = axios.post('https://localhost:8082/restorepass', data);
                enqueueSnackbar('Correo enviado, debe llegar en momentos', { variant: 'success' })
                navigate('/login')
            } catch (error) {
                console.log(error)
                enqueueSnackbar('Algo ha salido mal, intenteoo mas tarde', { variant: 'error' })
            }

    }

    const handleSubmitToken = async () => {
        try {
            const response = axios.post('https://localhost:8082/verifyrestore', params);
            enqueueSnackbar('Contraseña cambiada correctamente', { variant: 'success' })
            navigate('/login')
        } catch (error) {
            enqueueSnackbar('Algo ha salido mal, intenteolo mas tarde', { variant: 'error' })
        }
    }

    useEffect(() => {
        if(params.token){
            handleSubmitToken()
        }
    },[])
  return (
    <>

        <div>
        <div className='  px-[5vw] w-full flex justify-center py-[8vh]'>
                <div className='bg-[#F6F6F6] md:w-[80vw] md:h-[79vh] flex justify-between'>
            
                   <form className='md:w-[50vw] py-[8vh] px-[5vw] ' onSubmit={handleSubmit}>
                   <h4 className='text-2xl text-[#022F40]'> °Restablecer contraseña</h4>
                    <h4 className='border-[#304D6D] border-b-2 py-[.5vw] md:w-[21vw]'></h4>
                        <div className='pt-[8vh] px-[3vw]'>
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
                                <h2>Contraseña nueva</h2>
                                <input className='bg-[#D9D9D9] text-[#868686] rounded-sm p-[1vh] w-full md:h-[4vh]'
                                    type='password'
                                    placeholder='********'
                                    name='newPassword'
                                    value={data.newPassword}
                                    onChange={handleInputChange}
                                  
                                />
                            </div>
                            <div className='py-[2vh] px-[3vw]'>
                                <h2> Confirmar contraseña</h2>
                                <input className='bg-[#D9D9D9] text-[#868686] rounded-sm p-[1vh] w-full md:h-[4vh]'
                                    type='password'
                                    placeholder='********'
                                    name='confirmPassword'
                                    value = {confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                  
                                />
                            </div>
                                <div className='py-[2vh] px-[8vw]'>
                                    <button className='bg-[#526F8E] w-full md:h-[4vh] text-sm rounded-sm text-white' type="submit">Recuperar contraseña</button>
                                    
                                </div>
                                <div className='py-[2vh] px-[8vw]'>
                                    <Link to='/login' className='text-blue-500 w-full md:h-[4vh] text-sm rounded-sm flex justify-center items-center' type="submit">¿Iniciar sesión?</Link>
                                    
                                </div>
                              
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

export default RecoverPassword
