import dotenv from "dotenv";

dotenv.config();

interface Env{
    PORT:number;
    MONGO_URI:string;
    WEATHER_API_KEY:string;
}

const env: Env = {
    PORT:parseInt(process.env.PORT || "5000",10),
    MONGO_URI:process.env.MONGO_URI || "",
    WEATHER_API_KEY:process.env.WEATHER_API_KEY||"",
}

export default env;