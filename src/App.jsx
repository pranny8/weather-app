import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);


  const fetchWeather = async () => {
    if (!city) return;

    try{
    const response = await fetch
    (
      `http://localhost:5050/weather?city=${city}`
    );

    const data = await response.json();

    if (data.cod !== 200) {
      setWeather({ error: data.message });
    } else {
      setWeather(data);
    }
    } catch (err) {
    console.log(err);
    setWeather({ error: "Something went wrong" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
<div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
      
      <h1 className="text-3xl font-bold">
      Weather App🌦️
      </h1>

      <div className="flex gap-2">
        <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2 rounded-lg border border-gray-300 w-64 outline-none"
      />

      <button
        onClick={fetchWeather}
        className="mt-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Search
      </button>
         </div>


      {weather && weather.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded shadow text-center">
          {weather.error}
          </div>
      )}

      {weather && weather.main && (
        <div className="mt-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl text-center flex flex-col items-center w-80">
          <h2 className="text-2xl font-bold">{weather.name}</h2>

          <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt={weather.weather[0].description}
      className="w-20 h-20"
    />

    <p className="text-3xl font-semibold">
      {weather.main.temp} °C
      </p>
    <p className="text-gray-600 capitalize">
      {weather.weather[0].description}
      </p>

        </div>
      )}

    </div>
    </div>
  );
}

export default App;