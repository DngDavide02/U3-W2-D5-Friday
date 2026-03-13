import { motion } from "framer-motion";
import { WeatherData } from "../../types/weather";
import { formatTemperature, getWeatherIconUrl, getWeatherBackground, capitalize } from "../../utils/dateUtils";

interface WeatherCardProps {
  weather: WeatherData;
  isDetailed?: boolean;
}

export const WeatherCard = ({ weather, isDetailed = false }: WeatherCardProps) => {
  const backgroundClass = getWeatherBackground(weather.weather[0].main);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`weather-card ${backgroundClass} text-white relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{weather.name}</h2>
            <p className="text-white/80 text-sm">{weather.sys.country}</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">{new Date().toLocaleDateString("en-US", { weekday: "short" })}</p>
            <p className="text-white/80 text-sm">{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
          </div>
        </div>

        {/* Main weather info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img src={getWeatherIconUrl(weather.weather[0].icon, "4x")} alt={weather.weather[0].description} className="w-24 h-24" />
            <div>
              <p className="text-4xl font-bold">{formatTemperature(weather.main.temp)}</p>
              <p className="text-white/90">{capitalize(weather.weather[0].description)}</p>
            </div>
          </div>
        </div>

        {/* Additional details */}
        {isDetailed && (
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center space-x-2">
              <span className="text-white/80 text-sm">Feels like:</span>
              <span className="font-semibold">{formatTemperature(weather.main.feels_like)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white/80 text-sm">Humidity:</span>
              <span className="font-semibold">{weather.main.humidity}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white/80 text-sm">Wind:</span>
              <span className="font-semibold">{weather.wind.speed} m/s</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white/80 text-sm">Pressure:</span>
              <span className="font-semibold">{weather.main.pressure} hPa</span>
            </div>
          </div>
        )}

        {/* Min/Max temperatures */}
        <div className="flex justify-between mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center space-x-1">
            <span className="text-white/80 text-sm">Min:</span>
            <span className="font-semibold">{formatTemperature(weather.main.temp_min)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-white/80 text-sm">Max:</span>
            <span className="font-semibold">{formatTemperature(weather.main.temp_max)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
