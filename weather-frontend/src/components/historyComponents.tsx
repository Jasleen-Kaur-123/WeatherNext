"use client";
import { useEffect, useState } from "react";
import api from "../lib/apiLib";

export default function HistoryComponent() {
  const [history, setHistory] = useState<string[]>([]);
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(savedHistory);
  }, []);

  const handleCityClick = async (city: string) => {
    try {
      const res = await api.get(`/api/weather?city=${city}`);
      setWeather(res.data);
    } catch (error) {
      console.error("Error fetching weather for history city:", error);
    }
  };

  const handleDeleteHistory = () => {
    localStorage.removeItem("searchHistory"); 
    setHistory([]); 
    setWeather(null); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Search History</h2>

      {history.length > 0 ? (
        <>
          <ul className="space-y-3 w-full max-w-md">
            {history.map((city, idx) => (
              <li
                key={idx}
                onClick={() => handleCityClick(city)}
                className="cursor-pointer bg-white shadow-md rounded-lg px-4 py-2 hover:bg-orange-100 transition"
              >
                {city}
              </li>
            ))}
          </ul>

          <button
            onClick={handleDeleteHistory}
            className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
          >
            Delete History
          </button>
        </>
      ) : (
        <p className="text-gray-600">No history yet.</p>
      )}

      {weather && (
        <div className="mt-6 bg-white shadow-lg rounded-2xl p-6 text-center w-80">
          <h3 className="text-xl font-bold mb-2">{weather.name}</h3>
          <p className="text-2xl font-semibold">{weather.main.temp}°C</p>
          <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
