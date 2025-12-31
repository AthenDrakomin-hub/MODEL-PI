
import React from 'react';

interface LogoProps {
  className?: string;
  glow?: boolean;
}

/**
 * Model Pi 融合 Logo
 * 设计理念：将特斯拉标志性的 T 型顶栏与希腊字母 π 的双腿结合
 * 采用硬核、几何、极简的视觉风格
 */
export const ModelPiLogo = ({ className = "w-6 h-6", glow = false }: LogoProps) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} ${glow ? 'drop-shadow-[0_0_15px_rgba(232,33,39,0.6)]' : ''}`} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Tesla T-Bar style top - 代表顶层科技与速度 */}
    <path 
      d="M10 25H90L85 35H15L10 25Z" 
      fill="currentColor" 
    />
    
    {/* Left Leg of Pi - 采用特斯拉风格的斜角切割 */}
    <path 
      d="M30 35L25 80H35L40 35H30Z" 
      fill="currentColor" 
    />
    
    {/* Right Leg of Pi - 带有独特的弧度，呼应特斯拉的流线型设计 */}
    <path 
      d="M70 35L75 80C75 85 70 85 65 85H60L55 80L60 35H70Z" 
      fill="currentColor" 
    />
  </svg>
);

/**
 * 备用的极简图标（用于小尺寸显示）
 */
export const ModelPiIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3 6h18l-1 2H4L3 6zm4 2l-1 10h2.5L9 8H7zm8 0l1 10c0 1-1 1-2 1h-1l-1-1 1-9h2z" />
  </svg>
);
