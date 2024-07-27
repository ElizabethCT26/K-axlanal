import React, { useState, useEffect } from 'react'


import axios from 'axios'
import { useGeneralContext } from '../contexts/GeneralContext';
import { Link, useParams } from "react-router-dom";
import advertencia from '../assets/advertencia.svg'


function CategoriesCrud() {
    const {darkMode, enqueueSnackbar} = useGeneralContext();

    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        descripcion: ''
    });
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [formId, setFormId] =  useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:8082/categories');
            setData(response.data);
        } catch (error) {
            console.log('Algo ha salido mal', error);
        }
    };

    const openModal = async (editId) => {
        try{
            setModal(true)
        }catch(error){
            console.log('Algo ha salido mal', error)
        }
    };

    const openModalEdit = async (editId) => {
        try{
            const response = await axios.get(`https://localhost:8082/categories/${editId}`)
            setEditModal(true)
            setForm(response.data[0])
            setFormId(response.data[0].id);
        }catch(error){
            console.log('Algo ha salido mal', error)
        }
    };

    
    const closeModalEdit = () => {
        setEditModal(false);
        setForm({
            nombre: '',
            descripcion:''
        });
        setFormId('')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };
    


    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const validations = [
            {   isValid: form.nombre.trim().length > 0, message: 'Por favor ingrese un nombre' },
            {   isValid: form.descripcion.trim().length > 0, message: 'Por favor, ingrese una descripcion' },
        ]

        for(let validation of validations){
            if(!validation.isValid){
                enqueueSnackbar(validation.message, { variant: 'error' });
                return;
            }
            
        }

        await axios.put(`https://localhost:8082/categories/${formId}`, form);
        fetchData();
        setEditModal(false);
        setForm({
            nombre: '',
            descripcion:''
            
            
        });
        setFormId('')
        enqueueSnackbar('Se actualizó correctamente', { variant: 'success' });
       
        const formData = new FormData();
        formData.append('nombre', form.nombre);
        formData.append('descripcion', form.descripcion);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validations = [
            {   isValid: form.nombre.trim().length > 0, message: 'Por favor ingrese un nombre' },
            {   isValid: form.descripcion.trim().length > 0, message: 'Por favor, ingrese una descripcion' },
        ]

        for(let validation of validations){
            if(!validation.isValid){
                enqueueSnackbar(validation.message, { variant: 'error' });
                return;
            }
            
        }

        await axios.post('https://localhost:8082/categories', form);
        fetchData();
        setModal(false);
        setFormId('')

        enqueueSnackbar('Se agregó correctamente', { variant: 'success' });

        const formData = new FormData();
        formData.append('nombre', form.nombre);
        formData.append('descripcion', form.descripcion);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`https://localhost:8082/categories/${deleteId}`);
            fetchData();
            closeModalDelete();
            enqueueSnackbar('Error al eliminar la categoria', { variant: 'error' });
        } catch (error) {
            enqueueSnackbar('Categoría eliminada correctamente', { variant: 'success' });
        }
    };
    const closeModalDelete = () => {
        setDeleteModal(false);
        setForm({
            nombre: '',
            descripcion:''
        });
        setFormId('')
    }
    
    const openDeleteModal = async (id) => {
        
            setDeleteModal(true)
            setDeleteId(id)
       
    };
    

 

    useEffect(() => {
        fetchData();
    }, []);
