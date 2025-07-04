import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        newuser: resolve(__dirname, 'newuser.html'),
        host_edit: resolve(__dirname, 'host-edit.html'),
        event: resolve(__dirname, 'event.html'),
        event_edit: resolve(__dirname, 'event-edit.html'),
        guests: resolve(__dirname, 'guests.html'),
        photographer: resolve(__dirname, 'photographer.html'),
        restaurant: resolve(__dirname, 'restaurant.html'),
        venue: resolve(__dirname, 'venue.html'),
        videographer: resolve(__dirname, 'videographer.html')
      },
    },
  },
}) 