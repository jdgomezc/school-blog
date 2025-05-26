// @ts-check
import { defineConfig, envField, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";

import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    service: passthroughImageService(),
  },

  integrations: [react()],

  adapter: netlify(),

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
      GOOGLE_SERVICE_ACCOUNT: envField.string({
        access: "public",
        context: "client",
      }),
    },
  },
});
