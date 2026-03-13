import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { weatherApi } from '../api/weatherApi';
import { WeatherData, ForecastData, GeocodingData, ForecastDay } from '../types/weather';

/**
 * Hook for fetching weather data by city name
 */
export const useWeather = (cityName: string) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  
  // Get coordinates for the city
  const {
    data: geoData,
    isLoading: isLoadingCoords,
    error: coordsError,
  } = useQuery({
    queryKey: ['coordinates', cityName],
    queryFn: () => weatherApi.getCoordinates(cityName),
    enabled: !!cityName,
    retry: 1,
  });

  // Update coordinates when geocoding data is available
  useEffect(() => {
    if (geoData && geoData.length > 0) {
      setCoordinates({
        lat: geoData[0].lat,
        lon: geoData[0].lon,
      });
    }
  }, [geoData]);

  // Get current weather
  const {
    data: currentWeather,
    isLoading: isLoadingWeather,
    error: weatherError,
  } = useQuery({
    queryKey: ['weather', coordinates?.lat, coordinates?.lon],
    queryFn: () => weatherApi.getCurrentWeather(coordinates!.lat, coordinates!.lon),
    enabled: !!coordinates,
    retry: 2,
  });

  // Get forecast
  const {
    data: forecast,
    isLoading: isLoadingForecast,
    error: forecastError,
  } = useQuery({
    queryKey: ['forecast', coordinates?.lat, coordinates?.lon],
    queryFn: () => weatherApi.getForecast(coordinates!.lat, coordinates!.lon),
    enabled: !!coordinates,
    retry: 2,
  });

  // Process forecast data into daily groups
  const processedForecast: ForecastDay[] | undefined = forecast ? 
    Object.entries(
      forecast.list.reduce((days: Record<string, any[]>, item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!days[date]) days[date] = [];
        days[date].push(item);
        return days;
      }, {})
    ).map(([date, items]) => ({ date, items })) : undefined;

  const isLoading = isLoadingCoords || isLoadingWeather || isLoadingForecast;
  const error = coordsError || weatherError || forecastError;

  return {
    currentWeather,
    forecast: processedForecast,
    isLoading,
    error,
    coordinates,
  };
};

/**
 * Hook for managing recent cities search
 */
export const useRecentCities = () => {
  const queryClient = useQueryClient();
  const [recentCities, setRecentCities] = useState<string[]>([]);

  // Load recent cities from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentCities');
      if (saved) {
        setRecentCities(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading recent cities:', error);
    }
  }, []);

  // Save a city to recent searches
  const saveRecentCity = (cityName: string) => {
    const cleanCity = cityName.trim();
    if (!cleanCity) return;

    const newCities = recentCities
      .filter(city => city.toLowerCase() !== cleanCity.toLowerCase())
      .slice(0, 4); // Keep max 5 cities
    
    newCities.unshift(cleanCity);
    setRecentCities(newCities);

    try {
      localStorage.setItem('recentCities', JSON.stringify(newCities));
    } catch (error) {
      console.error('Error saving recent cities:', error);
    }

    // Invalidate related queries to trigger refetch if needed
    queryClient.invalidateQueries({ queryKey: ['coordinates'] });
  };

  // Clear recent cities
  const clearRecentCities = () => {
    setRecentCities([]);
    try {
      localStorage.removeItem('recentCities');
    } catch (error) {
      console.error('Error clearing recent cities:', error);
    }
  };

  return {
    recentCities,
    saveRecentCity,
    clearRecentCities,
  };
};
