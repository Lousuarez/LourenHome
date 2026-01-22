import { WeatherResponse } from '../types';

const API_KEY = 'd540e635'; // A chave extraída da imagem
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
  const url = `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${CITY_NAME}`;
  
  console.log(`[WeatherService] Tentando conectar em: ${url}`);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro na API (Status: ${response.status})`);
    }

    const data = await response.json();
    console.log('[WeatherService] Dados recebidos com sucesso:', data);
    return data;
  } catch (error) {
    console.error("[WeatherService] Falha na conexão real. Usando dados fictícios.", error);
    console.info("Dica: Verifique se a chave da API permite requisições deste domínio (CORS) ou se está restrita a lsuarez.com.br");
    
    // Return mock data so the UI doesn't break for the user
    return MOCK_DATA;
  }
};