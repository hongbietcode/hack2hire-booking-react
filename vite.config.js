import { defineConfig } from 'vite'

import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

import Pages from 'vite-plugin-pages'

const projectRootDir = resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteCommonjs(),
        alias({
            entries: [
                {
                    find: '@src',
                    replacement: resolve(projectRootDir, 'src'),
                },
                {
                    find: '@apis',
                    replacement: resolve(projectRootDir, 'src/apis'),
                },
                {
                    find: '@components',
                    replacement: resolve(projectRootDir, 'src/components'),
                },
                {
                    find: '@hooks',
                    replacement: resolve(projectRootDir, 'src/hooks'),
                },
                {
                    find: '@utils',
                    replacement: resolve(projectRootDir, 'src/utils'),
                },
                {
                    find: '@stores',
                    replacement: resolve(projectRootDir, 'src/stores'),
                },
            ],
        }),

        Pages({
            exclude: ['**/sections/*.**'],
            extendRoute(route, parent) {
                if (route.path.startsWith('admin')) {
                    return { ...route, meta: { requiresAuth: true } }
                }

                return route
            },
        }),
    ],
    envPrefix: 'OM',
})
