import  React, { useEffect, useState }  from 'react';
import Map, {Marker, NavigationControl} from 'react-map-gl';
import locpin from '../assets/locpin.svg'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useGeneralContext } from '../contexts/GeneralContext';


function Mapbox(prop) {

    const params = useParams()
    const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const { darkMode } = useGeneralContext()

    

    const directionsUrl = `https://localhost:8082${prop.endpoint}`
    const [data, setData] = useState([])

    const [viewState, setViewState] = useState({
        longitude: -86.8515,
        latitude: 21.1619,
        zoom: 10
    });

    const fetchDirections = async () => {
        const response = await axios.get(directionsUrl)
        setData(response.data)

        if(params.id){
            setViewState({
                longitude: response.data[0].longitude,
                latitude: response.data[0].latitude,
                zoom: 16
            })
        }
    };

    const handleMove = (e) => {
        setViewState(e.viewState)
        
    }

    useEffect(() => {
        fetchDirections()
    },[]);

    return <Map
    {...viewState}
    onMove={e => handleMove(e)}
    mapboxAccessToken={mapboxAccessToken}
    mapLib={import('mapbox-gl')}
    style={{ width: '100%', height: '100%' }}
    mapStyle={ darkMode ? ("mapbox://styles/mapbox/dark-v11") : ("mapbox://styles/mapbox/streets-v12")}
    > 

    {
        data ? (
            data.map((direction, index)=>(
            <Marker longitude={direction.longitude} latitude={direction.latitude} anchor="bottom" key={index}>
                <div className='flex flex-wrap justify-center'>
                    <h2 className={`font-light w-full text-center ${darkMode && ('text-white')  }`}>{direction.tienda}</h2>
                    <img className='' src={locpin}/>
                </div>
            </Marker>
            ))
        ) : (
        <Marker longitude={-86.86} latitude={21.17} anchor="bottom" >
            <div className='flex flex-wrap justify-center'>
            <h2 className='font-bold w-full text-center'>Palazzo's</h2>
                <img className='' src={locpin}/>
            </div>
        </Marker> 
        )
    } 

    <NavigationControl />
    </Map>

}

export default Mapbox