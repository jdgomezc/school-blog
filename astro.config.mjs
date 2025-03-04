// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from "@astrojs/node";
import dotenv from "dotenv"

dotenv.config()

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({
    mode: "standalone"
  }),
  output: "server"
});