import React, {useState, useEffect} from 'react';

import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

import './styles/components/App.scss';
import { lat, lng } from './types/types';

// default access token
mapboxgl.accessToken = 'pk.eyJ1Ijoiam1iOTMiLCJhIjoiY2w1aXZxcms3MDB2bzNpbXg4cHAxZDkwNCJ9.AL9cwKldBaCjQxxyARnCvw';

// personal access token
const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam1iOTMiLCJhIjoiY2w1aXZxcms3MDB2bzNpbXg4cHAxZDkwNCJ9.AL9cwKldBaCjQxxyARnCvw';
const GEOCODING_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const NWS_BASE_URL = "https://api.weather.gov";

function App() {
  const [location, setLocation] = useState("New York, NY");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { lat, lng } = await findCoordinates(location);
        const { forecastURL } = await findWxOffice(lat, lng);
        const data = await getWeatherData(forecastURL);
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [location]);

  const findCoordinates = async (location: string) => {
    const url = `${GEOCODING_BASE_URL}/${encodeURIComponent(location)}.json?access_token=${MAPBOX_TOKEN}`;
    const response = await axios.get(url);
    const [lng, lat] = response.data.features[0].center;
    return { lat, lng };
  };

  const findWxOffice = async (lat: lat, lng: lng) => {
    const url = `${NWS_BASE_URL}/points/${lat},${lng}`;
    const response = await axios.get(url);
    const forecastURL = response.data.properties.forecast;
    return { forecastURL };
  };

  const getWeatherData = async (forecastURL: string) => {
    const response = await axios.get(forecastURL);
    return response.data.properties;
  };

  return (
    <div className="App">
      <header> US Weather </header>
      <div className='input-bar'>
        <label htmlFor="location"> Location: </label>
        <input type="search" name="location" id="location" placeholder="New York, NY"
      />
      </div>
      <div className='location'>
        <h1 className='location-timezone'> Timezone </h1>
        <p> Icon </p>
      </div>
      <div className='temperature'>
        <div className='degree-section'>
        <h2 className='temperature-degree'> 34 </h2>
        <span> F </span>
        </div>
        <div className='temperature-description'> It's chilly! </div>
      </div>
      <div className='five-day-forecast'>
        <h2 className='five-day-heading'> Looking Ahead... </h2>
        {/* USE CSS GRID HERE */}
        <div className='five-day-forecast'>  
        </div>
      </div>
    </div>
  )

}
      
export default App