import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios'
import { useSnackbar } from 'notistack';

function CreateProduct() {

    
    const { enqueueSnackbar } = useSnackbar();
    const urlPost = 'http://localhost:8082/products';
    const [categories, setCategories] = useState([]);
    const urlGetCategories = 'http://localhost:8082/categories';

    const [selectedFile, setSelectedFile] = useState(null);
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

    useEffect(()=>{
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
        console.log(file)
        setSelectedFile(file);
        setDragging(false);
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validations = [
            {   isValid: data.nombre.trim().length > 0, message: 'Por favor ingrese un nombre' },
            {   isValid: data.descripcion.trim().length > 0, message: 'Por favor, ingrese una descripcion' },
            {   isValid: data.precio.trim().length > 0, message: 'Por favor, ingrese un precio' },
            {   isValid: data.cantidad.trim().length > 0, message: 'Por favor, ingrese una cantidad' },
            {   isValid: data.id_categoria.trim().length > 0, message: 'Por favor, seleccione una categoria' },
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
            const response = await axios.post(urlPost, formData);
                enqueueSnackbar('Has agregado un producto!', { variant: 'success' });
                
        } catch(error){
            console.error(error)
                enqueueSnackbar('No se ha podido agregar el producto', { variant: 'warning' });
            }
        
        
    }

  return (
    <>
    <Header/>
    <div>
        <form className='flex px-[5vw] py-[8vh] w-full'  onSubmit={handleSubmit} encType="multipart/form-data"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
        >
            <div className=' justify-center items-center border-b-2 border-b-[#341CA7] md:h-[60vh] md:w-[28vw] rounded-sm transition ease-in-out border-t-2 border-t-transparent hover:border-[#341CA7] hover:border-2 hover:border-dashed duration-300 hover:border-t-[#341CA7]'>
                <label htmlFor="dropzone" className='bg-slate-100 h-full w-full flex flex-wrap justify-center items-center border-0 hover:bg-slate-300 rounded-sm transition ease-in-out duration-300'>
                {!selectedFile && (
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
                </label>
                <input id="dropzone" type="file" className="hidden" name='foto' onChange={handleInputFile}/>
            </div>
            <div className="flex flex-col  px-[4vw] ">
                <div className="flex justify-between mt-[1.5vh]">
                    <h1 className="mx-[2v] md:w-[20vw] p-[.3vw] font-semibold">Crear un producto</h1>
                </div>
                <div >
                    <input className='bg-[#F6F6F6] md:w-[25vw] md:h-[4vh] p-[1vw] rounded-sm text-[#868686]'
                        placeholder='Escribe el titulo del producto'
                        name='nombre'
                        value={data.nombre}
                        onChange={handleInputChange}
                    />
                    <h4 className='border-b-[#341CA7] md:w-[25vw] border-b-2 py-[1vh]'></h4>
                </div>
                <div className='pt-[5vh] text-[#868686]'>
                        <div className='md:w-[50vw] md:h-[30vh]' >
                            <textarea className=' bg-[#F6F6F6] md:w-[53vw] md:h-[28vh] p-2 capitalize'
                                placeholder='Escribe la descripción del producto'
                                name='descripcion'
                                value={data.descripcion}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-between gap-[2.5vw]">
                                <h2 >Categoría:</h2>
                                <select
                                    name='id_categoria' 
                                    className='bg-[#F6F6F6] px-[1vw] text-[#868686] text-sm md:w-[46vw] md:h-[4vh] rounded-sm'
                                    value={data.id_categoria}
                                    onChange={handleInputChange}
                                >
                                    <option value='' disabled>~~~ Seleccione una categoría ~~~</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.id}>{category.nombre}</option>
                                    ))}
                                </select>

                        </div>
                 
                      <div className='flex justify-between'>
                        <div className="flex py-[1vh]">
                                <h2 className='pr-[1.8vw]'  >Precio:</h2>
                                <div>
                                    <input className='bg-[#F6F6F6] p-[1vw]  text-[#868686] text-sm md:w-[20vw] md:h-[2vh] rounded-sm'
                                        placeholder='$90.00'
                                        name='precio'
                                        value={data.precio}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                                
                            </div>
                            <div className="flex py-[1vh]">
                                <h2  >Cantidad:</h2>
                                <div>
                                    <input className='bg-[#F6F6F6] p-[1vw]  text-[#868686] text-sm md:w-[20vw] md:h-[2vh] rounded-sm'
                                        placeholder='1'
                                        name='cantidad'
                                        value={data.cantidad}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                                
                            </div>
                      </div>
                    <div className="flex self-end justify-around p-[1vw] px-[.1vw] ">
                            <button className='bg-[#70C5BB] md:w-[8vw] md:h-[4vh] rounded-sm text-white'>Guardar</button>
                    </div>
                    
                 
                    
            </div>  

        </form>
    </div>
    <Footer/>
    </>
  )
}

export default CreateProduct