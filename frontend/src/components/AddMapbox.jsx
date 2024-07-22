import  React, { useEffect, useState }  from 'react';
import Map, {GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
import locpin from '../assets/locpin.svg'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useGeneralContext } from '../contexts/GeneralContext';
import { SearchBox } from '@mapbox/search-js-react'


function AddMapbox(prop) {

    const params = useParams()
    const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const { darkMode } = useGeneralContext()
    

    const [data, setData] = useState([])

    const [viewState, setViewState] = useState({
        longitude: -86.8515,
        latitude: 21.1619,
        zoom: 10
    });


    const handleRetrieve = (e) => {
        console.log(e.features[0].properties.coordinates.latitude)
        console.log(e.features[0].properties.coordinates.longitude)
        console.log(e.features[0].properties.context.postcode.name)
        console.log(e.features[0].properties.context.street.name)
        console.log(e.features[0].properties.context.place.name)

        setViewState({
            longitude: e.features[0].properties.coordinates.longitude,
            latitude: e.features[0].properties.coordinates.latitude,
            zoom: 18
        });
    }

    const handleMove = (e) => {
        setViewState(e.viewState)
        console.log(viewState)
    }

    useEffect(() => {
        
    },[]);

    return (
        <>
            <Map
            {...viewState}
            onMove={e => handleMove(e)}
            mapboxAccessToken={mapboxAccessToken}
            mapLib={import('mapbox-gl')}
            style={{ width: '100%', height: '100%' }}
            mapStyle={ darkMode ? ("mapbox://styles/mapbox/dark-v11") : ("mapbox://styles/mapbox/streets-v12")}
            > 


                <Marker longitude={viewState.longitude} latitude={viewState.latitude} anchor="bottom" >
                    <div className='flex flex-wrap justify-center'>
                    <h2 className='font-bold w-full text-center'>Usted</h2>
                        <img className='' src={locpin}/>
                    </div>
                </Marker> 
            <GeolocateControl/>
            <NavigationControl />

            <form className='p-2 w-[85%]'>
                <SearchBox accessToken={mapboxAccessToken}
                value=''
                onRetrieve={e => handleRetrieve(e)}
                placeholder='Ingrese su direccion y seleccione una opcion'
                />
            </form>
            </Map>

        <div className='flex flex-wrap w-full justify-evenly md:py-[2vh]'>
            <div className=''>
                <button className={` ${darkMode ? (' text-white ') : ('text-white')} bg-red-500 md:w-[8vw] rounded-sm ` } onClick={()=>setLocationModal(false)}>Cancelar</button>

            </div>
            <div>
                <button   className={` ${darkMode ? (' text-white ') : ('text-white')} bg-green-500  md:w-[8vw] rounded-sm `}>Cambiar</button>
            </div>
        </div>
        </>
    )

}

export default AddMapbox