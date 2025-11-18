import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),

  integrations: [
    svelte(),
    alpinejs(),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Inline stylesheets smaller than 4kb to reduce render-blocking
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      // Minify CSS for better compression
      cssMinify: 'lightningcss',
    },
  },

  build: {
    // Inline stylesheets for better performance
    inlineStylesheets: 'auto',
  },
});
