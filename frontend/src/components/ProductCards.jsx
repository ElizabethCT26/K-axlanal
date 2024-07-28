import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useGeneralContext } from "../contexts/GeneralContext";
import LikeThat from "../svgs/LikeThat";

function ProductCards(prop) {
    const { darkMode, likes, setLikes } = useGeneralContext();
    const navigate = useNavigate();
    const url = `https://localhost:8082/products/${prop.endpoint}`;
    const message = encodeURIComponent(`Hola, estoy interesado en comprar `);
    const [data, setData] = useState([]);
    const scrollContainerRef = useRef(null);

    const empty = [{}, {}, {}, {}, {}, {}, {}];

    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Algo ha salido mal');
        }
    };

    const fetchLikes = async () => {
        try{
            const response  = await axios.get('https://localhost:8082/favorite/user', { withCredentials: true })
            console.log(response.data)

            const likedProductIds = response.data.map(like => like.id_producto);
            console.log(likedProductIds)
            setLikes(likedProductIds);
            ///setLikes(response.data)
        } catch (error){
            console.log('algo ha salido mal')
        }
    }

    const handleLike = async (e, productId) => {
        e.preventDefault()

        try{
            console.log(productId)
            const response  = await axios.post('https://localhost:8082/favorite', { productId }, { withCredentials:true })
            fetchLikes(prevLikes => [...prevLikes, productId]);
        } catch (error){
            console.log('algo ha salido mal')
            console.log(error)
        }
    }

    const removeLike = async (e, productId) => {
        e.preventDefault()

        try{
            console.log(productId)
            const response  = await axios.delete(`https://localhost:8082/favorite/${productId}`, { withCredentials:true })
            fetchLikes(prevLikes => prevLikes.filter(like => like !== productId))
        } catch (error){
            console.log('algo ha salido mal')
        }
    }

    useEffect(() => {
        fetchData();
        fetchLikes();
    }, [prop.endpoint]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft -= 1080;
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 1080;
        }
    };

    return (
        <div className='font-light relative'>
            <button
                className="absolute left-[3vw] top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-300 rounded-sm text-black transition-all duration-500 ease-in-out px-2 py-2 md:hover:py-[18vh] z-40  "
                onClick={scrollLeft}
            >
                &lt;
            </button>
            <button
                className="absolute right-[3vw] top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-sm text-black transition-all duration-500 ease-in-out px-2 py-2 md:hover:py-[18vh] z-40"
                onClick={scrollRight}
            >
                &gt;
            </button>
            {data.length > 0 ? (
                <div className="flex mx-[5vw] gap-[1vw] overflow-x-auto no-scrollbar" ref={scrollContainerRef}>
                    {data.map((product, index) => (
                        <Link to={`/producto/${product.id}`} key={index}>
                            <div className="flex flex-col">
                                <div className={`${darkMode ? ' text-white' : 'bg-cardBg'} border-b border-b-[#6287AF] w-[44vw] md:w-[11vw] h-[28vh] relative`}>
                                    {product.id_estado == 1 && (
                                        <div className="bg-red-500 w-[8vw] md:w-[1.5vw] h-[3.5vh] text-xs text-white font-normal flex justify-center items-center flex-wrap px-[1vw] absolute">
                                            {product.porcentaje}%
                                        </div>
                                    )}
                                    <img src={`https://localhost:8082${product.img_path}`} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className={`${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'} w-full h-full flex flex-col md:w-[11vw] md:h-[15vh]`}>
                                    <h2 className="px-[5%] text-sm">{product.nombre}</h2>
                                    <Link to={`/tienda/${product.id_tienda}`} onClick={(e) => { e.stopPropagation(); }}>
                                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs">{product.tienda}</h3>
                                    </Link>
                                    {product.id_estado == 1 ? (
                                        <h2 className="px-[5%] text-xs font-medium text-red-600">En descuento</h2>
                                    ) : (
                                        <div className="w-full h-[2.5vh]"></div>
                                    )}
                                    <div className="flex justify-between">
                                        <h3 className={`${product.id_estado == 1 && 'text-red-500'} text-[#2374AB] text-xs p-[2%] px-[5%] font-normal max-w-[6vw] `}>
                                            MXN$ {product.id_estado == 1 ? (
                                                <>
                                                    {(product.precio * (1 - (product.porcentaje / 100))).toFixed(2)}
                                                    {' '}
                                                    <s className='text-xs font-light text-slate-400'>{product.precio}</s>
                                                </>
                                            ) : (product.precio)}
                                        </h3>
                                            <div className="flex flex-wrap gap-[.3vw]  items-center mx-[.2vw]" onClick={(e) => e.stopPropagation()}>
                                                <a
                                                    href={`https://wa.me/1${product.contacto}?text=${message}${product.nombre}`}
                                                    target="_blank"
                                                    className="bg-[#70C5BB] w-[6vw] md:w-[2vw]  h-[3vh] md:h-[4vh]  rounded-md flex justify-center items-center"
                                                    
                                                >
                                                    💬
                                                </a>
                                                {likes.includes(product.id) ? (
                                                    <button
                                                        className="w-[4vw] md:w-[1.5vw] h-[3.7vh] rounded-md flex justify-center items-center"
                                                        onClick={(e) => removeLike(e, product.id)}
                                                    >
                                                        <svg width="100%" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" className={` ${darkMode ? 'fill-[#CE1B03]' : 'fill-[#E23C07]'}`}>
                                                            <g transform="matrix(1.3875,0,0,1.31473,-113.296,-104.261)">
                                                                <path d="M267.337,162.085C304.293,96.549 378.206,96.549 415.163,129.317C452.121,162.085 452.121,227.621 415.163,293.157C389.293,342.309 322.772,391.461 267.337,424.229C211.902,391.461 145.381,342.309 119.512,293.157C82.555,227.621 82.555,162.085 119.512,129.317C156.468,96.549 230.381,96.549 267.337,162.085Z" />
                                                            </g>
                                                        </svg>
                                                    </button>
                                                    ) : (
                                                    <button
                                                        className=" w-[4vw] md:w-[1.5vw] h-[3.7vh] rounded-md flex justify-center items-center"
                                                        onClick={(e) => handleLike(e, product.id)}
                                                    >
                                                        <svg width="100%" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" className={` ${darkMode ? 'stroke-[#CE1B03] ' : 'stroke-[#E23C07] '} stroke-[2rem] fill-none`}>
                                                            <g transform="matrix(1.3875,0,0,1.31473,-113.296,-104.261)">
                                                                <path d="M267.337,162.085C304.293,96.549 378.206,96.549 415.163,129.317C452.121,162.085 452.121,227.621 415.163,293.157C389.293,342.309 322.772,391.461 267.337,424.229C211.902,391.461 145.381,342.309 119.512,293.157C82.555,227.621 82.555,162.085 119.512,129.317C156.468,96.549 230.381,96.549 267.337,162.085Z" />
                                                            </g>
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex mx-[5vw] gap-[1vw] overflow-x-auto no-scrollbar" ref={scrollContainerRef}>
                    {empty.map((_, index) => (
                        <div className={`${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg'} flex flex-col bg-[#eaeaea]`} key={index}>
                            <div className={`${darkMode ? 'bg-darkCardBg text-white' : 'bg-cardBg'} bg-[#D9D9D9] border-b animate-pulse border-b-[#6287AF] w-[11vw] h-[28vh]`}></div>
                            <div className={`${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'} bg-[#F5F5F5] animate-pulse w-[11vw] h-[15vh]`}>
                                <h2 className="px-[5%] text-sm"></h2>
                                <h3 className="text-[#868686] p-[2%] mx-[3%] text-xs"></h3>
                                <div className="flex justify-between">
                                    <h3 className="text-[#2374AB] text-xs p-[2%] px-[5%] font-normal"></h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductCards;
