import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useGeneralContext } from '../contexts/GeneralContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';

function CreateStore() {

    const {darkMode} = useGeneralContext();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [selectedProfile, setSelectedProfile] = useState();
    const [selectedBanner, setSelectedBanner] = useState();
    const params = useParams();
    const [edit, setEdit] = useState(false)

    const urlPost = 'http://localhost:8082/stores'
    const urlEdit = `http://localhost:8082/stores/${params.id}/`

    const bizUrl = 'http://localhost:8082/biz'
    const [bizaAreas, setBizAreas] = useState([]);
    const [data,setData] = useState({
        nombre:'',
        descripcion:'',
        id_propietario:'',
        contacto:'',
        id_img:'',
        id_areaComercial: ''
    })

    
    const handleInputProfile = (e) => {
        const file = e.target.files[0];
            setSelectedProfile(file)
    };

    const handleInputBanner = (e) => {
        const file = e.target.files[0];
            setSelectedBanner(file)
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
            setData({
                ...data, [name]: value
            });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };
    
    const handleDragLeave = () => {
        setDragging(false);
    };

    
    const handleDropProfile = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedProfile(file);
        setDragging(false);
    };

    const handleDropBanner = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedBanner(file);
        setDragging(false);
    };

    const fetchBizAreas = async() => {
        try {
            const response = await axios.get(bizUrl)
            console.log(response.data);
            setBizAreas(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        const validations = [
            {   isValid: data.nombre.trim().length > 0, message: 'Por favor ingrese un nombre' },
            {   isValid: data.descripcion.trim().length > 0, message: 'Por favor, ingrese una descripcion' },
            {   isValid: data.contacto.trim().length > 0, message: 'Por favor, ingrese un precio' },
            {   isValid: data.id_areaComercial.toString().trim().length > 0, message: 'Por favor, ingrese una cantidad' },
        ]

        for(let validation of validations){
            if(!validation.isValid){
                enqueueSnackbar(validation.message, { variant: 'error' });
                return;
            }
            
        }

        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('descripcion', data.descripcion);
        formData.append('id_categoria', data.id_categoria);
        formData.append('id_propietario', data.id_propietario);
        if (selectedProfile) {
            formData.append('fotos', selectedProfile);
        }
        if (selectedBanner) {
            formData.append('fotos', selectedBanner);
        }

        try{
            if(!edit){
                const response = await axios.post(urlPost, formData);
                enqueueSnackbar('Tienda agregada exitosamente!', { variant: 'success' });
                navigate(`/tienda/${response.data.id}`)
            } else {
                {/* const response = await axios.put(urlEdit, formData);
                enqueueSnackbar('Has agregado un producto!', { variant: 'success' });
                navigate(`/tienda/${data.id_tienda}`) */}
            }
                
        } catch(error){
            console.error(error)
                enqueueSnackbar('No se ha podido agregar la tienda', { variant: 'warning' });
            }
        
        
    }

    useEffect(() => {
        const userId = sessionStorage.getItem('userId')
        setData({
            ...data, id_propietario: userId
        });
        fetchBizAreas();
    }, [])

  return (
    <>
    <div>
    
    <Header/>
        <form className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex px-[5vw] py-[8vh] w-full`} onSubmit={handleSubmit}>
       <div className='flex flex-col py-[4vh] '>
            <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')}  justify-between border border-b-[#341CA7] md:h-[25vh] sm:h-[20vh] md:w-[28vw] sm:w-[18vw] transition ease-in-out border-t-2 border-t-transparent hover:border-[#341CA7] hover:border-2 hover:border-dashed duration-300 hover:border-t-[#341CA7`}>
                <label htmlFor="dropzone-profile" className={` ${darkMode ? ('bg-darkCardBg border-darkAccents') : ('bg-cardBg border-prices')}  h-full w-full flex flex-wrap justify-center items-center border-0 hover:bg-slate-300 rounded-sm transition ease-in-out duration-300 `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDropBanner}
                >
                    {!selectedBanner &&(
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                                <p className='text-sm text-center w-[60%] text-gray-500'>Haga click o arrastre y suelte aqui para agregar una foto</p>
                        </div>
                        )}
                    {selectedBanner && (
                    <div className='flex flex-col items-center justify-center w-full h-full relative'>
                        <div className="relative w-full h-full mb-4 overflow-hidden">
                            <img src={URL.createObjectURL(selectedBanner)} alt="Selected" className="absolute inset-0 w-full h-full object-contain" />
                        </div>
                        <p className='text-sm text-center w-full text-gray-500 flex justify-center absolute bottom-0 bg-slate-100 py-1'>{selectedBanner.name}</p>
                    </div>
                    )}
                    </label>
                    <input id="dropzone-profile" type="file" className="hidden" name='fotos' onChange={handleInputBanner}/>
            </div>
            <div className='py-[4vh]'>
            <div className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorBanner ')} justify-between border  border-b-[#341CA7] md:h-[60vh] sm:h-[20vh] md:w-[28vw] sm:w-[18vw]transition ease-in-out border-t-2 border-t-transparent hover:border-[#341CA7] hover:border-2 hover:border-dashed duration-300 hover:border-t-[#341CA7`}>
                

            <label htmlFor="dropzone" className={` ${darkMode ? ('bg-darkCardBg border-darkAccents') : ('bg-cardBg border-prices')}  h-full w-full flex flex-wrap justify-center items-center border-0 hover:bg-slate-300 rounded-sm transition ease-in-out duration-300 `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDropProfile}
            >
                {!selectedProfile &&(
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                            <p className='text-sm text-center w-[60%] text-gray-500'>Haga click o arrastre y suelte aqui para agregar una foto</p>
                    </div>
                    )}
                {selectedProfile && (
                <div className='flex flex-col items-center justify-center w-full h-full relative'>
                    <div className="relative w-full h-full mb-4 overflow-hidden">
                        <img src={URL.createObjectURL(selectedProfile)} alt="Selected" className="absolute inset-0 w-full h-full object-contain" />
                    </div>
                    <p className='text-sm text-center w-full text-gray-500 flex justify-center absolute bottom-0 bg-slate-100 py-1'>{selectedProfile.name}</p>
                </div>
                )}
                </label>
                <input id="dropzone" type="file" className="hidden" name='fotos' onChange={handleInputProfile}/>


            </div>
            </div>
       </div>
            <div className="flex flex-col  px-[4vw] ">
                <div className="flex justify-between mt-[1.5vh]">
                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black')} mx-[2v] md:w-[20vw] p-[.3vw] font-semibold`}>Crear tienda</h1>
                </div>
                <div >
                    <input className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput ')} md:w-[25vw] md:h-[4vh] p-[1vw] rounded-sm text-[#868686]`}
                        placeholder='Escribe el titulo de la tienda'
                        name="nombre"
                        value={data.nombre}
                        onChange={handleInputChange}
                    />
                    <h4 className='border-b-[#341CA7] md:w-[25vw] border-b-2 py-[1vh]'></h4>
                </div>
                <div className='pt-[5vh] text-[#868686]'>
                        <div className='md:w-[50vw] md:h-[30vh]' >
                            <textarea className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput border-prices')} bg-[#F6F6F6] md:w-[53vw] md:h-[28vh] py-[1vh] px-[1vw]`}
                                placeholder='Escribe la descripción de la tienda'
                                name="descripcion"
                                value={data.descripcion}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='text-[#868686]'>
                        <div className='md:w-[53vw]' >
                            <label  className='text-black flex flex-wrap justify-between'> 
                                <h2>Telefono: : </h2>
                                <input className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput border-prices')} bg-[#F6F6F6] md:w-[42vw] py-[.5vh] px-[1vw]`}
                                    placeholder='Escribe la descripción de la tienda'
                                    name="contacto"
                                    value={data.contacto}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                    </div>
                 

                        <div className="flex justify-between py-[1vh] ">
                                <h2  className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Categorías principales:</h2>
                                <label>
                                    <select  className={` ${darkMode ? ('bg-darkCardBg border-darkCardBg') : ('bg-colorInput')} px-[1vw] text-[#868686] text-sm md:w-[42vw] md:h-[4vh] rounded-sm`}
                                            name="id_areaComercial"
                                            value={data.id_areaComercial}
                                            onChange={handleInputChange}>
                                                <option value='' disabled>~~~ Seleccione una categoría ~~~</option>
                                        {
                                            bizaAreas && (
                                                bizaAreas.map((biz, index)=>(
                                                    <option key={index} value={biz.id}>{biz.nombre}</option>
                                                ))
                                            )
                                        }
                                    </select>
                                </label>
                        </div>
                        {  /* <div className="flex justify-between py-[1vh] ">
                                <h2  className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Seleccione la ubicación:</h2>
                                <button className={` ${darkMode ? ('bg-darkBottom border-darkBottom') : ('bg-colorBottom ')} md:w-[10vw] text-center text-white `}>Usar ubicación</button>
                        </div>
                        <div className="flex justify-between py-[1vh] ">
                                <h2  className={` ${darkMode ? ('text-white ') : ('text-black')}`} >Seleccione la ubicación de origen:</h2>
                                <button className={` ${darkMode ? ('bg-darkBottom border-darkBottom') : ('bg-colorBottom ')} md:w-[10vw] text-center text-white`}>Usar ubicación</button>
                        </div> */}
                    
                   
                    <div className="flex self-end justify-around py-[5vh] ">
                            <button className='bg-[#70C5BB] md:w-[8vw] md:h-[4vh] rounded-sm text-white'>Guardar</button>
                    </div>
                    
            </div>  

        </form>
    </div>
    <Footer/>
    </>
  )
}

export default CreateStore
