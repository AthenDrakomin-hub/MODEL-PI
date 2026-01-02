
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: number;
  lang: string;
  size?: "large" | "small";
}

export const CountdownTimer = ({ targetDate, lang, size = "large" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const getLabels = (l: string) => {
    switch (l) {
      case 'zh': return ['天', '时', '分', '秒'];
      case 'ja': return ['日', '時', '分', '秒'];
      case 'ko': return ['일', '시간', '분', '초'];
      case 'ru': return ['Дн', 'Ч', 'М', 'С'];
      case 'ar': return ['يوم', 'ساعة', 'د', 'ث'];
      case 'it': return ['G', 'O', 'M', 'S'];
      case 'pt': return ['D', 'H', 'M', 'S'];
      case 'nl': return ['D', 'U', 'M', 'S'];
      case 'tr': return ['G', 'S', 'D', 'S'];
      case 'pl': return ['D', 'G', 'M', 'S'];
      case 'sv': return ['D', 'T', 'M', 'S'];
      case 'es': return ['D', 'H', 'M', 'S'];
      case 'fr': return ['J', 'H', 'M', 'S'];
      case 'de': return ['T', 'S', 'M', 'S'];
      default: return ['D', 'H', 'M', 'S'];
    }
  };

  const labels = getLabels(lang);

  if (size === "small") {
    return (
      <div className={`flex items-center space-x-2 font-mono text-[10px] font-black tracking-tighter text-white ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
        <span>{timeLeft.days}{labels[0]}</span>
        <span>{timeLeft.hours.toString().padStart(2, '0')}{labels[1]}</span>
        <span>{timeLeft.minutes.toString().padStart(2, '0')}{labels[2]}</span>
        <span className="text-red-500">{timeLeft.seconds.toString().padStart(2, '0')}{labels[3]}</span>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-4 gap-4 md:gap-8 ${lang === 'ar' ? 'direction-rtl' : ''}`}>
      {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((value, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="text-4xl md:text-6xl font-black text-red-600 tabular-nums text-glow mb-1">
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{labels[idx]}</div>
        </div>
      ))}
    </div>
  );
};
