// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  routeRules: {
    '/': { prerender: true },
    '/**': { prerender: true },
    '/prerender/**': { prerender: true },
    '/web3/**': {prerender: true},
    '/api/**': { cors: true },
    '/user/panel/**': { ssr: true },
    '/blog/': { swr: 3600 },
    '/blog/**': { swr: 3600 },
  },

  modules: [
    'nuxt-umami',
    '@nuxtjs/robots',
    'nuxt-auth-utils',
    '@kgierke/nuxt-basic-auth',
    '@sentry/nuxt/module',
    '@nuxt/image',
  ],
  umami: {
    enabled: true,
    host: 'https://data.yuanhau.com',
    autoTrack: true,
    id: '2a995ed3-bdc7-4557-bf53-b724d29bb337',
    ignoreLocalhost: true,
  },
  site: {
    url: 'https://yuanh.xyz',
    title: '吳元皓',
    lang: 'zh-TW',
    description: '',
    image: '/favicon.jpg',
    twitter: '@yuanhau',
    og: {
      site_name: '吳元皓',
      type: 'website',
      locale: 'zh_TW',
      url: 'https://yuanh.xyz',
      title: '吳元皓',
      description: '',
      images: [
        {
          url: 'https://yuanh.xyz/favicon.jpg',
          width: 1200,
          height: 630,
          alt: '吳元皓',
        },
      ],
    },
  },
  
})