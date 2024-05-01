import { defineConfig } from 'vite';
import suidPlugin from '@suid/vite-plugin';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    suidPlugin(),
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Zicro:Bit',
        short_name: 'Zicro:Bit',
        description: 'Zicro:Bit Control',
        icons: [
          {
            src: '/assets/images/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/images/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        theme_color: '#1976d2',
        background_color: '#1976d2',
        start_url: '/',
        display: 'standalone',
      },
    }),
  ],
  build: {
    target: 'esnext',
  },
});
