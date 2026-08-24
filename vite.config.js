import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'; // Importa el compilador oficial de Tailwind v4

export default defineConfig({
  base: '/rosario/',
  plugins: [
    tailwindcss(), // Activa la compilación automática de tus clases en el build
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});