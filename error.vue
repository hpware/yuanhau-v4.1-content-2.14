<script setup lang="ts">
import NavBar from "~/components/NavBar.vue";
const error = useError();
useHead({
  title: `系統錯誤 | 吳元皓`,
});
</script>

<template>
  <NuxtLayout>
    <NavBar />
    <main>
      <h1>{{ error.statusCode }}</h1>
      <h3>{{ error.message }}</h3>
      <h4>這個網站只是在放置 @nuxt/content v2.14 的資訊而已，如果要使用其他功能，請把網址改成 <a href="https://yuanhau.com">yuanhau.com</a></h4>
    </main>
    <footer>
      <p>Copyright © {{ new Date().getFullYear() }} 吳元皓</p>
    </footer>
  </NuxtLayout>
</template>
<style scoped>
footer {
  position: fixed;
  bottom: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.829);
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
