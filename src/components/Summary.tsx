import React, { useState } from 'react'



const Summary = ({ weatherData }: any) => {
  const [system, setSystem] = useState("F");
  const [temp, setTemp] = useState(weatherData.periods[0].temperature);
  
  const changeSystem = () => {
    if (system === "F") {
      setSystem("C");
      setTemp(Math.round((temp - 32) * 5 / 9));
    } else {
      setSystem("F");
      setTemp(Math.round(temp * 9 / 5 + 32));
    }
  }

  return (
    <div className='current-details'>
      <div className='degree-section' onClick={changeSystem} >
        <div className='temperature-degree'>
          <span> {temp}° </span>
          <span> {system} </span>
        </div>
      </div>
      <div className='descriptions'>
        <div className='short-description'> Headline: {weatherData.periods[0].shortForecast} </div>
        <div className='long-description'> Details: {weatherData.periods[0].detailedForecast} </div>
      </div>
  </div>

  )
  }

export default Summary