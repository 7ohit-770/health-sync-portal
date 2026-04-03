import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        patient: resolve(__dirname, 'patient.html'),
        consultation: resolve(__dirname, 'consultation.html'),
        integrations: resolve(__dirname, 'integrations.html')
      }
    }
  }
})
