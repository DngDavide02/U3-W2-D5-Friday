import axios, { AxiosInstance, AxiosError } from "axios";
import { WeatherData, ForecastData, GeocodingData, WeatherError } from "../types/weather";

// API configuration
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "3c3cc806814b733612a0db2378d0c1bd";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

// Create axios instance with default configuration
class WeatherApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      params: {
        appid: API_KEY,
        units: "metric",
        lang: "en",
      },
    });

    // Request interceptor for logging
    this.api.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error("API Request Error:", error);
        return Promise.reject(error);
      },
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const weatherError: WeatherError = {
          message: "Error during API request",
          code: error.response?.status,
        };

        if (error.response?.status === 404) {
          weatherError.message = "City not found";
        } else if (error.response?.status === 401) {
          weatherError.message = "Invalid API key";
        } else if (error.code === "NETWORK_ERROR") {
          weatherError.message = "Connection error";
        }

        console.error("API Response Error:", weatherError);
        return Promise.reject(weatherError);
      },
    );
  }

  /**
   * Get coordinates for a city name
   */
  async getCoordinates(cityName: string): Promise<GeocodingData[]> {
    try {
      const response = await axios.get<GeocodingData[]>(`${GEO_URL}/direct`, {
        params: {
          q: cityName,
          limit: 1,
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get current weather data
   */
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await this.api.get<WeatherData>("/weather", {
        params: { lat, lon },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get 5-day weather forecast
   */
  async getForecast(lat: number, lon: number): Promise<ForecastData> {
    try {
      const response = await this.api.get<ForecastData>("/forecast", {
        params: { lat, lon },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors consistently
   */
  private handleError(error: unknown): WeatherError {
    if (error instanceof AxiosError) {
      return {
        message: error.response?.data?.message || error.message || "Unknown API error",
        code: error.response?.status,
      };
    }

    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: "Unknown error" };
  }
}

// Export singleton instance
export const weatherApi = new WeatherApiService();
