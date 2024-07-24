    import React, { useState, useEffect } from 'react'
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import axios from 'axios'
    import { useGeneralContext } from '../contexts/GeneralContext';
    import advertencia from '../assets/advertencia.svg'
    import { useSnackbar } from 'notistack'
  


    function StoreCrud() {

        const {darkMode} = useGeneralContext();
        const [deleteModal, setDeleteModal] = useState(false);
        const [deleteId, setDeleteId] = useState('');
        const { enqueueSnackbar } = useSnackbar();
        const [formId, setFormId] =  useState('');

       
   

        const [data,setData] = useState([]);

        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:8082/stores')
                setData(response.data)
            } catch (error){
                console.log('Algo ha salido mal');
        }
        };

        const handleDelete = async (id) =>{
            try{
                await axios.delete(`http://localhost:8082/stores/${id}`);
                fetchData();
                
            } catch(error){
                console.log('Error al eliminar la tienda:',error)
            }
        };
        const confirmDelete = async () => {
            try {
                await axios.delete(`http://localhost:8082/stores/${deleteId}`);
                fetchData();
                closeModalDelete();
                enqueueSnackbar('Error al eliminar la tienda', { variant: 'error' });
            } catch (error) {
                enqueueSnackbar('Tienda eliminada correctamente', { variant: 'success' });
            }
        };
        const closeModalDelete = () => {
            setDeleteModal(false);
            setForm({
                nombre: '',
                descripcion:'',
                propietario:''
             
            });
            setFormId('')
        }
        
        const openDeleteModal = async (id) => {
            
                setDeleteModal(true)
                setDeleteId(id)
           
        };

        useEffect(()=>{
            fetchData()
        },[])

    return (

    <>
    <Header/>
        <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex flex-col  md:py-[5vh] w-full px-[5vw]`}>
            <div className='flex justify-center '>
                    <h1 className={` ${darkMode ? ('text-white ') : ('text-black')}text-md font-semibold border-b md:my-[5vh] md:w-[85vw] `}>CRUD de Tiendas</h1>
            </div>

        
                    <table className={` ${darkMode ? ('bg-darkCardBg text-white ') : ('bg-colorInput')}  rounded-md md:w-full`} >
                     
                       <thead>
                       <tr className='bg-[#126477] rounded-md'>
                            <th className='text-[#ACACAC] font-semibold'>Nombre</th>
                            <th className='text-[#ACACAC] font-semibold'>Descripción</th>
                            <th className='text-[#ACACAC] font-semibold'>Propietario</th>
                            <th className='text-[#ACACAC] font-semibold'>Contacto</th>
                            <th className='text-[#ACACAC] font-semibold'>Acciones</th>
                        </tr>
                       </thead>
                    

                        {
                            data ? (
                                data.map(( producto, index)=>(
                                
                                   <tr key={producto.id} className='border-b'>
                                        <td className='md:px-[5%]  md:w-[20vw]'>{producto.tienda}</td>
                                        <td className='md:w-[40%] text-justify text-xs md:py-[2vh]'>{producto.descripcion}</td>
                                        <td className='md:px-[5%]'>{producto.propietario}</td>
                                        <td className='md:px-[5%]'>{producto.contacto}</td>
                                        <td className=' flex justify-between md:pr-[2vw] md:pl-[2vw] md:py-[8.4vh]'>
                                            
 
                                       <button onClick={()=>openDeleteModal(producto.id)}>
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
        {deleteModal && (
    <div className='fixed inset-0  backdrop-blur-sm flex items-center justify-center'>
            <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} md:w-[40vw] flex-col md:h-[40vh]   border-[#126477] flex flex-wrap justify-center items-center rounded-md border-4  pt-[2vh] px -[2vw] relative`}  >
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
       
        <Footer/>
    </>
    )
    }

    export default StoreCrud;
