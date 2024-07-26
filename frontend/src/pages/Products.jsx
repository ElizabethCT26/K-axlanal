import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useGeneralContext } from '../contexts/GeneralContext';
import ProductSearchBody from '../components/ProductSearchBody';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Products() {
    const params = useParams();
    const {darkMode}= useGeneralContext();

    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState([]);
    
    const toggleVisibility = () => {
    setIsVisible(!isVisible);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:8082/categories')
            setData(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        console.log(params.name);
        fetchData()
    },[])


  return (
    <>
    <Header />
    <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex flex-wrap `}>
        <div className={` ${darkMode ? ('bg-darkSidebar border-darkCardBg') : ('bg-colorSidebar border-borderColor ')}   h-[80vh] w-[12vw] px-[2vw] py-[3vh] flex flex-wrap gap-y-[2vh] flex-col border-r-[.2vw] `}>
            <ul className={` ${darkMode ? ('text-white') : ('text-black ')} flex flex-wrap gap-y-[1vh] flex-col`}>
                    <Link to ="/productos/popular">
                        <li className='text-sm'>• Más populares</li>
                    </Link>
                    <Link to ="/productos/latest">
                        <li className='text-sm'>• Más recientes</li>
                    </Link>
                    <Link to ="/productos/mas-de-200">
                        <li className='text-sm'>• Mayor a 200</li>
                    </Link>
                    <Link to ="/productos/menos-de-200">
                        <li className='text-sm'>• Menor a 200</li>
                    </Link>
                    <Link to ="/productos/discounts">
                        <li className='text-sm'>• En descuento</li>
                    </Link>
            </ul>            
                <div className={` ${darkMode ? ('text-white') : ('text-black ')}`}>
                    {
                        data  ? (
                            data.map((categoria, index)=>(
                                <Link to={`/productos/categories/${categoria.nombre}/`}>
                                    <h2 className='text-sm px-2' key={index}>{categoria.nombre}</h2>
                                </Link>
                            ))
                        ) :
                        <h2>Vacio</h2>
                    }
                    
                    {/* 
                        {isVisible && (
                        <ul>
                            <li>Miel</li>
                            <li>Jalea real</li>
                            <li>Propoleo</li>
                            <li>Cera de abejas</li>
                        </ul>
                        
                    )}
                    */}
                </div>
        </div>
            <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} flex flex-wrap w-[86vw]  px-[3vw] pt-[4vh]`}>
                <div className=' w-full h-full gap-[0.5vh]'>
                    <div className='w-full  h-[6vh] flex items-center '>
                        <h2 className={` ${darkMode ? ('text-white') : ('text-black ')} `}>Productos relacionados con: "Oa"</h2>
                    </div>
                    
                    {
                        params.name  && params.categories  ? (
                            <ProductSearchBody endpoint={`/${params.categories}/${params.name}`}/>
                        ) : (
                            
                                params.name ? (
                                    <ProductSearchBody endpoint={`/${params.name}`}/>
                                ) : (
                                    <ProductSearchBody endpoint={`/`}/>
                                )
                            
                        )
                    }
                    

                </div>
            </div>
        </div>
        <Footer />
    </>
    );
}

export default Products;
