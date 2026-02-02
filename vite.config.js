import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // The new v4 powerhouse

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(), 
      tailwindcss() // Integrated directly into the engine
    ],
  }
})