// vite.config.js - Configuración mínima
import { defineConfig } from 'vite';

export default defineConfig({
  // Configuración base
  base: '/',
  
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: false // Desactivar el overlay de errores para evitar distracciones
    }
  }
});
