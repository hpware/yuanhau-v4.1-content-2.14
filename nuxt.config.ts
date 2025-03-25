// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-03-26",

  devtools: {
    enabled: true,
  }, 

  routeRules: {
    "/": { redirect: "https://yuanhau.com" },
    // Sync the old with the new
    "/posts/": { ssr: true },
    "/posts/**": { ssr: true},
    "/mdview/**": { ssr: true },
  },

  modules: [
    "nuxt-umami",
    "@nuxtjs/robots",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@nuxt/content",
  ],

  /*umami: {
    enabled: true,
    host: "https://data.yuanhau.com",
    autoTrack: true,
    id: "2a995ed3-bdc7-4557-bf53-b724d29bb337",
    ignoreLocalhost: true,
  },*/

  site: {
    url: "https://yuanhau.com",
    title: "吳元皓",
    description: "吳元皓的個人網站",
  },

  sitemap: {},

  app: {
    head: {
      htmlAttrs: {
        lang: "zh_Hant",
      },
      link: [
        { rel: "dns-prefetch", href: "https://utfs.io" },
        { rel: "dns-prefetch", href: "https://s3.yhw.tw" },
        {
          rel: "prefetch",
          href: "https://utfs.io/f/CCLPSN5W2HD5ziRBkeSZ5pJYf32lWLvIK8uGb41xkHCUnXm7",
        },
        { rel: "icon", href: "/favicon.ico" },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "吳元皓的個人網站" },
        { name: "og:locale", content: "zh_TW" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      ],
    },
  },

  content: {
    blog: {
      prefix: "/post",
      driver: "fs",
    },
  },

  sourcemap: {
    client: "hidden",
  },
});
