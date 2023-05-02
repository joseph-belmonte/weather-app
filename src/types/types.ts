export type lat = number;
export type lng = number;

export type period = {
  detailedForecast: string,
  dewpoint: {unitCode: string, value: number},
  endTime: Date,
  icon: string,
  isDaytime: Boolean
  name: string
  number: number
  probabilityOfPrecipitation: {unitCode: string, value: number}
  relativeHumidity: {unitCode: string, value: number}
  shortForecast: string
  startTime: Date
  temperature: number
  temperatureTrend: null
  temperatureUnit: string
  windDirection: string
  windSpeed: string
}