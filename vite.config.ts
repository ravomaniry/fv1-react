import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3654,
    host: '127.0.0.1',
  },
  plugins: [react()],
});
