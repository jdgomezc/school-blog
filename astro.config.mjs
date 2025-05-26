// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import dotenv from "dotenv";
import icon from "astro-icon";
import react from "@astrojs/react";
// import netlify from "@astrojs/netlify";

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
  env: {
    schema: {
      DB_HOST: envField.string({
        access: "public",
        context: "client",
      }),
      DB_PORT: envField.number({
        access: "public",
        context: "client",
      }),
      DB_NAME: envField.string({
        access: "public",
        context: "client",
      }),
      DB_USER: envField.string({
        access: "public",
        context: "client",
      }),
      DB_PASSWORD: envField.string({
        access: "public",
        context: "client",
      }),
      BETTER_AUTH_SECRET: envField.string({
        access: "public",
        context: "client",
      }),
      BETTER_AUTH_URL: envField.string({
        access: "public",
        context: "client",
      }),
      IMG_FOLDER: envField.string({
        access: "public",
        context: "client",
      }),
      PDF_FOLDER: envField.string({
        access: "public",
        context: "client",
      }),
      APP_URL: envField.string({
        access: "public",
        context: "client",
      }),
    },
  },
});
