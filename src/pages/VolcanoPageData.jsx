import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Map, Marker } from "pigeon-maps";
import Footer from '../components/footer'
import { BarChart } from '@mui/x-charts/BarChart';
import { useAuth } from '../Contexts/UserContext';
import useNavigation from '../Helper/NavigationHelper';
import { fetchVolcanoById } from '../Api/apiServices';
import { useContext } from 'react';
import { VolcanoHistoryContext } from '../Contexts/VolcanoHistoryContext';



const VolcanoPageData = () => {
    document.title = 'Volcano Page Data' //set the title of the page
    const [volcano, setVolcano] = useState(null); //state to hold the volcano data
    const [loading, setLoading] = useState(true); //state to hold the loading status
    const [error, setError] = useState(null); //state to hold the error message
    const { volcanoHistory, setVolcanoHistory } = useContext(VolcanoHistoryContext)

    let { id } = useParams(); //get the id from the url 
    const { isAuthenticated, loginUser } = useAuth();

    useEffect(() => {
        const getVolcanoData = async () => { //function to get the volcano data
            try {
                const token = isAuthenticated && loginUser ? loginUser.token : null
                const data = await fetchVolcanoById(id, token)
                setVolcano(data) //set the data to the state
                setLoading(false) //set loading to false
                if (!volcanoHistory.some(volcano => volcano.id === id)) { //check if the volcano is in the history
                    setVolcanoHistory([...volcanoHistory, { id: id, name: data.name }]) //add the volcano to the history
                }
            }
            catch (error) { //catch the error
                setError(error.message) //set the error message to the state
                setLoading(false) //set loading to false
            }
        }
        if (id) {
            getVolcanoData() //call the function
        }


    }, [id, isAuthenticated, loginUser]) //call the function when the id changes


    const latitude = Number(volcano?.latitude) //get the latitude of the volcano
    const longitude = Number(volcano?.longitude) //get the longitude of the volcano

    const [location, setLocation] = useState([latitude, longitude]) //state to hold the data from the api call
    const [zoom, setZoom] = useState(11)
    return (<>
        <div className='volcanoDetail-container'>

            {volcano && ( //if the volcano is not null, show the details
                <div className='volcano-facts-container'>
                    <h1>{volcano.name}</h1>
                    <p>Country: {volcano.country}</p>
                    <p>Region: {volcano.region}</p>
                    <p>Subregion: {volcano.subregion}</p>
                    <p>Last Erupted In: {volcano.last_eruption}</p>
                    <p>Summit: {volcano.summit}m</p>
                    <p>Elevation: {volcano.elevation} ft </p>
                </div>
            )}




            <div className='map-container'>
                <h2>Location</h2>
                {volcano && (
                    <Map height={600} width={650} center={[latitude, longitude]} defaultZoom={8} onBoundsChanged={({ location, zoom }) => {
                        setLocation(location) //set the location
                        setZoom(zoom) //set the zoom
                    }}>
                        <Marker width={30} anchor={[latitude, longitude]} /> {/*add the marker*/}
                    </Map>
                )}
            </div >
            {isAuthenticated ? ( //if the user is authenticated, show the population data
                <div className='volcano-pop'>
                    <h2>Population</h2>
                    {volcano && (
                        <BarChart
                            xAxis={[{
                                scaleType: 'band',
                                data: ['population_5km', 'population_10km', 'population_30km', 'population_100km']
                            }]} //set the x axis
                            series={[{
                                data:
                                    [volcano.population_5km, volcano.population_10km, volcano.population_30km, volcano.population_100km]
                            }]}
                            width={550}
                            height={300}
                            colors={['#FF5733']}

                        />
                    )}
                </div>
            ) : (
                <h3 className='login-pop'>Log in to view population data</h3> //if the user is not authenticated, show the message
            )}

        </div>


    </>
    )
}

export default VolcanoPageData