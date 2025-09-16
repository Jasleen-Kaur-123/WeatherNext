import express, { Router } from "express";
import { getWeatherByCity, getWeatherByCoords } from "../controllers/weather.controllers";

const router = Router();

router.get("/",getWeatherByCity);
router.get("/current",getWeatherByCoords);

export default router;