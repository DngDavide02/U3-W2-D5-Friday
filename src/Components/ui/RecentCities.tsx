import { motion } from "framer-motion";
import { ClockIcon } from "@heroicons/react/24/outline";

interface RecentCitiesProps {
  cities: string[];
  onCitySelect: (city: string) => void;
  onClear?: () => void;
}

export const RecentCities = ({ cities, onCitySelect, onClear }: RecentCitiesProps) => {
  if (cities.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Recent searches</h3>
        </div>
        {onClear && (
          <button onClick={onClear} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {cities.map((city, index) => (
          <motion.button
            key={city}
            onClick={() => onCitySelect(city)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-white transition-all duration-200 font-medium text-gray-700"
          >
            {city}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
