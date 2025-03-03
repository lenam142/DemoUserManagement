import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),  // Alias `@` trỏ đến thư mục `src`
  //   },
  // },
})
