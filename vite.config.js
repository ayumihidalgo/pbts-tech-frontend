import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
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
});
