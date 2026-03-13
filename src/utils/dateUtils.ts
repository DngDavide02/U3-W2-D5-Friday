/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Format date string to readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Format time string to readable format
 */
export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
};

/**
 * Format temperature with unit
 */
export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

/**
 * Get weather icon URL
 */
export const getWeatherIconUrl = (iconCode: string, size: "2x" | "4x" = "2x"): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

/**
 * Get background gradient class based on weather condition
 */
export const getWeatherBackground = (weatherMain: string): string => {
  const condition = weatherMain.toLowerCase();

  switch (condition) {
    case "clear":
      return "weather-gradient-clear";
    case "clouds":
      return "weather-gradient-cloudy";
    case "rain":
    case "drizzle":
    case "thunderstorm":
      return "weather-gradient-rainy";
    case "snow":
      return "bg-gradient-to-br from-blue-100 to-gray-300";
    case "mist":
    case "fog":
    case "haze":
      return "bg-gradient-to-br from-gray-300 to-gray-500";
    default:
      return "weather-gradient-clear";
  }
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Get wind direction from degrees
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

/**
 * Format wind speed
 */
export const formatWindSpeed = (speed: number): string => {
  return `${speed} m/s`;
};

/**
 * Get humidity percentage
 */
export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};

/**
 * Format pressure
 */
export const formatPressure = (pressure: number): string => {
  return `${pressure} hPa`;
};
