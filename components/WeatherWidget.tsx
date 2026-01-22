import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../services/weatherService';
import { WeatherResults } from '../types';
import { Cloud, CloudRain, Sun, Wind, Droplets, MapPin, Loader2, AlertCircle } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherResults | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [usingMock, setUsingMock] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchWeather();
        setWeather(data.results);
        // If the date matches our mock data date exactly, we assume it fell back to mock
        // (A simple heuristic for this demo)
        if (data.by === 'mock_fallback') {
          setUsingMock(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-800/50 rounded-3xl animate-pulse">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-800/50 rounded-3xl">
        <p className="text-slate-400">Não foi possível carregar o clima.</p>
      </div>
    );
  }

  // Helper to choose icon based on description or slug
  const getWeatherIcon = (slug: string) => {
    if (slug.includes('rain') || slug.includes('chuva')) return <CloudRain className="w-16 h-16 text-blue-400" />;
    if (slug.includes('cloud') || slug.includes('nublado')) return <Cloud className="w-16 h-16 text-slate-400" />;
    return <Sun className="w-16 h-16 text-yellow-400" />;
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl border border-slate-700">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2 text-slate-300">
          <MapPin className="w-4 h-4" />
          <span className="font-medium tracking-wide">{weather.city}</span>
        </div>
        {usingMock && (
          <div className="flex items-center gap-1 text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full border border-orange-400/20" title="Chave de API restrita ao domínio lsuarez.com.br">
            <AlertCircle className="w-3 h-3" />
            <span>Dados de Exemplo</span>
          </div>
        )}
      </div>

      {/* Main Info */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-7xl font-bold text-white tracking-tighter">
            {weather.temp}°
          </div>
          <div className="text-xl text-slate-400 mt-1 capitalize">
            {weather.description}
          </div>
        </div>
        <div className="mr-4">
          {getWeatherIcon(weather.condition_slug)}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-950/30 rounded-2xl p-3 flex items-center gap-3">
          <Droplets className="w-5 h-5 text-blue-300" />
          <div>
            <div className="text-xs text-slate-500">Umidade</div>
            <div className="font-semibold text-slate-200">{weather.humidity}%</div>
          </div>
        </div>
        <div className="bg-slate-950/30 rounded-2xl p-3 flex items-center gap-3">
          <Wind className="w-5 h-5 text-teal-300" />
          <div>
            <div className="text-xs text-slate-500">Vento</div>
            <div className="font-semibold text-slate-200">{weather.wind_speedy}</div>
          </div>
        </div>
      </div>

      {/* Mini Forecast */}
      <div className="flex justify-between pt-4 border-t border-slate-700/50">
        {weather.forecast.slice(0, 4).map((day) => (
          <div key={day.date} className="flex flex-col items-center text-center">
            <span className="text-xs text-slate-500 mb-1">{day.weekday}</span>
            <div className="mb-1">
               {/* Simple icon logic for forecast */}
               {day.condition === 'rain' ? (
                  <CloudRain className="w-4 h-4 text-blue-400" />
               ) : day.condition === 'cloud' ? (
                  <Cloud className="w-4 h-4 text-slate-400" />
               ) : (
                  <Sun className="w-4 h-4 text-yellow-400" />
               )}
            </div>
            <span className="text-sm font-medium text-slate-200">{day.max}°</span>
            <span className="text-xs text-slate-600">{day.min}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;