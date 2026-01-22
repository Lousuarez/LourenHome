import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-6xl font-bold text-white tracking-tight">
        {formatTime(time)}
      </h1>
      <p className="text-slate-400 text-lg capitalize mt-1">
        {formatDate(time)}
      </p>
    </div>
  );
};

export default Clock;