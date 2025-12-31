
import React from 'react';
import { Satellite, Car, Moon, BarChart3, BatteryCharging } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const FeatureSections = ({ t }: any) => {
  const perfData = [
    { name: t.specs.perfLabels.p1, tesla: 95, others: 75 },
    { name: t.specs.perfLabels.p2, tesla: 98, others: 65 },
    { name: t.specs.perfLabels.p3, tesla: 92, others: 80 },
    { name: t.specs.perfLabels.p4, tesla: 99, others: 70 },
  ];

  return (
    <>
      <section id="features" className="py-32 bg-black px-6 scroll-mt-32">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6">{t.features.title}</h2>
            <p className="text-gray-400 text-xl">{t.features.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <Satellite />, title: t.features.starlink.title, desc: t.features.starlink.desc },
              { icon: <Car />, title: t.features.tesla.title, desc: t.features.tesla.desc },
              { icon: <Moon />, title: t.features.mars.title, desc: t.features.mars.desc }
            ].map((f, i) => (
              <div key={i} className="glass-effect p-10 rounded-[2.5rem] border border-white/5 hover:border-red-600 hover:scale-105 transition-all text-center space-y-6 group cursor-default">
                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">{f.icon}</div>
                <h3 className="text-2xl font-black uppercase group-hover:text-red-500 transition-colors">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="specs" className="py-32 bg-neutral-950 px-6 scroll-mt-32">
        <div className="max-w-7xl mx-auto space-y-24">
          <h2 className="text-5xl font-black uppercase text-center tracking-tighter">{t.specs.title}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             <div className="bg-white/5 rounded-3xl p-10 border border-white/10 min-w-0 overflow-hidden flex flex-col">
                <h3 className="text-xl font-bold mb-8 flex items-center space-x-2"><BarChart3 className="text-red-600" /> <span>{t.specs.performance}</span></h3>
                <div className="h-[300px] w-full flex-grow">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <BarChart data={perfData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="name" stroke="#555" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }} />
                      <Bar dataKey="tesla" name={t.specs.modelName} fill="#E82127" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="others" name={t.specs.competitor} fill="#333" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>
             <div className="bg-white/5 rounded-3xl p-10 border border-white/10 min-w-0 overflow-hidden flex flex-col">
                <h3 className="text-xl font-bold mb-8 flex items-center space-x-2"><BatteryCharging className="text-red-600" /> <span>{t.specs.battery}</span></h3>
                <div className="h-[300px] w-full flex-grow">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={[{time:'1h',t:100,o:100},{time:'24h',t:80,o:5}]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="time" stroke="#555" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis stroke="#555" fontSize={10} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }} />
                      <Area type="monotone" dataKey="t" name={t.specs.modelName} stroke="#E82127" fill="#E82127" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>
        </div>
      </section>
    </>
  );
};
