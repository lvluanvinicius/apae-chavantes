import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    server: {
        host: '0.0.0.0',
        origin: 'http://191.37.38.59:5175',
        port: 5175,
        cors: {
            origin: [
                'http://website-dev.apaechavantes.org.br:8001',
                'http://blog-dev.apaechavantes.org.br:8001',
                'http://app-dev.apaechavantes.org.br:8001',
            ],
        },
    },
});
