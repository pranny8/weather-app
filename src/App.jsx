import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBackground = () => {
    if (!weather) return "from-blue-400 to-white-200";

    const condition = weather.weather[0].main.toLowerCase();

    if (condition.includes("clear")) {
      return "from-yellow-300 via-white-200 to-orange-200";
    }
    if (condition.includes("cloud")){
      return "from-gray-300 to-blue-300";
    }
    if (condition.includes("rain")){
      return "from-gray-500 to-blue-300";
    }
    if (condition.includes("snow")){
      return "from-white-500 to-blue-200";
    }
    if (condition.includes("haze")){
      return "from-gray-400 to-black-100";
    }
    if (condition.includes("fog")){
      return "from-blue-200 to-gray-500";
    }
    if (condition.includes("thunder")){
      return "from-gray-500 to-blue-200";
    }
    return "from-blue-400 to-white-200";
  }
  
  const getWeatherEmoji = () => {
    if (!weather) return "🌍";

    const condition = weather.weather[0].main.toLowerCase();

    if (condition.includes("clear"))
      return "☀️";
    if (condition.includes("cloud"))
      return "☁️";
    if (condition.includes("rain"))
      return "🌧️";
    if (condition.includes("snow"))
      return "❄️";
    if (condition.includes("haze"))
      return "🌫️";
    if (condition.includes("fog"))
      return "🌁";
    if (condition.includes("thunder"))
      return "⚡";

    return "🌍";
  };

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setWeather(null);

    try{
    const response = await fetch
    (
      `https://weather-backend-hq5i.onrender.com/weather?city=${city}`
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
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackground()} transition-all duration-700`}>
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
        onKeyDown={(e) => {
          if (e.key === "Enter"){
            fetchWeather();
          }}
          }
        className="p-3 rounded-lg border border-gray-300 w-64 outline-none"
      />

      <button
        onClick={fetchWeather}
        disabled={loading}
        className="mt-3 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
      >
       {loading ? "Loading..." : "Search"}
      </button>
         </div>
       
       {loading && (
        <div className="mt-4 flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-2">Fetching weather...</p>
          </div>
       )}

       {!weather && !loading && (
        <p className="text-gray/80 mt-4 text-sm font-semibold tracking-wide">
        Enter a city to see the weather 🌍 
        </p>
       )}

      
      {weather && weather.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded shadow text-center">
          {weather.error}
          </div>
      )}

      {weather && weather.main && (
        <div className="mt-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl text-center flex flex-col items-center w-80">
          <h2 className="text-2xl font-bold">{weather.name}</h2>

         <div className="text-6xl">
            {getWeatherEmoji()}
            </div>

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