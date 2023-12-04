import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

import basicSsl from '@vitejs/plugin-basic-ssl';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  integrations: [tailwind()]
});
