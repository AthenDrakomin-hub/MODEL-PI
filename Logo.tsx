
import React from 'react';

interface LogoProps {
  className?: string;
  glow?: boolean;
}

/**
 * Model Pi 战略徽标 (V2.0 重构版)
 * 设计逻辑：将 Tesla 的 "T" 型结构与希腊字母 "π" 的数学美感深度融合
 * 采用 100x100 的标准化视口，确保跨组件缩放的一致性
 */
export const ModelPiLogo = ({ className = "w-6 h-6", glow = false }: LogoProps) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} ${glow ? 'drop-shadow-[0_0_20px_rgba(232,33,39,0.8)]' : ''} transition-all duration-300`} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* 顶部横梁 - 特斯拉风格的动力学线条 */}
    <path 
      d="M5 22C5 22 25 18 50 18C75 18 95 22 95 22L92 32H8L5 22Z" 
      fill="currentColor"
    />
    
    {/* 左侧支柱 - 垂直且硬朗 */}
    <path 
      d="M32 32L28 82H40L44 32H32Z" 
      fill="currentColor"
    />
    
    {/* 右侧支柱 - 带有优雅的流线型弧度 */}
    <path 
      d="M68 32L72 75C72 82 68 85 60 85C52 85 48 82 48 82L52 72C52 72 55 75 60 75C63 75 64 73 64 70L60 32H68Z" 
      fill="currentColor"
    />

    {/* 核心能量点 - 增强视觉重心 */}
    <circle cx="50" cy="25" r="2" fill="white" className="animate-pulse" />
  </svg>
);

/**
 * 极简版图标 - 用于状态栏或按钮内部
 */
export const ModelPiIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5h20l-1 2H3L2 5zm5 2l-1 10h3L10 7H7zm8 0l1 10c0 1-1 2-3 2h-1l-1-2 1-10h3z" />
  </svg>
);
