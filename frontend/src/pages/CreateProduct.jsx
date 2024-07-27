import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useGeneralContext } from '../contexts/GeneralContext';
import { useNavigate, useParams } from 'react-router-dom';


function CreateProduct() {

    const params = useParams();
    const navigate = useNavigate();

    const urlPost = 'https://localhost:8082/products'
    const urlEdit = `https://localhost:8082/products/${params.id}/`
    
    const [edit, setEdit] = useState(false);

    const {darkMode} = useGeneralContext();

    const { enqueueSnackbar } = useSnackbar();
    
    const [categories, setCategories] = useState([]);
    const urlGetCategories = 'https://localhost:8082/categories';

    const [selectedFile, setSelectedFile] = useState(null);
    const [editImg, setEditImg] = useState('')
    const [dragging, setDragging] = useState(false);

    const [data, setData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad: '',
        id_propietario:'',
        id_categoria: '',
    })
    const fetchCategories = async () => {
        const response = await axios.get(urlGetCategories);
        setCategories(response.data);
    }

    const fetchEditInfo = async (editId) => {
        try {
            const response = await axios.get(`https://localhost:8082/products/${editId}/edit`)
            console.log(response.data[0])
            setData(response.data[0])
            setEditImg(response.data[0].img_path);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        if(params.id){
            setEdit(true);
            fetchEditInfo(params.id)
        }
        fetchCategories();
        setData({
            ...data, id_propietario: sessionStorage.getItem('userId')
        });
    },[])

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };
    
    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
            setData({
                ...data, [name]: value
            });
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
        e.preventDefault();
        const validations = [
            {   isValid: data.nombre.trim().length > 0, message: 'Por favor ingrese un nombre' },
            {   isValid: data.descripcion.trim().length > 0, message: 'Por favor, ingrese una descripcion' },
            {   isValid: data.precio.trim().length > 0, message: 'Por favor, ingrese un precio' },
            {   isValid: data.cantidad.toString().trim().length > 0, message: 'Por favor, ingrese una cantidad' },
            {   isValid: data.id_categoria.toString().trim().length > 0, message: 'Por favor, seleccione una categoria' },
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
        formData.append('precio', data.precio);
        formData.append('cantidad', data.cantidad);
        formData.append('id_categoria', data.id_categoria);
        formData.append('id_propietario', data.id_propietario);
        if (selectedFile) {
            formData.append('foto', selectedFile);
        }

        try{
            if(!edit){
                const response = await axios.post(urlPost, formData);
                enqueueSnackbar('Has agregado un producto!', { variant: 'success' });
                navigate(`/tienda/${response.data.id}`)
            } else {
                const response = await axios.put(urlEdit, formData);
                enqueueSnackbar('Has agregado un producto!', { variant: 'success' });
                navigate(`/tienda/${data.id_tienda}`)
            }
                
        } catch(error){
            console.error(error)
                enqueueSnackbar('No se ha podido agregar el producto', { variant: 'warning' });
            }
        
        
    }

  return (
    <>
 
    <div>
        <form className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} px-[5vw] py-[8vh] w-full md:flex-row flex flex-col  `}
    
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
        >
            <div className=' justify-center items-center border-b-2 border-b-[#341CA7] md:h-[60vh] md:w-[28vw] rounded-sm transition ease-in-out border-t-2 border-t-transparent hover:border-[#341CA7] hover:border-2 hover:border-dashed duration-300 hover:border-t-[#341CA7]'>
                <label htmlFor="dropzone" className={` ${darkMode ? ('bg-darkCardBg border-darkAccents') : ('bg-cardBg border-prices')}  h-full w-full flex flex-wrap justify-center items-center border-0 hover:bg-slate-300 rounded-sm transition ease-in-out duration-300 `}>
                {!selectedFile && !edit && (
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                            <p className='text-sm text-center w-[60%] text-gray-500'>Haga click o arrastre y suelte aqui para agregar una foto</p>
                    </div>
                    )}
                {selectedFile && (
                <div className='flex flex-col items-center justify-center w-full h-full relative'>
                    <div className="relative w-full h-full mb-4 overflow-hidden">
                        <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="absolute inset-0 w-full h-full object-contain" />
                    </div>
                    <p className='text-sm text-center w-full text-gray-500 flex justify-center absolute bottom-0 bg-slate-100 py-1'>{selectedFile.name}</p>
                </div>
                )}

                {edit && !selectedFile &&(
                    <div className='flex flex-col items-center justify-center w-full h-full relative'>
                                    <div className="relative w-full h-full mb-4 overflow-hidden">
                                        <img src={`https://localhost:8082${data.img_path}`} alt="Selected" className="absolute inset-0 w-full h-full object-contain" />
                                    </div>
                                </div>
                                )}
                </label>
                <input id="dropzone" type="file" className="hidden" name='foto' onChange={handleInputFile}/>
            </div>
            <div className="flex flex-col  px-[4vw] ">
                <div className="flex justify-between mt-[1.5vh]">
                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black ')} mx-[2v] w-full p-[.3vw] font-semibold`}>{edit ? ('Editar producto') : ('Crear un producto') }</h1>
                </div>
                <div >
                    <input className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorInput ')} bg-[#F6F6F6] w-full  md:w-3/6 h-[6vh] p-[1vw] rounded-sm text-[#868686]`}
                        placeholder='Escribe el titulo del producto'
                        name='nombre'
                        value={data.nombre}
                        onChange={handleInputChange}
                    />
                    <h4 className='border-b-[#341CA7] md:w-[25vw] border-b-2 py-[1vh]'></h4>
                </div>
                <div className='pt-[5vh] text-[#868686]'>
                        <div className='md:w-[50vw] md:h-[30vh]' >
                        <h2 className={` ${darkMode ? ('text-white ') : ('text-black ')}` } >Descripción:</h2>
                            <textarea className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorInput ')} bg-[#F6F6F6] w-full md:h-[28vh] p-2`}
                                placeholder='Escribe la descripción del producto'
                                name='descripcion'
                                value={data.descripcion}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-between gap-[2.5vw] py-5">
                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black ')}` } >Categoría:</h2>
                                <select
                                    name='id_categoria' 
                                    className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorInput ')}bg-[#F6F6F6] px-[1vw] text-[#868686] text-sm md:w-[40vw] w-full md:h-[4vh] rounded-sm`}
                                    value={data.id_categoria}
                                    onChange={handleInputChange}
                                >
                                    <option value='' disabled>~~~ Seleccione una categoría ~~~</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.id}>{category.nombre}</option>
                                    ))}
                                </select>

                        </div>
                 
                      <div className='flex justify-between flex-col  md:flex-row'>
                        <div className="flex py-[1vh]">
                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black ')} pr-[1.8vw]`}  >Precio:</h2>
                                <div>
                                    <input className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorInput ')}  p-[1vw]  text-[#868686] text-sm md:w-[20vw] w-full md:h-[2vh] rounded-sm`}
                                        placeholder='$90.00'
                                        name='precio'
                                        value={data.precio}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                                
                            </div>
                            <div className="flex py-[1vh]">
                                <h2 className={` ${darkMode ? ('text-white ') : ('text-black ')}` } >Cantidad:</h2>
                                <div>
                                    <input className={` ${darkMode ? ('bg-darkCardBg ') : ('bg-colorInput ')} bg-[#F6F6F6] p-[1vw]  text-[#868686] text-sm md:w-[15vw] w-full md:h-[2vh] rounded-sm`}
                                        placeholder='1'
                                        name='cantidad'
                                        value={data.cantidad}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                                
                            </div>
                      </div>
                    <div className="flex self-end justify-around p-[4vw] px-[.1vw] ">
                            <button className='bg-[#70C5BB] w-full md:w-[8vw]  md:h-[4vh] rounded-sm text-white' onClick={handleSubmit}>Guardar</button>
                    </div>
                    
                 
                    
            </div>  

        </form>
    </div>

    </>
  )
}

export default CreateProduct