import React, { useEffect, useState } from 'react'
import { useGeneralContext } from '../contexts/GeneralContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function EditProfile() {

    const {darkMode, userId,enqueueSnackbar} = useGeneralContext();
    const navigate = useNavigate()

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        descripcion: '',
        telefono:'',
        correo: '',
        id_img: ''
    })
    const [selectedFile, setSelectedFile] = useState(null);
    const urlEdit = `https://localhost:8082/users`

    const handleInputChange = (e) => {
        const {name, value} = e.target;
            setForm({
                ...form, [name]: value
            });
    };

    const fetchForm = async() => {
        const response = await axios.get('https://localhost:8082/usersEdit', {withCredentials:true})
        console.log(response.data)
        setForm(response.data[0])
    }

    useEffect(()=>{
        fetchForm()
    },[])

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };
    
    const handleDragLeave = () => {
        setDragging(false);
    };


    const handleInputFile = (e) => {
        const file = e.target.files[0];
            setSelectedFile(file)
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        setDragging(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(form.nombre.trim().length <= 0 || form.apellido.trim().length <= 0 || form.descripcion.trim().length <= 0 || form.telefono.trim().length <= 0 || form.correo.trim().length <= 0){
            enqueueSnackbar('Debe rellenar todos los campos', { variant: 'warning' });
            return
        }

        console.log(form)

        const formData = new FormData();
        formData.append('nombre', form.nombre);
        formData.append('apellido', form.apellido);
        formData.append('descripcion', form.descripcion);
        formData.append('telefono', form.telefono);
        formData.append('correo', form.correo);
        formData.append('id_img', form.id_img);
        if (selectedFile) {
            formData.append('foto', selectedFile);
        }

        try {
            const response = await axios.put(urlEdit, formData, {withCredentials: true});
            console.log(response.data)
            enqueueSnackbar('Editado correctamente', { variant: 'success' });
            navigate(`/perfil/${userId}/${encodeURI(form.nombre)}`)
        } catch (error) {
            console.error(error)
            enqueueSnackbar('Error al editar', { variant: 'success' });
        }
    }

    return (
        <>
        <div >
            <form className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:flex-row flex flex-col px-[5vw] py-[8vh] w-full`} 
                    onSubmit={handleSubmit}
                    encType="multipart/form-form"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
            >
                <div className=' justify-center items-center border-b-2 border-b-[#341CA7] md:h-[60vh] md:w-[28vw] rounded-sm transition ease-in-out border-t-2 border-t-transparent hover:border-[#341CA7] hover:border-2 hover:border-dashed duration-300 hover:border-t-[#341CA7]'>
                    <label htmlFor="dropzone" className={` ${darkMode ? ('bg-darkCardBg border-darkAccents') : ('bg-cardBg border-prices')}  h-full w-full flex flex-wrap justify-center items-center border-0 hover:bg-slate-300 rounded-sm transition ease-in-out duration-300 `}>
                    {selectedFile && (
                    <div className='flex flex-col items-center justify-center w-full h-full relative'>
                        <div className="relative w-full h-full mb-4 overflow-hidden">
                            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="absolute inset-0 w-full h-full object-contain" />
                        </div>
                        <p className='text-sm text-center w-full text-gray-500 flex justify-center absolute bottom-0 bg-slate-100 py-1'>{selectedFile.name}</p>
                    </div>
                    )}

                    {!selectedFile &&(
                        <div className='flex flex-col items-center justify-center w-full h-full relative'>
                                {
                                    form.profile_path ? (
                                        <div className="relative w-full h-full mb-4 overflow-hidden">
                                            <img src={`https://localhost:8082${form.profile_path}`} className="absolute inset-0 w-full h-full object-contain" />
                                        </div>
                                            ) : (
                                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                                <p className='text-sm text-center w-[60%] text-gray-500'>Haga click o arrastre y suelte aqui para agregar una foto</p>
                                            </div>
                                            )
                                }
                        </div>
                        )}
                    </label>
                    <input id="dropzone" type="file" accept='.png,.jpg' className="hidden" name='foto' onChange={handleInputFile}/>
                </div>
                <div className="flex flex-col  px-[4vw]   " onSubmit={handleSubmit}>
                    <div className="flex mt-[1.5vh]">
                        <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} mx-[2v] md:w-[20vw] p-[.3vw] font-semibold `}>Editar perfil</h1>
                    </div>
                    <div className='flex '>
                        <div className='py-[1.4vh] w-full'>
                            <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Nombre:</h2>
                                <input className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} w-full md:w-[23vw] md:h-[4vh] p-[1vw]   rounded-sm text-[#868686]`}
                                    placeholder='Nombre'
                                    name='nombre'
                                    value={form.nombre}
                                    onChange={handleInputChange}
                                />
                        </div>
                    <div className='py-[1.3vh] w-full  px-[4vw]' >
                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Apellido:</h2>
                                <input className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} w-full md:w-[23vw] md:h-[4vh] p-[1vw] rounded-sm text-[#868686]`}
                                    placeholder='Apellido'
                                    name='apellido'
                                    value={form.apellido}
                                    onChange={handleInputChange}
                                />
                                
                        </div>
                        
                   </div>
                        <h4 className='border-b-[#341CA7] md:w-[50vw] border-b-2 py-[1vh]'></h4>
                    <div className='py-[5vh] text-[#868686]'>
                    <h2 className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Descripción:</h2>
                            <div className='md:w-[50vw] md:h-[30vh]' >
                                <textarea className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput border-prices')} bg-[#F6F6F6] w-full md:h-[28vh] p-[1vw]`}
                                    placeholder='Escribe la descripción del usuario'
                                    name='descripcion'
                                    value={form.descripcion}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    
                            <div className="flex py-[1vh] ">
                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black')} pr-[5.2vw]`} >Teléfono:</h2>
                                <div>
                                    <input type='tel' className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} p-[1vw]  text-[#868686] md:w-[42vw] text-sm w-full md:h-[4vh] rounded-sm`}
                                        placeholder='9984117623'
                                        name='telefono'
                                        value={form.telefono}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                                
                            </div>
                           
                            <div className="flex justify-between py-[1vh] ">
                                    <h2  className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Correo electrónico:</h2>
                                    <input type='email' className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} p-[1vw]  text-[#868686] text-sm md:w-[42vw] md:h-[4vh] rounded-sm`}
                                        placeholder='ejemplo@gmail.com'
                                        name='correo'
                                        value={form.correo}
                                        onChange={handleInputChange}
                                    />
                            </div>
                        
                    
                        <div className="flex self-end justify-around py-[5vh] ">
                                <button className='bg-[#70C5BB] w-full md:w-[8vw] md:h-[4vh] rounded-sm text-white'>Guardar</button>
                        </div>
                        
                </div>  
    
            </form>
        </div>

        </>
    )
    }

export default EditProfile