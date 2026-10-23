import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

const frontendPackage = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8')
)

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],

  define: {
    APP_VERSION: JSON.stringify(frontendPackage.version),
  },

  publicDir: 'public',

  build: {
    outDir: 'dist',
  },
})
