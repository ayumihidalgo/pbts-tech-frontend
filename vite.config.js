import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  // Use VITE_API_URL from environment or fall back to localhost for development
  const apiUrl = env.VITE_API_URL || 'http://localhost:3001';

  return {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        input: {
          home: resolve(import.meta.dirname, 'index.html'),
          contact: resolve(import.meta.dirname, 'contact/index.html'),
          clients: resolve(import.meta.dirname, 'clients/index.html'),
          career: resolve(import.meta.dirname, 'career/index.html'),
          constructionWarehouses: resolve(import.meta.dirname, 'construction/warehouses/index.html'),
          constructionCivil: resolve(import.meta.dirname, 'construction/civil-structural/index.html'),
          constructionElectrical: resolve(import.meta.dirname, 'construction/electrical/index.html'),
          constructionArchitecture: resolve(import.meta.dirname, 'construction/architecture/index.html'),
          constructionMechanical: resolve(import.meta.dirname, 'construction/mechanical/index.html'),
          constructionLandscaping: resolve(import.meta.dirname, 'construction/landscaping/index.html'),
          manufacturingAutomations: resolve(import.meta.dirname, 'manufacturing/automations-engineering/index.html'),
          manufacturingBusiness: resolve(import.meta.dirname, 'manufacturing/business-system-support/index.html'),
          manufacturingBoard: resolve(import.meta.dirname, 'manufacturing/board-engineering/index.html'),
          manufacturingTooling: resolve(import.meta.dirname, 'manufacturing/tooling-metal-fabrication/index.html'),
          projectsCompleted: resolve(import.meta.dirname, 'projects/completed/index.html'),
          projectsOngoing: resolve(import.meta.dirname, 'projects/ongoing/index.html'),
        },
      },
    },
  };
});