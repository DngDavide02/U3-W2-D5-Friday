import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SunIcon as SunOutlineIcon, MagnifyingGlassIcon, ClockIcon, SparklesIcon, BoltIcon, ShieldCheckIcon, CloudIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";
import logo from "../assets/METEOCODE.png";
import "./Homepage.css";

function HomePage() {
  const [city, setCity] = useState("");
  const [recentCities, setRecentCities] = useState([]);

  const navigate = useNavigate();

  // localStorage
  useEffect(() => {
    const savedCities = localStorage.getItem("recentCities");
    if (savedCities) {
      setRecentCities(JSON.parse(savedCities));
    }
  }, []);

  //Save city
  const saveCity = (cityName) => {
    const cleanCity = cityName.trim();

    if (cleanCity === "") return;
    let newCities = recentCities.filter((city) => city.toLowerCase() !== cleanCity.toLowerCase());

    newCities.unshift(cleanCity);

    if (newCities.length > 5) {
      newCities = newCities.slice(0, 5);
    }

    // Update state and save
    setRecentCities(newCities);
    localStorage.setItem("recentCities", JSON.stringify(newCities));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city.trim() !== "") {
      saveCity(city);
      navigate(`/details/${city.trim()}`);
    }
  };

  const handleRecentClick = (cityName) => {
    navigate(`/details/${cityName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }}></div>

        {/* Floating Weather Icons */}
        <div className="absolute top-1/4 left-1/4 animate-bounce" style={{ animationDuration: "3s" }}>
          <SunIcon className="w-8 h-8 text-yellow-400/30" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
          <SunIcon className="w-10 h-10 text-blue-400/30" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
          <CloudIcon className="w-9 h-9 text-gray-400/30" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-20 animate-ping"
                style={{ animationDuration: "3s" }}
              ></div>
              <img
                src={logo}
                alt="Weather Logo"
                className="relative w-24 h-24 md:w-32 md:h-32 object-contain animate-pulse"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Weather
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent animate-pulse"> Forecast</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get real-time weather updates with beautiful, accurate forecasts for any city worldwide
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="search-box-premium">
              <MagnifyingGlassIcon className="search-icon-premium" />
              <input
                type="text"
                placeholder="Discover weather in any city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="search-input-premium"
                required
              />
              <div className="search-shimmer"></div>
              <div className="search-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
              </div>
            </div>
          </form>
        </div>

        {/* Recent Cities */}
        {recentCities.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <ClockIcon className="w-5 h-5 text-gray-500" />
              <h2 className="text-xl font-semibold text-gray-700">Recent Searches</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {recentCities.map((cityName, index) => (
                <button
                  key={cityName}
                  onClick={() => handleRecentClick(cityName)}
                  className="px-6 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 text-gray-700 font-medium hover:text-blue-600 transform hover:scale-105 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    {cityName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Cities */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Popular Cities</h2>
            <p className="text-gray-600">Quick access to weather in major cities around the world</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "London", temp: "18°", weather: "Cloudy", icon: "03d" },
              { name: "New York", temp: "22°", weather: "Sunny", icon: "01d" },
              { name: "Tokyo", temp: "25°", weather: "Clear", icon: "01d" },
              { name: "Paris", temp: "16°", weather: "Rainy", icon: "10d" },
              { name: "Sydney", temp: "20°", weather: "Partly Cloudy", icon: "02d" },
              { name: "Dubai", temp: "35°", weather: "Hot", icon: "01d" },
            ].map((city, index) => (
              <button
                key={city.name}
                onClick={() => handleRecentClick(city.name)}
                className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4 hover:bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                    alt={city.weather}
                    className="w-full h-full object-contain transform transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
                <div className="font-semibold text-gray-900 mb-1">{city.name}</div>
                <div className="text-lg font-bold text-blue-600 mb-1">{city.temp}</div>
                <div className="text-xs text-gray-500">{city.weather}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Weather Forecast?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Experience weather tracking with modern design and powerful features</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative transform transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:animate-pulse">
                  <BoltIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">Real-time Updates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Hourly forecasts powered by OpenWeather API with accurate, up-to-date weather data for any location.
                </p>
              </div>
            </div>

            <div className="group relative transform transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:animate-pulse">
                  <SparklesIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">Elegant Interface</h3>
                <p className="text-gray-600 leading-relaxed">Modern, minimalist design with smooth animations and intuitive user experience.</p>
              </div>
            </div>

            <div className="group relative transform transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheckIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-200">Easy to Use</h3>
                <p className="text-gray-600 leading-relaxed">Simply type any city name and get instant weather information with detailed forecasts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
