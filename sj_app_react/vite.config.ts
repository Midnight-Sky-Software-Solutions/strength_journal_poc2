import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7089',
        changeOrigin: true,
        secure: false
      },
    }
  },
  ssr: {
    noExternal: ["primereact", "@auth0/auth0-spa-js"],
    
  }
});
