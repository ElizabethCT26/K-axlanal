import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useGeneralContext } from "../contexts/GeneralContext";
import LikeThat from "../svgs/LikeThat";

function ProductCards(prop) {
    const { darkMode, likes, setLikes, userId, setTrigger, trigger, enqueueSnackbar } = useGeneralContext();
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

            const likedProductIds = response.data.map(like => like.id_producto);
            setLikes(likedProductIds);
        } catch (error){
            console.log('algo ha salido mal')
        }
    }

    const handleLike = async (e, productId) => {
        e.preventDefault()

        try{
            console.log(productId)
            const response  = await axios.post('https://localhost:8082/favorite', { productId }, { withCredentials:true })
            setLikes(prevLikes => [...prevLikes, productId]);
            enqueueSnackbar(' Agregado correctamente a favoritos', { variant: 'success' });
            
        } catch (error){
            enqueueSnackbar('Hubo un error al agregar a favoritos', { variant: 'error' });
            
        }
    }
   

    const removeLike = async (e, productId) => {
        e.preventDefault()

        try{
            console.log(productId)
            const response  = await axios.delete(`https://localhost:8082/favorite/${productId}`, { withCredentials:true })
            setLikes(prevLikes => prevLikes.filter(like => like !== productId))
      
            enqueueSnackbar('Removido correctamente de favoritos', { variant: 'success' });
        } catch (error){
            console.log('algo ha salido mal')
            enqueueSnackbar('Hubo un error al removerlo de favoritos', { variant: 'success' });
        }
    }

    const handleDelete = async (e, productId) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`https://localhost:8082/products/${productId}`, { withCredentials:true })
            if(response.status == 200){
                setTrigger(!trigger);
            }
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        fetchData();
        fetchLikes();
    }, [prop.endpoint]);

    useEffect(() => {
        fetchData()
    }, [trigger])

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
        <div className={` ${darkMode ? ('bg-darkMainBackground ') : ('bg-darkMainColor')} font-light relative`}>
            {data.length > 0 && (
            <>
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
            </>
            )}
            {data.length > 0 ? (
                <div className="flex mx-[5vw] gap-[1vw] overflow-x-auto no-scrollbar" ref={scrollContainerRef}>
                    {data.map((product, index) => (
                        <Link to={`/producto/${product.id}/${(product.nombre).trim().replaceAll(' ', '-')}`} key={index}>
                            <div className="flex flex-col py-[5vh]">
                                <div className={`${darkMode ? ' text-white' : 'bg-cardBg'} border-b border-b-[#6287AF] w-[60vw] md:w-[16.8vw] md:h-[44vh] relative`}>
                                    {product.id_estado == 1 && (
                                        <div className="bg-red-500 w-[8vw] md:w-[1.5vw] h-[3.5vh]  text-xs text-white font-normal flex justify-center items-center flex-wrap px-[1vw] absolute">
                                            {product.porcentaje}%
                                        </div>
                                    )}
                                    <img src={`https://localhost:8082${product.img_path}`} alt="" className="w-full h-[44vh]  object-cover" />
                                </div>
                                <div className={`${darkMode ? 'bg-darkCardBottom text-white' : 'bg-cardBottom'} w-full  flex flex-col md:w-[16.8vw] h-[18vh]`}>
                                    <h2 className="px-[5%] text-md">{product.nombre}</h2>
                                    <Link to={`/tienda/${product.id_tienda}/${(product.nombre).trim().replaceAll(' ', '-')}`} onClick={(e) => { e.stopPropagation(); }}>
                                        <h3 className="text-[#868686] p-[2%] mx-[3%] text-md">{product.tienda}</h3>
                                    </Link>
                                    {product.id_estado == 1 ? (
                                        <h2 className="px-[5%] md:text-sm text-lg  font-medium text-red-600">En descuento</h2>
                                    ) : (
                                        <div className="w-full h-[2.5vh]"></div>
                                    )}
                                    <div className="flex justify-between">
                                        <h3 className={`${product.id_estado == 1 && 'text-red-500'} text-[#2374AB] text-md p-[2%] px-[5%] font-normal  max-w-[40vw] md:max-w-[10vw] `}>
                                            MXN$ {product.id_estado == 1 ? (
                                                <>
                                                    {(product.precio * (1 - (product.porcentaje / 100))).toFixed(2)}
                                                    {' '}
                                                    <s className='text-xs font-light text-slate-400 '>{product.precio}</s>
                                                </>
                                            ) : (product.precio)}
                                        </h3>   
                                            <div className="flex flex-wrap gap-[.3vw] items-center mx-[.2vw]" onClick={(e) => e.stopPropagation()}>
                                            {
                                                userId != product.id_propietario ? (
                                                    <>
                                                <a
                                                    href={`https://wa.me/1${product.contacto}?text=${message}${product.nombre}`}
                                                    target="_blank"
                                                    className="bg-[#4fcc5d] w-[8vw] md:w-[2vw]  h-[4vh]  rounded-md flex justify-center items-center"
                                                    
                                                >
                                                    <svg width="90%" className="fill-white p-[.4vh]" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                        <path d="M180.753,141.858C66.686,215.234 306.672,436.374 377.821,349.275C386.066,337.509 388.67,324.762 386.515,311.186L333.108,283.034C328.947,281.952 326.275,282.607 324.828,284.69L304.541,310.358C302.598,313.503 300.014,315.049 296.261,313.671C260.968,301.638 232.175,278.575 211.804,241.219C210.009,235.283 210.841,232.726 212.218,230.869L227.95,209.755C229.486,207.595 229.879,204.577 229.606,201.061L207.778,146.057C205.59,144.578 203.876,142.33 200.423,141.359C195.302,139.919 187.78,140.271 180.753,141.858Z"/>
                                                        <path d="M32.802,501.062L65.923,372.616C5.933,257.68 46.045,144.124 95.648,88.825C149.159,29.169 267.858,-29.158 396.223,48.499C652.407,245.07 403.012,607.776 157.684,464.931L32.802,501.062ZM89.476,444.186L162.756,423.971C222.798,460.319 285.762,466.471 352.273,435.974C413.861,403.076 450.554,351.835 460.93,281.201C467.404,210.422 445.36,149.828 395.231,99.265C334.831,51.143 270.408,39.234 201.923,63.888C149.293,83.813 111.745,121.219 89.476,176.335C76.77,205.408 71.48,237.447 74.946,272.989C78.966,307.065 90.392,339.432 108.428,370.274L89.476,444.186Z"/>
                                                    </svg>
                                                </a>
                                                {likes.includes(product.id) ? (
                                                    <button
                                                        className="w-[12vw] md:w-[3vw] h-[3.7vh] rounded-md flex justify-center items-center"
                                                        onClick={(e) => removeLike(e, product.id)}
                                                    >
                                                           <svg width="100%"  className="fill-red-600 p-[.4vh]" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                        <g transform="matrix(2.58512,0,0,2.26442,-441.491,-438.056)">
                                                            <path d="M209.876,402.256L208.881,215.742C209.983,210.138 207.419,198.419 218.975,197.808L320.263,197.018C333.036,196.357 331.15,205.636 331.908,211.529L332.171,405.884C326.739,418.731 309.124,415.011 303.821,409.307L284.599,383.005C281.409,378.526 266.772,374.68 260.93,382.215L238.168,409.19C230.612,417.607 217.431,417.558 209.876,402.256Z" />
                                                        </g>
                                                    </svg>
                                                        
                                                    </button>
                                                    ) : (
                                                    <button
                                                        className=" w-[12vw] pr-[1vw] md:w-[3vw] h-[3.7vh]  rounded-md flex justify-center items-center"
                                                        onClick={(e) => handleLike(e, product.id)}
                                                    >
                                                    <svg width="100%" className="fill-blue-400 p-[.4vh]"  height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
                                                        <g transform="matrix(1,0,0,1,6.11998,16.0914)">
                                                            <path d="M100.302,347.69L25.468,383.304C22.916,384.518 19.859,383.432 18.645,380.881L14.244,371.635C13.03,369.083 14.116,366.026 16.667,364.811L483.606,142.593C486.158,141.379 489.216,142.465 490.43,145.016L494.83,154.263C496.044,156.814 494.959,159.872 492.407,161.086L416.771,197.081L417.211,481.038C403.169,510.128 357.631,501.706 343.922,488.79L294.231,429.23C285.985,419.087 248.148,410.378 233.044,427.442L174.201,488.525C154.67,507.583 120.595,507.472 101.064,472.823L100.302,347.69Z" />
                                                        </g>
                                                        <g transform="matrix(1,0,0,0.96223,6.58281,-4.81787)">
                                                            <path d="M100.171,326.148L98.492,50.476C101.34,37.785 94.712,11.247 124.586,9.864L386.428,8.075C419.446,6.579 414.572,27.591 416.53,40.936L416.756,187.32C382.467,205.528 343.954,224.58 290.353,249.217L100.171,343.278L100.171,326.148Z" />
                                                        </g>
                                                    </svg>
                                                    </button>
                                                )}
                                                    </>
                                                ) : (
                                                    <>
                                                    <button
                                                        className="bg-red-600 w-[12vw] md:w-[1.5vw] h-[3.7vh] rounded-md flex justify-center items-center"
                                                        onClick={(e) => handleDelete(e, product.id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="21" viewBox="0,0,256,256">
                                                            <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" style={{mixBlendMode: 'normal'}}>
                                                                <g transform="scale(5.33333,5.33333)">
                                                                    <path d="M22,1c-2.19733,0 -4,1.80267 -4,4v1h-9c-1.64446,0 -3,1.35443 -3,3v2c0,1.64557 1.35554,3 3,3h24c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-24c-0.56354,0 -1,-0.43557 -1,-1v-2c0,-0.56443 0.43646,-1 1,-1h10c0.55226,-0.00006 0.99994,-0.44774 1,-1v-2c0,-1.11667 0.88333,-2 2,-2h4c1.11667,0 2,0.88333 2,2v2c0.00006,0.55226 0.44774,0.99994 1,1h10c0.56354,0 1,0.43557 1,1v2c0,0.56443 -0.43646,1 -1,1h-1c-0.26589,0.00002 -0.52082,0.10593 -0.70846,0.2943c-0.18764,0.18838 -0.29255,0.44372 -0.29154,0.7096l0.10547,27.07617c-0.04455,1.63535 -1.36204,2.91992 -2.99805,2.91992h-20.08203c-1.67641,0 -3.01058,-1.3432 -3,-3.01953c0.00001,-0.00195 0.00001,-0.00391 0,-0.00586l-0.02539,-22.97656c0.00435,-0.36061 -0.18579,-0.69564 -0.49763,-0.8768c-0.31183,-0.18117 -0.69705,-0.18042 -1.00817,0.00197c-0.31112,0.18238 -0.49995,0.51815 -0.4942,0.87874l0.02539,22.9668c-0.01742,2.76167 2.23841,5.03125 5,5.03125h20.08203c2.69799,0 4.92459,-2.16859 4.99805,-4.86523c0.00016,-0.01042 0.00016,-0.02083 0,-0.03125l-0.10156,-26.10547c1.64235,-0.00257 2.99609,-1.35404 2.99609,-2.99805v-2c0,-1.64557 -1.35554,-3 -3,-3h-9v-1c0,-2.19733 -1.80267,-4 -4,-4zM16.98438,19.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v17c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-17c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM23.98438,19.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v17c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-17c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM30.98438,19.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v17c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-17c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212z"></path>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </button>
                                                    <Link to={`/producto/${product.id}/edit`}
                                                        className="bg-black w-[4vw] md:w-[1.5vw] h-[3.7vh] rounded-md flex justify-center items-center"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="21" viewBox="0,0,256,256">
                                                            <g fill="#ffffff" fill-rule="nonzero">
                                                                <g transform="scale(5.12,5.12)">
                                                                    <path d="M43.125,2c-1.24609,0 -2.48828,0.48828 -3.4375,1.4375l-0.8125,0.8125l6.875,6.875c-0.00391,0.00391 0.8125,-0.8125 0.8125,-0.8125c1.90234,-1.90234 1.89844,-4.97656 0,-6.875c-0.95312,-0.94922 -2.19141,-1.4375 -3.4375,-1.4375zM37.34375,6.03125c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-32.4375,32.46875c-0.12891,0.11719 -0.22656,0.26953 -0.28125,0.4375l-2,7.5c-0.08984,0.34375 0.01172,0.70703 0.26172,0.95703c0.25,0.25 0.61328,0.35156 0.95703,0.26172l7.5,-2c0.16797,-0.05469 0.32031,-0.15234 0.4375,-0.28125l32.46875,-32.4375c0.39844,-0.38672 0.40234,-1.02344 0.01563,-1.42187c-0.38672,-0.39844 -1.02344,-0.40234 -1.42187,-0.01562l-32.28125,32.28125l-4.0625,-4.0625l32.28125,-32.28125c0.30078,-0.28906 0.39063,-0.73828 0.22266,-1.12109c-0.16797,-0.38281 -0.55469,-0.62109 -0.97266,-0.59766c-0.03125,0 -0.0625,0 -0.09375,0z"></path>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </Link>
                                                    </>
                                                )
                                            }
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex mx-[5vw] gap-[1vw] overflow-x-auto no-scrollbar" ref={scrollContainerRef}>
                <div className="w-full h-[40vh] flex items-center justify-center">
                    <h2 className={` ${darkMode ? 'text-white' : 'text-black'}`}>Aun no hay nada por aqui</h2> 
                </div>

                {/*
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
                */}
                </div>
            )}
        </div>
    );
}

export default ProductCards;
