import React, { useEffect, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";

// Types

// Styles
import './styles/components/App.scss';

// Components
import SearchBar from './components/SearchBar';
import Summary from './components/Summary';
import { getSVG } from './helpers/getSVG';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam1iOTMiLCJhIjoiY2w1aXZxcms3MDB2bzNpbXg4cHAxZDkwNCJ9.AL9cwKldBaCjQxxyARnCvw';
const GEOCODING_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const NWS_BASE_URL = "https://api.weather.gov";


const getWeatherData = async (location: string): Promise<any> => {
  const geocodeURL = `${GEOCODING_BASE_URL}/${encodeURIComponent(location)}.json?access_token=${MAPBOX_TOKEN}`;
  const geocodeResponse = await axios.get(geocodeURL);
  const [lng, lat] = geocodeResponse.data.features[0].center;
  console.log(lng, lat);
  const WxOfficeURL = `${NWS_BASE_URL}/points/${lat},${lng}`;
  const officeResponse = await axios.get(WxOfficeURL);
  const forecastURL = officeResponse.data.properties.forecast;
  const forecastResponse = await axios.get(forecastURL);
  console.log('forecastResponse.data.properties:', forecastResponse.data.properties);
  return forecastResponse.data.properties;
};

const defaultLocation = "New York, NY";
const defaultWeatherData = getWeatherData('New York, NY').then(weatherData => weatherData);

function App() {
  const [location, setLocation] = useState(defaultLocation);
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getWeatherData(location);
        setIsLoading(false);
        setWeatherData(data);
        getSVG(data.periods[0].icon);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
    fetchData();
  }, [location]);

  return (
    <div className="App">
      <div id='wrapper'>
        <h1 className='app-title'> US Weather App </h1>
        <SearchBar 
          location={location}
          setLocation={setLocation}
        />
        {isLoading ? (
          <div> Loading... </div>) : (
          <div>
            <div className='today'>
              <div id='today-overview'>
                <p className='location-timezone'>
                  <span> Updated: </span>
                  {new Date().toTimeString()}
                </p>
                <p className='location-timezone'>
                  <span> Weather for: </span>
                  {location.toLocaleUpperCase()}
                </p>
              </div>
              <div id='today-details'>
                    <p> Icon: </p>
                    <p> Details:</p>
              </div>
            </div>
              <Summary 
                weatherData={weatherData}
              />  
            <div className='five-day-forecast'>
              <span className='five-day-heading'> Looking Ahead... </span>
              {/* USE CSS GRID HERE */}
              <div className='five-day-forecast'>
                <div className='five-day-forecast-item'> </div>
                <div className='five-day-forecast-item'> </div>
                <div className='five-day-forecast-item'> </div>
                <div className='five-day-forecast-item'> </div>
                <div className='five-day-forecast-item'> </div>
                <div className='five-day-forecast-item'> </div>
              </div>
            </div>
        </div>
        )}
      </div>
    </div>
  )

}
      
export default App