return(
<>

    <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex flex-col  md:py-[5vh] w-full px-[5vw]`}>
        <div className='flex justify-center '>
                <h1 className={` ${darkMode ? ('text-white ') : ('text-black')}text-md font-semibold border-b md:my-[5vh] w-full `}>CRUD de Categorias</h1>
        </div>
        <div className="flex justify-end">
                
                    <button className="text-2xl text-[#00BFB4] font-bold" onClick={()=>setModal(true)}>+</button>
                
            </div>

            <div className='overflow-x-auto'>
                <table className={` ${darkMode ? ('bg-darkCardBg text-white ') : ('bg-colorInput')}  rounded-md md:w-full`} >
                    <tr className='bg-[#126477] w-full h-full rounded-md'>
                        <th className='text-[#ACACAC] font-semibold'>Nombre</th>
                        <th className='text-[#ACACAC] font-semibold'>Descripción</th>
                        <th className='text-[#ACACAC] font-semibold'></th>
                        <th className='text-[#ACACAC] font-semibold'>Acciones</th>

                    </tr>

                    {
                        data ? (
                            data.map(( categorias, index)=>(
                                <tr className='border-b'>
                                    <td className='md:px-[5%]  md:w-[20vw]'>{categorias.nombre}</td>
                                    <td className='flex justify-center text-justify text-xs max-w-[80vw]  '>{categorias.descripcion}</td>
                                    <td className='md:px-[5%]'>{categorias.popularidad}</td>
                                    <td className=' flex justify-center items-center md:w-[10vw] ml-[26vw] md:py-[8.4vh]'>
                                    
                                <button>
                                    <svg onClick={()=>openModalEdit(categorias.id)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="21" viewBox="0,0,256,256">
                                        <g fill="#3638e6" fill-rule="nonzero">
                                            <g transform="scale(5.12,5.12)">
                                                <path d="M43.125,2c-1.24609,0 -2.48828,0.48828 -3.4375,1.4375l-0.8125,0.8125l6.875,6.875c-0.00391,0.00391 0.8125,-0.8125 0.8125,-0.8125c1.90234,-1.90234 1.89844,-4.97656 0,-6.875c-0.95312,-0.94922 -2.19141,-1.4375 -3.4375,-1.4375zM37.34375,6.03125c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-32.4375,32.46875c-0.12891,0.11719 -0.22656,0.26953 -0.28125,0.4375l-2,7.5c-0.08984,0.34375 0.01172,0.70703 0.26172,0.95703c0.25,0.25 0.61328,0.35156 0.95703,0.26172l7.5,-2c0.16797,-0.05469 0.32031,-0.15234 0.4375,-0.28125l32.46875,-32.4375c0.39844,-0.38672 0.40234,-1.02344 0.01563,-1.42187c-0.38672,-0.39844 -1.02344,-0.40234 -1.42187,-0.01562l-32.28125,32.28125l-4.0625,-4.0625l32.28125,-32.28125c0.30078,-0.28906 0.39063,-0.73828 0.22266,-1.12109c-0.16797,-0.38281 -0.55469,-0.62109 -0.97266,-0.59766c-0.03125,0 -0.0625,0 -0.09375,0z"></path>
                                            </g>
                                        </g>
                                    </svg>

                                    </button>

                                    <button onClick={()=>openDeleteModal(categorias.id)} className='px-[2vw]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="21" viewBox="0,0,256,256">
                                        <g fill="#fa5252" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" style={{mixBlendMode: 'normal'}}>
                                        <g transform="scale(5.33333,5.33333)">
                                            <path d="M22,1c-2.19733,0 -4,1.80267 -4,4v1h-9c-1.64446,0 -3,1.35443 -3,3v2c0,1.64557 1.35554,3 3,3h24c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-24c-0.56354,0 -1,-0.43557 -1,-1v-2c0,-0.56443 0.43646,-1 1,-1h10c0.55226,-0.00006 0.99994,-0.44774 1,-1v-2c0,-1.11667 0.88333,-2 2,-2h4c1.11667,0 2,0.88333 2,2v2c0.00006,0.55226 0.44774,0.99994 1,1h10c0.56354,0 1,0.43557 1,1v2c0,0.56443 -0.43646,1 -1,1h-1c-0.26589,0.00002 -0.52082,0.10593 -0.70846,0.2943c-0.18764,0.18838 -0.29255,0.44372 -0.29154,0.7096l0.10547,27.07617c-0.04455,1.63535 -1.36204,2.91992 -2.99805,2.91992h-20.08203c-1.67641,0 -3.01058,-1.3432 -3,-3.01953c0.00001,-0.00195 0.00001,-0.00391 0,-0.00586l-0.02539,-22.97656c0.00435,-0.36061 -0.18579,-0.69564 -0.49763,-0.8768c-0.31183,-0.18117 -0.69705,-0.18042 -1.00817,0.00197c-0.31112,0.18238 -0.49995,0.51815 -0.4942,0.87874l0.02539,22.9668c-0.01742,2.76167 2.23841,5.03125 5,5.03125h20.08203c2.69799,0 4.92459,-2.16859 4.99805,-4.86523c0.00016,-0.01042 0.00016,-0.02083 0,-0.03125l-0.10156,-26.10547c1.64235,-0.00257 2.99609,-1.35404 2.99609,-2.99805v-2c0,-1.64557 -1.35554,-3 -3,-3h-9v-1c0,-2.19733 -1.80267,-4 -4,-4zM16.98438,19.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v17c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-17c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM23.98438,19.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v17c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-17c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM30.98438,19.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v17c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-17c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212z"></path>
                                        </g>
                                        </g>
                                    </svg>
                                    </button>
                                    

                                    </td>
                                </tr>
                            ))
                        ) : (<h2>vacio</h2>)
                    }
                </table>
                </div>



    </div>
   {
    modal  &&  (
        <div className='fixed inset-0  backdrop-blur-sm flex items-center justify-center'>
            <form className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:w-[40vw] flex-col md:h-[45vh]  border-[#ACACAC] flex justify-center items-center rounded-md border relative`} onSubmit={handleSubmit}>
                <button className= {` ${darkMode ? (' text-red-500 ') : ('text-red-500')} text-xl flex justify-end  w-full px-[1vw]`} type="button" onClick={()=>setModal(false)}>x</button>
                <h2 className={` ${darkMode ? (' text-white ') : ('text-black')}`}>Agregar categoría</h2>
                    <div>
                        <input className={` ${darkMode ? ('bg-darkCardBg text-white ') : ('bg-colorBanner')} md:w-[28vw] md:h-[6vh] p-[1vw] rounded-sm `}
                            placeholder='Escribe el nombre de la categoría'
                            name='nombre'
                            value={form.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <textarea className={` ${darkMode ? ('bg-darkCardBg text-white ') : ('bg-colorBanner')} md:w-[28vw] md:h-[20vh] p-[1vw] my-[2vh] rounded-sm `}
                            placeholder='Escribe la descripción de la categoría'
                            name='descripcion'
                            value={form.descripcion}
                            onChange={handleInputChange}
                        />
                    </div>
                   <div className='flex justify-end w-full md:px-[1vw]'>
                       
                            <button className=' bg-[#3A4E64] text-white md:w-[8vw] rounded-sm' >Agregar</button>
                        
                   </div>
            </form>
           
        </div>

    )
   } 

   {editModal && (
    <div className='fixed inset-0  backdrop-blur-sm flex items-center justify-center'>
            <form className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:w-[40vw] flex-col md:h-[55vh]  border-[#ACACAC] flex justify-center items-center rounded-md border relative`} onSubmit={handleEditSubmit}>
                <button className= {` ${darkMode ? (' text-red-500 ') : ('text-red-500')} text-xl flex justify-end  w-full px-[1vw]`} type="button" onClick={() => closeModalEdit()}  >x</button>
                <h2 className={` ${darkMode ? (' text-white ') : ('text-black')}`}>Editar categoría</h2>
                    <div>
                        <input className={` ${darkMode ? ('bg-darkCardBg text-white ') : ('bg-colorBanner')} md:w-[28vw] md:h-[6vh] p-[1vw] rounded-sm `}
                            placeholder='Escribe el nombre de la categoría'
                            name='nombre'
                            value={form.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <textarea className={` ${darkMode ? ('bg-darkCardBg text-white ') : ('bg-colorBanner')} md:w-[28vw] md:h-[20vh] p-[1vw] my-[2vh] rounded-sm `}
                            placeholder='Escribe la descripción de la categoría'
                            name='descripcion'
                            value={form.descripcion}
                            onChange={handleInputChange}
                        />
                    </div>
                   <div className='flex justify-end w-full md:px-[1vw] md:py-[2vh]'>
                            <button className=' bg-[#3A4E64] text-white md:w-[8vw]   rounded-sm' >Aceptar</button>
                        
                   </div>
            </form>
           
        </div>

   )

   }
   {deleteModal && (
    <div className='fixed inset-0  backdrop-blur-sm flex items-center justify-center'>
            <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:w-[40vw] flex-col md:h-[40vh]   border-[#126477] flex flex-wrap justify-center items-center rounded-md border-4  pt-[2vh] px -[2vw] relative`} >
                <img className='md:h-[10vh] md:w-[21vw]' src={advertencia}/>
                <h2 className={` ${darkMode ? (' text-white ') : ('text-black')} text-xl`}>¿Está seguro que quiere eliminar la categoría?</h2>
                    <div className='flex justify-between md:py-[2vh]'>
                        <div className='md:px-[2vw] '>
                            <button onClick={closeModalDelete} className={` ${darkMode ? (' text-white ') : ('text-white')} bg-red-500 md:w-[8vw] rounded-sm `}>Cancelar</button>
                        
                        </div>
                        <div>
                            <button onClick={confirmDelete}  className={` ${darkMode ? (' text-white ') : ('text-white')} bg-green-500  md:w-[8vw] rounded-sm `}>Eliminar</button>
                        </div>

                    </div>
                    
            </div>
           
        </div>
            )}
  
    
</>
)
}



export default CategoriesCrud
