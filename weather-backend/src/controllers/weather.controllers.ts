import { Request, Response } from "express";
import axios from "axios";

const API_KEY = process.env.WEATHER_API_KEY as string;

export const getWeatherByCity = async (req: Request, res: Response) => {
  try {
      console.log("req.query:", req.query); 

    const city = Array.isArray(req.query.city) ? req.query.city[0] : req.query.city;

    if (!city) return res.status(400).json({ error: "City not provided" });

    console.log("Fetching weather for city:", city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    console.log("URL:", url);

    const response = await axios.get(url);
    res.json(response.data);
    console.log("City param:", city);
console.log("API_KEY:", API_KEY);

  } catch (error) {
    console.error("Error fetching weather:", error);
    res.status(400).json({ error: "City not found" });
    
  }
};



export const getWeatherByCoords = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "Unable to fetch weather" });
  }
};
