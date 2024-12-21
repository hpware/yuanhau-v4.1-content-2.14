<script setup lang="ts">
import "~/components/app.css";
import NavBar from '~/components/NavBar.vue';
import { defineProps, ref, onMounted } from "vue";
// Defualt useHead yea, a lot of things
useHead({
  title: '吳元皓',
  link:[
    { rel: 'dns-prefetch', href: 'https://utfs.io' },
    { rel: 'dns-prefetch', href: 'https://blogge.yuanh.xyz/' },
    { rel: 'prefetch', href: 'https://utfs.io/f/CCLPSN5W2HD5ziRBkeSZ5pJYf32lWLvIK8uGb41xkHCUnXm7'}
  ],
  meta: [
    { name: 'description', content: '吳元皓的個人網站' },
    { name: 'keywords', content: '吳元皓,吳元皓的個人網站,吳元皓的個人網站首頁,吳元皓的個人網站首頁, Web Dev, Photography, Computer Nerd, Howard Wu, yuanhau, wuyuanhau, yuanhau.com, yuanh.xyz, Yuan-Hau Wu, 吳元皓, 元皓 ,吳元皓, 吳元浩, 元浩 ,吳元浩, 吳元浩 ,五專生, ictechz, 攝影, 前端方面, 台灣的五專生, 使用Vue製作, 吴元皓, 元皓 ,吴元皓的网站, 吴元浩, 元浩 ,吴元浩的网站, 吴元浩 ,五专生, ictechz, 摄影, 前端方面, 台湾的五专生, 使用Vue制作, Made With Vue, student, HTML Dev, Blog Posts, Photo Library, PHP Plugins, Profile Links, JS, Javascript, NextJS, HTML nerd, CSS Dev, CSS, HTML, Web Developer, HTML Developer, CSS Developer, Web Dev, 学生, HTML 开发, 博客文章, 照片库, PHP 插件, 个人资料链接, JS, Javascript, NextJS, CSS 开发, CSS, HTML, Web 开发人员, HTML 开发人员, CSS 开发人员, Web 开发, 學生, HTML 開發, 部落格文章, 照片庫, PHP 插件, 個人資料連結, JS, Javascript, NextJS, CSS 開發, CSS, HTML, Web 開發人員, HTML 開發人員, CSS 開發人員, Web 開發, 熟悉使用 HTML, 熟悉使用CSS , 熟悉使用Vercel, 熟悉使用Git , 熟悉使用Debian Cli, 熟悉使用Ubuntu Cli, 熟悉使用 Debian Cli, 熟悉使用 Ubuntu Cli, Familiar with HTML, Familiar with CSS, Familiar with Vercel, Familiar with Git, Familiar with Debian Cli, Familiar with Ubuntu Cli, Familiar with Debian Cli, Familiar with Ubuntu Cli, 熟悉使用 HTML, 熟悉使用CSS , 熟悉使用Vercel, 熟悉使用Git , 熟悉使用Debian Cli, 熟悉使用Ubuntu Cli, 熟悉使用 Debian Cli, 熟悉使用 Ubuntu Cli' },
    { name: 'author', content: '吳元皓' },
    { name: 'author-email', content: 'hw@yuanhau.com' },
    { name: 'copyright', content: '吳元皓' },
  ]
})
</script>
<template>
  <NavBar/>
  <NuxtPage/>
  <footer>
          <p style="text-align:center; font-size:0.6em;">Copyright © {{ new Date().getFullYear() }} 吳元皓</p>
  </footer>
</template>
<style scoped>
footer {
      position:fixed;
      bottom:1rem;
      text-align: center;
      color:rgba(255, 255, 255, 0.829);
      p {
        font-size: 0.6em;
        margin-bottom: 0;
        margin-left: 0.5em;
      }
       a {
         text-decoration: none;
         font-size: 0.8em;
       }
}
</style>