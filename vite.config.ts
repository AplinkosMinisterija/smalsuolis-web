import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

export default () => {
  const env = loadEnv('all', process.cwd());

  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: 'prompt',
        includeAssests: ['favicon.ico', 'apple-touc-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Smalsuolis',
          short_name: 'Smalsuolis',
          description: 'Smalsuolis',
          icons: [
            {
              src: '/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'favicon',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'favicon',
            },
            {
              src: '/apple-touch-icon.png',
              sizes: '180x180',
              type: 'image/png',
              purpose: 'apple touch icon',
            },
            {
              src: '/maskable_icon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
          theme_color: '#171717',
          background_color: '#0a1353',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          orientation: 'portrait',
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
              handler: 'CacheFirst',
            },
          ],
        },
      } as Partial<VitePWAOptions>),
    ],
    server: {
      proxy: {
        open: '/',
        '/api': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    assetsInclude: ['**/*.png'],
  });
};
