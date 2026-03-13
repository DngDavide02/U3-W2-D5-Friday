import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { WeatherCard } from "../components/ui/WeatherCard";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { useWeather } from "../hooks/useWeather";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { formatTemperature, getWeatherIconUrl, formatDate, formatTime, capitalize } from "../utils/dateUtils";

const DetailsPage = () => {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const { currentWeather, forecast, isLoading, error } = useWeather(city || "");

  const handleBack = () => {
    navigate("/");
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error.message || "Error loading weather data"} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <ErrorMessage message="No weather data available" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={handleBack} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">{city}</h1>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Current Weather Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <WeatherCard weather={currentWeather} isDetailed={true} />
        </motion.div>

        {/* Hourly Forecast */}
        {forecast && forecast.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hourly Forecast</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <div className="overflow-x-auto">
                <div className="flex space-x-4 pb-4">
                  {forecast[0]?.items.slice(0, 8).map((item, index) => (
                    <motion.div
                      key={item.dt}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex-shrink-0 text-center bg-white/60 rounded-xl p-4 min-w-[100px]"
                    >
                      <p className="text-sm text-gray-600 mb-2">{formatTime(item.dt_txt.split(" ")[1])}</p>
                      <img src={getWeatherIconUrl(item.weather[0].icon)} alt={item.weather[0].description} className="w-12 h-12 mx-auto mb-2" />
                      <p className="font-semibold text-gray-800">{formatTemperature(item.main.temp)}</p>
                      <p className="text-xs text-gray-600 mt-1">{capitalize(item.weather[0].description)}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* 5-Day Forecast */}
        {forecast && forecast.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Forecast for the next days</h2>
            <div className="grid gap-4">
              {forecast.slice(0, 5).map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * dayIndex }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{formatDate(day.date)}</h3>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Min</p>
                        <p className="font-semibold text-blue-600">{formatTemperature(Math.min(...day.items.map((item) => item.main.temp_min)))}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Max</p>
                        <p className="font-semibold text-red-600">{formatTemperature(Math.max(...day.items.map((item) => item.main.temp_max)))}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {day.items.slice(0, 4).map((item) => (
                      <div key={item.dt} className="text-center bg-white/60 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">{formatTime(item.dt_txt.split(" ")[1])}</p>
                        <img src={getWeatherIconUrl(item.weather[0].icon)} alt={item.weather[0].description} className="w-8 h-8 mx-auto mb-1" />
                        <p className="text-sm font-medium text-gray-800">{formatTemperature(item.main.temp)}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
};

export default DetailsPage;
