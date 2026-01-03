import React from 'react';
import { Zap, Star, Globe, Shield, Sun, Wifi, Car, ArrowRight, Radio, BatteryLow, Smartphone } from 'lucide-react';
import { ModelPiLogo } from '../Logo';

export const NewHeroSection = ({ t, stats, onOrder, theme }: any) => {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${theme === 'midnight' ? 'bg-[#050505]' : 'bg-black'}`}>
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-full text-red-400 text-sm font-black uppercase tracking-widest">
              <Star size={14} /> BATCH 01 PREMIUM
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter">
              <span className="block">MODEL</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-cyan-400">Π</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              {t.hero?.subtitle || "The world's first smartphone with native Starlink connectivity and Neuralink integration"}
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Globe size={16} className="text-cyan-400" />
                <span className="text-sm">Global Coverage</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Sun size={16} className="text-yellow-500" />
                <span className="text-sm">Solar Charging</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield size={16} className="text-red-500" />
                <span className="text-sm">Military Grade</span>
              </div>
            </div>
            
            <div className="pt-8">
              <button 
                onClick={onOrder}
                className="relative group bg-gradient-to-r from-red-600 to-red-800 text-white px-10 py-5 rounded-2xl font-black text-base uppercase tracking-widest hover:from-red-700 hover:to-red-900 transition-all duration-500 shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 transform hover:scale-105"
              >
                <span className="relative z-10">Reserve Your π</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </button>
              
              <p className="text-gray-500 text-sm pt-4">
                {t.hero?.deposit || "Pay 30% deposit to secure your limited edition device"}
              </p>
            </div>
          </div>
          
          {/* Right content - Product showcase */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative w-64 h-[500px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[40px] shadow-2xl border border-gray-700">
                  {/* Screen */}
                  <div className="absolute top-6 left-6 right-6 bottom-16 bg-gradient-to-br from-gray-900 to-black rounded-[30px] overflow-hidden">
                    {/* Screen content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <ModelPiLogo className="w-16 h-16 mb-6 text-red-600" />
                      <h3 className="text-xl font-black text-white mb-2">MODEL Π</h3>
                      <p className="text-cyan-400 text-sm mb-6">STARLINK READY</p>
                      
                      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                        <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700">
                          <Wifi className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-300">SATELLITE</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700">
                          <Sun className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                          <p className="text-xs text-gray-300">SOLAR</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700">
                          <Car className="w-6 h-6 text-red-500 mx-auto mb-1" />
                          <p className="text-xs text-gray-300">TESLA</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700">
                          <Radio className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                          <p className="text-xs text-gray-300">NEURALINK</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Home button */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full border-2 border-gray-600"></div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-red-600/20 rounded-[40px] blur-xl -z-10 animate-pulse"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-red-600/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
        
        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10">
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-black text-white">{stats.booked.toLocaleString()}</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Reserved</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-red-600">{stats.progress.toFixed(1)}%</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Completed</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-white">{stats.remaining.toLocaleString()}</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">Remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};