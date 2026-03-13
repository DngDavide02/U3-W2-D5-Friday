import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, FireIcon, BeakerIcon, SunIcon as SunOutlineIcon, CloudIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";
import { CloudIcon as CloudSolidIcon, SunIcon as SunSolidIcon } from "@heroicons/react/24/solid";
import "./DetailsPage.css";

const API_KEY = "3c3cc806814b733612a0db2378d0c1bd";

function DetailsPage() {
  const { city } = useParams();
  const navigate = useNavigate();

  // State
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState("bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600");

  // Get weather-based background
  const getWeatherBackground = (weatherMain) => {
    const backgrounds = {
      Clear: "bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500",
      Clouds: "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600",
      Rain: "bg-gradient-to-br from-gray-600 via-blue-700 to-blue-800",
      Drizzle: "bg-gradient-to-br from-gray-500 via-blue-600 to-blue-700",
      Thunderstorm: "bg-gradient-to-br from-gray-800 via-purple-900 to-black",
      Snow: "bg-gradient-to-br from-blue-100 via-white to-gray-200",
      Mist: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
      Fog: "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600",
    };
    return backgrounds[weatherMain] || "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600";
  };

  // Get weather icon based on condition
  const getWeatherIcon = (weatherMain, size = "w-12 h-12") => {
    const iconClass = `${size} text-white`;

    switch (weatherMain) {
      case "Clear":
        return <SunSolidIcon className={iconClass} />;
      case "Clouds":
        return <CloudSolidIcon className={iconClass} />;
      case "Rain":
        return <CloudSolidIcon className={iconClass} />;
      case "Drizzle":
        return <CloudSolidIcon className={iconClass} />;
      case "Thunderstorm":
        return <CloudSolidIcon className={iconClass} />;
      case "Snow":
        return <CloudSolidIcon className={iconClass} />;
      case "Mist":
      case "Fog":
        return <CloudSolidIcon className={iconClass} />;
      default:
        return <SunSolidIcon className={iconClass} />;
    }
  };

  //coordinates
  useEffect(() => {
    const getCoordinates = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
        if (!res.ok) throw new Error("Error retrieving coordinates");
        const data = await res.json();
        if (data.length === 0) throw new Error("City not found");

        setCoords({
          lat: data[0].lat,
          lon: data[0].lon,
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getCoordinates();
  }, [city]);

  //weather and forecasts
  useEffect(() => {
    if (!coords) return;

    const getWeather = async () => {
      try {
        const resWeather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=en`,
        );
        if (!resWeather.ok) throw new Error("Error in current weather");
        const dataWeather = await resWeather.json();
        setWeather(dataWeather);

        // Set dynamic background based on weather
        if (dataWeather.weather && dataWeather.weather[0]) {
          setBackgroundClass(getWeatherBackground(dataWeather.weather[0].main));
        }

        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=en`,
        );
        if (!resForecast.ok) throw new Error("Error retrieving forecasts");
        const dataForecast = await resForecast.json();

        //forecasts per day
        const days = {};
        dataForecast.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!days[date]) days[date] = [];
          days[date].push(item);
        });

        setForecast(days);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getWeather();
  }, [coords]);

  if (loading) {
    return (
      <div className={`min-h-screen ${backgroundClass} relative overflow-hidden`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            {/* Animated Loading Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 border border-white/30 shadow-2xl mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <div
                    className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-white/50 rounded-full animate-spin"
                    style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                  ></div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">Loading Weather Data</h3>
              <p className="text-white/80 mb-6">Fetching the latest forecast for {city}...</p>

              {/* Skeleton Elements */}
              <div className="space-y-4 max-w-sm mx-auto">
                <div className="bg-white/10 rounded-lg h-4 animate-pulse"></div>
                <div className="bg-white/10 rounded-lg h-4 w-3/4 mx-auto animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="bg-white/10 rounded-lg h-4 w-1/2 mx-auto animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>

            {/* Floating Weather Icons */}
            <div className="flex justify-center gap-8">
              <div className="animate-bounce" style={{ animationDuration: "2s" }}>
                <SunIcon className="w-8 h-8 text-white/60" />
              </div>
              <div className="animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.3s" }}>
                <CloudIcon className="w-8 h-8 text-white/60" />
              </div>
              <div className="animate-bounce" style={{ animationDuration: "3s", animationDelay: "0.6s" }}>
                <CloudIcon className="w-8 h-8 text-white/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${backgroundClass} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/20"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-white text-center flex-1">{city}</h1>

          <div className="w-20"></div>
        </div>

        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-white rounded-2xl p-6 mb-8">
            <p className="text-center font-medium">{error}</p>
          </div>
        )}

        {weather && (
          <>
            {/* Current Weather Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/30 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-white mb-4 animate-fade-in">Current Weather</h2>

                <div className="flex items-center justify-center mb-6">
                  <div className="relative group">
                    <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {getWeatherIcon(weather.weather[0].main, "w-32 h-32")}
                    </div>
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <div className="text-6xl md:text-7xl font-bold text-white mb-2 animate-fade-in-up">{Math.round(weather.main.temp)}°C</div>

                <p className="text-xl text-white/80 capitalize mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                  {weather.weather[0].description}
                </p>

                <div className="text-white/70 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  Feels like {Math.round(weather.main.feels_like)}°C
                </div>
              </div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <FireIcon className="w-6 h-6 text-white/80 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">High/Low</p>
                  <p className="text-white font-semibold">
                    {Math.round(weather.main.temp_max)}° / {Math.round(weather.main.temp_min)}°
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <BeakerIcon className="w-6 h-6 text-white/80 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Humidity</p>
                  <p className="text-white font-semibold">{weather.main.humidity}%</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <SunIcon className="w-6 h-6 text-white/80 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Wind</p>
                  <p className="text-white font-semibold">{Math.round(weather.wind.speed * 3.6)} km/h</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <CloudIcon className="w-6 h-6 text-white/80 mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Pressure</p>
                  <p className="text-white font-semibold">{weather.main.pressure} hPa</p>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl transform transition-all duration-300 hover:scale-[1.01]">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <CalendarDaysIcon className="w-6 h-6 animate-pulse" />
                5-Day Forecast
              </h2>

              <div className="space-y-4">
                {Object.entries(forecast)
                  .slice(0, 5)
                  .map(([date, list], index) => {
                    const mainItem = list[0]; // Get first item of the day for main display
                    const temps = list.map((item) => item.main.temp);
                    const maxTemp = Math.max(...temps);
                    const minTemp = Math.min(...temps);

                    return (
                      <div
                        key={date}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-200 transform hover:scale-102 hover:translate-x-2"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-white font-semibold">
                                {new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                              </p>
                              <p className="text-white/60 text-sm capitalize">{mainItem.weather[0].description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="group transform transition-transform duration-200 hover:scale-110 hover:rotate-12">
                              {getWeatherIcon(mainItem.weather[0].main)}
                            </div>

                            <div className="text-right">
                              <p className="text-white font-semibold text-lg">{Math.round(maxTemp)}°</p>
                              <p className="text-white/60">{Math.round(minTemp)}°</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl mt-8">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <SunIcon className="w-6 h-6 text-white" />
                Hourly Forecast
              </h2>

              <div className="flex gap-4 overflow-x-auto pb-4">
                {Object.values(forecast)[0]
                  ?.slice(0, 8)
                  .map((item) => (
                    <div
                      key={item.dt}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[100px] text-center hover:bg-white/20 transition-all duration-200"
                    >
                      <p className="text-white/60 text-sm mb-2">{new Date(item.dt_txt).toLocaleTimeString("en-US", { hour: "2-digit", hour12: false })}</p>
                      <div className="flex justify-center mb-2">{getWeatherIcon(item.weather[0].main, "w-10 h-10")}</div>
                      <p className="text-white font-semibold">{Math.round(item.main.temp)}°</p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailsPage;
