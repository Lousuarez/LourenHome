import React, { useState, useEffect } from 'react';
import Clock from './components/Clock';
import WeatherWidget from './components/WeatherWidget';
import { LayoutDashboard, Calendar, Search } from 'lucide-react';

const App: React.FC = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Top Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl text-blue-400 font-medium mb-2">{greeting}, Luís</h2>
            <Clock />
          </div>
          
          <div className="flex gap-4">
            <button className="p-3 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-colors text-slate-400 hover:text-white">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-3 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-colors text-slate-400 hover:text-white">
              <Calendar className="w-6 h-6" />
            </button>
            <button className="p-3 bg-blue-600 rounded-2xl hover:bg-blue-500 transition-colors text-white shadow-lg shadow-blue-900/20">
              <LayoutDashboard className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <main className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Weather Widget Area - Spans 4 columns */}
          <section className="md:col-span-4 flex flex-col gap-6">
            <WeatherWidget />
            
            {/* Quick Links / Status Placeholder */}
            <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50">
              <h3 className="text-slate-400 font-medium mb-4">Acesso Rápido</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer group">
                  <div className="w-2 h-2 rounded-full bg-green-400 group-hover:scale-125 transition-transform" />
                  <span className="text-sm font-medium">Email Pessoal</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer group">
                  <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
                  <span className="text-sm font-medium">Calendário</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors cursor-pointer group">
                  <div className="w-2 h-2 rounded-full bg-purple-400 group-hover:scale-125 transition-transform" />
                  <span className="text-sm font-medium">Notícias (Tech)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Area - Spans 8 columns */}
          <section className="md:col-span-8 flex flex-col gap-6">
             {/* Today's Focus */}
             <div className="bg-gradient-to-r from-blue-900/40 to-slate-800/40 rounded-3xl p-8 border border-blue-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <h3 className="text-xl font-semibold mb-2 relative z-10">Foco do Dia</h3>
                <p className="text-slate-400 mb-6 max-w-lg relative z-10">
                  Organizar as tarefas principais e verificar a previsão do tempo para planejar a semana.
                </p>
                
                <div className="flex gap-3 relative z-10">
                   <div className="flex-1 bg-slate-900/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                      <span className="block text-xs text-slate-500 mb-1">Próxima Reunião</span>
                      <span className="font-medium">14:00 - Design Review</span>
                   </div>
                   <div className="flex-1 bg-slate-900/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                      <span className="block text-xs text-slate-500 mb-1">Tarefas Pendentes</span>
                      <span className="font-medium">3 itens prioritários</span>
                   </div>
                </div>
             </div>

             {/* Placeholder for future widgets */}
             <div className="grid grid-cols-2 gap-6 h-full">
                <div className="bg-slate-800/30 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-6 text-slate-600">
                    <span className="text-sm">Espaço para Notas</span>
                </div>
                <div className="bg-slate-800/30 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-6 text-slate-600">
                    <span className="text-sm">Espaço para Finanças</span>
                </div>
             </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;