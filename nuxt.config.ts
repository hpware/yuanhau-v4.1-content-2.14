import { resolve } from "node:path";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: {
    enabled: true,
  },

  routeRules: {
    "/": { prerender: true },
    "/**": { prerender: true },
    "/prerender/**": { prerender: true },
    "/web3/**": { prerender: true },
    "/api/**": { cors: true },
    "/user/panel/**": { ssr: true },
    "/blog/": { prerender: true },
    "/post/**": { ssr: true },
  },

  modules: [
    "nuxt-umami",
    "@nuxtjs/robots",
    "nuxt-auth-utils",
    "@kgierke/nuxt-basic-auth",
    "@sentry/nuxt/module",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@nuxt/content",
    "nuxt-gtag",
  ],

  umami: {
    enabled: true,
    host: "https://data.yuanhau.com",
    autoTrack: true,
    id: "2a995ed3-bdc7-4557-bf53-b724d29bb337",
    ignoreLocalhost: true,
  },

  site: {
    url: "https://yuanhau.com",
    title: "吳元皓",
    description: "吳元皓的個人網站",
  },

  sitemap: {},

  app: {
    head: {
      htmlAttrs: {
        lang: "zh-Hant",
      },
      link: [
        { rel: "dns-prefetch", href: "https://utfs.io" },
        { rel: "dns-prefetch", href: "https://blogge.yuanh.xyz/" },
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
        {
          name: "keywords",
          content:
            "吳元皓,吳元皓的個人網站,吳元皓的個人網站首頁,吳元皓的個人網站首頁,Web Dev,Photography,Computer Nerd,Howard Wu,yuanhau,wuyuanhau,yuanhau.com,yuanh.xyz,Yuan-Hau Wu,吳元皓,元皓,吳元皓,吳元浩,元浩,吳元浩,吳元浩,五專生,ictechz,攝影,前端方面,台灣的五專生,使用Vue製作,吴元皓,元皓,吴元皓的网站,吴元浩,元浩,吴元浩的网站,吴元浩,五专生,ictechz,摄影,前端方面,台湾的五专生,使用Nuxt制作,Made With Nuxt,student,HTML Dev, Blog Posts, Photo Library, PHP Plugins, Profile Links, JS, Javascript, NextJS, HTML nerd, CSS Dev, CSS, HTML, Web Developer, HTML Developer, CSS Developer, Web Dev, 学生, HTML 开发, 博客文章, 照片库, PHP 插件, 个人资料链接, JS, Javascript, NextJS, CSS 开发, CSS, HTML, Web 开发人员, HTML 开发人员, CSS 开发人员, Web 开发, 學生, HTML 開發, 部落格文章, 照片庫, PHP 插件, 個人資料連結, JS, Javascript, NextJS, CSS 開發, CSS, HTML, Web 開發人員, HTML 開發人員, CSS 開發人員, Web 開發, 熟悉使用 HTML, 熟悉使用CSS , 熟悉使用Vercel, 熟悉使用Git , 熟悉使用Debian Cli, 熟悉使用Ubuntu Cli, 熟悉使用 Debian Cli, 熟悉使用 Ubuntu Cli, Familiar with HTML, Familiar with CSS, Familiar with Vercel, Familiar with Git, Familiar with Debian Cli, Familiar with Ubuntu Cli, Familiar with Debian Cli, Familiar with Ubuntu Cli, 熟悉使用 HTML, 熟悉使用CSS , 熟悉使用Vercel, 熟悉使用Git , 熟悉使用Debian Cli, 熟悉使用Ubuntu Cli, 熟悉使用 Debian Cli, 熟悉使用 Ubuntu Cli",
        },
        { name: "author", content: "吳元皓" },
        { name: "author-email", content: "hw@yuanhau.com" },
        { name: "copyright", content: "吳元皓" },
        { name: "twitter:creator", content: "@ictechz" },
        { name: "twitter:site", content: "https://yuanhau.com" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "吳元皓" },
        { name: "twitter:description", content: "吳元皓的個人網站" },
        { name: "twitter:image", content: "https://yuanhau.com/favicon.jpg" },
        { name: "og:title", content: "吳元皓" },
        { name: "og:description", content: "吳元皓的個人網站" },
        { name: "og:image", content: "https://yuanhau.com/favicon.jpg" },
        { name: "og:url", content: "https://yuanhau.com" },
        { name: "og:site_name", content: "吳元皓" },
        { name: "og:type", content: "website" },
        { name: "og:locale", content: "zh_TW" },
        {
          name: "og:keywords",
          content:
            "吳元皓,吳元皓的個人網站,吳元皓的個人網站首頁,吳元皓的個人網站首頁,Web Dev,Photography,Computer Nerd,Howard Wu,yuanhau,wuyuanhau,yuanhau.com,yuanh.xyz,Yuan-Hau Wu,吳元皓,元皓,吳元皓,吳元浩,元浩,吳元浩,吳元浩,五專生,ictechz,攝影,前端方面,台灣的五專生,使用Vue製作,吴元皓,元皓,吴元皓的网站,吴元浩,元浩,吴元浩的网站,吴元浩,五专生,ictechz,摄影,前端方面,台湾的五专生,使用Nuxt制作,Made With Nuxt,student,HTML Dev, Blog Posts, Photo Library, PHP Plugins, Profile Links, JS, Javascript, NextJS, HTML nerd, CSS Dev, CSS, HTML, Web Developer, HTML Developer, CSS Developer, Web Dev, 学生, HTML 开发, 博客文章, 照片库, PHP 插件, 个人资料链接, JS, Javascript, NextJS, CSS 开发, CSS, HTML, Web 开发人员, HTML 开发人员, CSS 开发人员, Web 开发, 學生, HTML 開發, 部落格文章, 照片庫, PHP 插件, 個人資料連結, JS, Javascript, NextJS, CSS 開發, CSS, HTML, Web 開發人員, HTML 開發人員, CSS 開發人員, Web 開發, 熟悉使用 HTML, 熟悉使用CSS , 熟悉使用Vercel, 熟悉使用Git , 熟悉使用Debian Cli, 熟悉使用Ubuntu Cli, 熟悉使用 Debian Cli, 熟悉使用 Ubuntu Cli, Familiar with HTML, Familiar with CSS, Familiar with Vercel, Familiar with Git, Familiar with Debian Cli, Familiar with Ubuntu Cli, Familiar with Debian Cli, Familiar with Ubuntu Cli, 熟悉使用 HTML, 熟悉使用CSS , 熟悉使用Vercel, 熟悉使用Git , 熟悉使用Debian Cli, 熟悉使用Ubuntu Cli, 熟悉使用 Debian Cli, 熟悉使用 Ubuntu Cli",
        },
        { name: "og:author", content: "吳元皓" },
        { name: "og:author:email", content: "hw@yuanhau.com" },
      ],
    },
  },
  content: {
    blog: {
      prefix: "/post",
      driver: "fs",
    },
  },
  gtag: {
    id: "G-2J2M9834SQ",
  },
});
