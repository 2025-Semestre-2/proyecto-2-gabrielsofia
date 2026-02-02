import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Configurar proxy para todas las rutas que comiencen con /api
      '/api': {
        target: 'http://localhost:3000', // URL de tu backend Node.js
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
      
      // También puedes configurar rutas específicas si lo prefieres
      '/hospedajes': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      
      '/actividades': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      
      '/habitaciones': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    },
    
    // Configuraciones adicionales del servidor
    port: 5173, // Puerto del frontend
    host: true, // Permitir acceso desde la red local
    open: true, // Abrir navegador automáticamente
    
    // Configuración CORS para desarrollo
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  },
  
  // Configuración para el build
  build: {
    outDir: 'dist',
    sourcemap: true, // Útil para debugging
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  },
  
  // Resolver alias para importaciones
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@utils': '/src/utils'
    }
  }
})