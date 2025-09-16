"use client";
import { useState } from "react";
import {
  WiDaySunny,
  WiRain,
  WiCloud,
  WiThunderstorm,
} from "react-icons/wi";
import api from "../lib/apiLib";

export default function HomeComponent() {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [bgImage, setBgImage] = useState("/images/sunnyweather.jpg");

  const handleAllowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await api.get(
              `/api/weather/current?lat=${latitude}&lon=${longitude}`
            );
            setWeather(res.data);
            updateBg(res.data.weather[0].main);
            setShowModal(false);
          } catch (error) {
            console.error("Error fetching weather:", error);
          }
        },
        (err) => {
          console.error("Geolocation denied/error:", err);
          setShowModal(false);
        }
      );
    }
  };

  const handleDenyLocation = () => setShowModal(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    try {
      const res = await api.get(`/api/weather?city=${city}`);
      setWeather(res.data);
      updateBg(res.data.weather[0].main);
      setCity("");
    } catch (error) {
      console.error("City not found:", error);
    }

        try {
          const res = await api.get(`/api/weather?city=${city}`);
          setWeather(res.data);
          updateBg(res.data.weather[0].main);

          const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
          if (!history.includes(city)) {
            history.push(city);
            localStorage.setItem("searchHistory", JSON.stringify(history));
          }

          setCity("");
        } catch (error) {
          console.error("City not found:", error);
        }
  };

  const updateBg = (condition: string) => {
    if (condition.includes("Rain")) setBgImage("/images/rainweather.webp");
    else if (condition.includes("Thunder")) setBgImage("/images/thunderweather.jpg");
    else if (condition.includes("Cloud")) setBgImage("/images/cloudyweather.webp");
    else setBgImage("/images/sunnyweather.jpg");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-700 font-sans relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Location Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Allow Location Access?
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              We need your location to show real-time weather data.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAllowLocation}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Allow
              </button>
              <button
                onClick={handleDenyLocation}
                className="bg-gray-300 text-black px-5 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 bg-white/80 rounded-2xl shadow-xl p-10 text-center w-full max-w-lg">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900">
          {weather ? `${weather.name}, ${weather.sys.country}` : "Weather App"}
        </h2>

        {weather && (
          <div className="flex justify-center items-center text-7xl mb-6 text-yellow-500">
            {weather.weather[0].main.includes("Rain") && <WiRain />}
            {weather.weather[0].main.includes("Cloud") && <WiCloud />}
            {weather.weather[0].main.includes("Thunder") && <WiThunderstorm />}
            {weather.weather[0].main.includes("Clear") && <WiDaySunny />}
          </div>
        )}

        <form
          onSubmit={handleSearch}
          className="flex gap-2 mb-6 justify-center"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
          >
            Search
          </button>
        </form>

        {weather && (
          <div className="bg-gray-100 shadow-md rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {weather.main.temp}°C
            </p>
            <p className="capitalize text-gray-700 text-lg">
              {weather.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
