"use client";
export default function AboutComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-3xl text-center bg-white p-8 rounded-2xl shadow-xl space-y-8">
        <h2 className="text-3xl font-bold mb-4 text-black">
          About WeatherApp
        </h2>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            1) About this Weather Application Project
          </h3>
          <ul className="list-disc text-left pl-6 text-gray-600 space-y-1">
            <li>
              Built using <strong>Next.js</strong> for frontend,{" "}
              <strong>Tailwind CSS</strong> for styling, and{" "}
              <strong>Express.js</strong> for backend.
            </li>
            <li>
              Integrated with <strong>OpenWeather API</strong> for fetching real-time weather data.
            </li>
            <li>
              Supports features like <em>geolocation weather</em>,{" "}
              <em>city search</em>, <em>search history</em>, and{" "}
              <em>detailed weather view</em>.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            2) How API is Used
          </h3>
          <ul className="list-disc text-left pl-6 text-gray-600 space-y-1">
            <li>
              <strong>OpenWeather API</strong> is used to fetch weather data for
              both <em>current location</em> and <em>searched cities</em>.
            </li>
            <li>
              Backend <strong>controllers</strong> and <strong>routes</strong> handle API requests and responses.
            </li>
            <li>
              The frontend sends requests (city name or coordinates), backend
              calls the API, and data is returned neatly to the UI.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            3) How Weather Data is Fetched
          </h3>
          <ul className="list-disc text-left pl-6 text-gray-600 space-y-1">
            <li>
              When the user allows <strong>location access</strong>, coordinates
              (latitude & longitude) are captured.
            </li>
            <li>
              These details are passed to the backend API endpoint, which
              requests weather info from <strong>OpenWeather</strong>.
            </li>
            <li>
              The frontend displays key details like{" "}
              <em>temperature, humidity, wind speed, and conditions</em>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
