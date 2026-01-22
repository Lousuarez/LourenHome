import { WeatherResponse } from '../types';

const API_KEY = 'd540e635'; // The key provided in the image
const CITY_NAME = 'Ponta Grossa,PR';

// Fallback data in case the API Key domain restriction blocks localhost requests
const MOCK_DATA: WeatherResponse = {
  by: "mock_fallback",
  valid_key: true,
  results: {
    temp: 23,
    date: "25/10/2023",
    time: "14:35",
    condition_code: "28",
    description: "Parcialmente nublado",
    currently: "dia",
    cid: "",
    city: "Ponta Grossa, PR",
    img_id: "28",
    humidity: 55,
    wind_speedy: "5.2 km/h",
    sunrise: "05:30 am",
    sunset: "06:45 pm",
    condition_slug: "cloud",
    city_name: "Ponta Grossa",
    forecast: [
      { date: "25/10", weekday: "Qua", max: 25, min: 14, description: "Parcialmente nublado", condition: "cloud" },
      { date: "26/10", weekday: "Qui", max: 26, min: 15, description: "Chuvas esparsas", condition: "rain" },
      { date: "27/10", weekday: "Sex", max: 22, min: 13, description: "Tempo limpo", condition: "clear_day" },
      { date: "28/10", weekday: "Sab", max: 24, min: 14, description: "Ensolarado", condition: "clear_day" },
    ],
  },
  execution_time: 0,
  from_cache: true
};

export const fetchWeather = async (): Promise<WeatherResponse> => {
  try {
    // Note: 'format=json-cors' helps with some CORS issues, but domain restriction on the key might still block it.
    const url = `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${CITY_NAME}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Falha ao buscar dados da API (Provável restrição de domínio ou CORS). Usando dados de exemplo.", error);
    // Return mock data so the UI doesn't break for the user
    return MOCK_DATA;
  }
};