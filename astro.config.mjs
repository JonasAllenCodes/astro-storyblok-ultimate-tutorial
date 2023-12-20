import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import tailwind from "@astrojs/tailwind";
import basicSsl from '@vitejs/plugin-basic-ssl';
import vercel from "@astrojs/vercel/serverless"

const env = loadEnv("", process.cwd(), 'STORYBLOK');

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      ...(env.STORYBLOK_ENV !== 'development' && {
        bridge: env.STORYBLOK_IS_PREVIEW === "yes"
      }),
      components: {
        page: "storyblok/Page",
        config: "storyblok/Config",
        feature: "storyblok/Feature",
        grid: "storyblok/Grid",
        teaser: "storyblok/Teaser",
        hero: "storyblok/Hero",
        "popular-articles": "storyblok/PopularArticles",
        "all-articles": "storyblok/AllArticles",
        article: "storyblok/Article",
      },
      apiOptions: {
        region: "us",
      },
    }),
    tailwind()
  ],
  ...(env.STORYBLOK_ENV !== 'development' && {
    output: env.STORYBLOK_IS_PREVIEW === 'yes' ? 'server' : 'static'
  }),
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  ...(env.STORYBLOK_ENV !== 'development' && {
    adapter: vercel()
  }),
});
