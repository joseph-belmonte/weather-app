// this helper will take in period data from the forecast
// and return the appropriate SVG icon for the weather
// based on the icon code provided by the API

import {period} from '../types/types';

export const getSVG = (period: period) => {
  const nwsIcon = period.icon;
  console.log(nwsIcon)
  switch (nwsIcon) {
    case 'skc':
      return 'clear';
    case 'few':
      return 'partly-cloudy';
    case 'sct':
      return 'partly-cloudy';
    case 'bkn':
      return 'cloudy';
    case 'ovc':
      return 'cloudy';
    case 'wind_skc':
      return 'wind';
    case 'wind_few':
      return 'wind';
    case 'wind_sct':
      return 'wind';
    case 'wind_bkn':
      return 'wind';
    case 'wind_ovc':
      return 'wind';
    case 'snow':
      return 'snow';
    case 'rain_snow':
      return 'rain-snow';
    case 'rain_sleet':
      return 'rain-sleet';
    case 'snow_sleet':
      return 'snow-sleet';
    case 'fzra':
      return 'freezing-rain';
    case 'rain_fzra':
      return 'freezing-rain';
    case 'snow_fzra':
      return 'freezing-rain';
    case 'sleet':
      return 'sleet';
    case 'rain':
      return 'rain';
    case 'rain_showers':
      return 'rain';
    case 'rain_showers_hi':
      return 'rain';
    case 'tsra':
      return 'thunderstorm';
    case 'tsra_sct':
      return 'thunderstorm';
    case 'tsra_hi':
      return 'thunderstorm';
    case 'tornado':
      return 'tornado';
    case 'hurricane':
      return 'hurricane';   
  }
}