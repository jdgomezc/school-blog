// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import dotenv from "dotenv";
import icon from "astro-icon";

import react from "@astrojs/react";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: "standalone",
  }),

  output: "server",
  integrations: [
      react(),
      icon({
        include: {
          mdi: ["*", "account"], // Load the entire Material Design Icon set or specific icons
        },
      }),
  ],


});
