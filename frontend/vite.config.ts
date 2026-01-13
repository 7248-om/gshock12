import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), ''); // Fixed: Use process.cwd() for better Env loading
    return {
      // 1. THIS IS THE FIX: Force absolute paths
      base: '/', 
      
      server: {
        port: 3000,
        host: '0.0.0.0',
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
        },
        ...(mode === 'development' && {
          proxy: {
            '/api': {
              target: 'http://localhost:5001',
              changeOrigin: true,
              secure: false,
            },
          },
        }),
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'), // Best practice: Point @ to src, not root
        }
      }
    };
});