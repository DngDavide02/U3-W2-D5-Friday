import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SearchInput } from "../components/ui/SearchInput";
import { RecentCities } from "../components/ui/RecentCities";
import { useRecentCities } from "../hooks/useWeather";
import logo from "../assets/METEOCODE.png";

const HomePage = () => {
  const navigate = useNavigate();
  const { recentCities, saveRecentCity, clearRecentCities } = useRecentCities();

  const handleSearch = (city: string) => {
    saveRecentCity(city);
    navigate(`/details/${city}`);
  };

  const handleCitySelect = (city: string) => {
    navigate(`/details/${city}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-6"
          >
            <img src={logo} alt="WeatherCode Logo" className="w-32 h-32 mx-auto drop-shadow-lg" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            WeatherCode
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg text-gray-600 mb-8">
            Accurate weather forecasts updated in real time
          </motion.p>
        </div>
      </motion.header>

      {/* Search Section */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        <div className="mb-12">
          <SearchInput onSearch={handleSearch} className="mx-auto" />
        </div>

        {/* Recent Cities */}
        <div className="mb-16">
          <RecentCities cities={recentCities} onCitySelect={handleCitySelect} onClear={clearRecentCities} />
        </div>

        {/* Features Section */}
        <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Why choose WeatherCode?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Real Time</h3>
              <p className="text-gray-600">Data updated every hour from OpenWeather API for always accurate forecasts</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Modern Design</h3>
              <p className="text-gray-600">Elegant and intuitive interface with smooth animations and responsive design</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast and Simple</h3>
              <p className="text-gray-600">Type the city name and get all the weather information you need immediately</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Weather Animation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full shadow-lg">
            <svg className="w-16 h-16 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HomePage;
