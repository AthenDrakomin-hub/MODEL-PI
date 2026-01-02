
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 注入环境变量，确保在不同平台（Vercel, Local）一致性
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || 'production'),
      'process.env.VITE_USDT_ADDR': JSON.stringify(env.VITE_USDT_ADDR || ''),
      'process.env.VITE_PAYPAL_URL': JSON.stringify(env.VITE_PAYPAL_URL || ''),
      // 同时也注入到 import.meta.env
      'import.meta.env.VITE_USDT_ADDR': JSON.stringify(env.VITE_USDT_ADDR || ''),
      'import.meta.env.VITE_PAYPAL_URL': JSON.stringify(env.VITE_PAYPAL_URL || '')
    },
    server: {
      port: 3000
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1000, // 提高警告限制到 1MB
      rollupOptions: {
        output: {
          // 优化分包策略
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor-react';
              if (id.includes('recharts')) return 'vendor-recharts';
              if (id.includes('lucide-react')) return 'vendor-lucide';
              return 'vendor-others';
            }
          }
        }
      }
    }
  };
});