import { Router } from "express";
import { getWeatherByCity, getWeatherByCoords } from "../controllers/weather.controllers";
import { validateCityRequest } from "../middleware/validaterequest.middleware";

const router = Router();

router.get("/", validateCityRequest, getWeatherByCity);
router.get("/current",getWeatherByCoords);

export default router;