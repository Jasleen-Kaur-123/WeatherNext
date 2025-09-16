"use client";
import { useEffect, useState } from "react";

export default function WeatherComponent() {
  const [city, setCity] = useState("Delhi"); 
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "cd759ddaffbfb54e689e8c40dc53ec90"; 

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message || "City not found");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">
          Weather Details
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            onClick={() => fetchWeather(city)}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition shadow-md">
            Search
          </button>
        </div>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && weather && (
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold">{weather?.name}</h3>
            <p className="text-4xl font-bold">{weather?.main?.temp}°C</p>
            <p className="capitalize text-gray-700">
              {weather?.weather?.[0]?.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600">
              <p>💧 Humidity: {weather?.main?.humidity}%</p>
              <p>🌬️ Wind: {weather?.wind?.speed} m/s</p>
              <p>🌡️ Feels Like: {weather?.main?.feels_like}°C</p>
              <p>📈 Pressure: {weather?.main?.pressure} hPa</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
