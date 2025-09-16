import axios from "axios";
import env from "../config/config.env";

export const fetchWeatherByCity = async(city:string)=>{
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${env.WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    return response.data;
};

export const fetchWeatherByCoords = async (lat:number,lon:number)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.WEATHER_API_KEY}&units=metric`;

    const response = await axios.get(url);
    return response.data;
} 