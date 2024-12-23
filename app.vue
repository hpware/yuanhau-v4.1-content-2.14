<script setup lang="ts">
import "~/components/app.css";
import NavBar from "~/components/NavBar.vue";
import { defineProps, ref, onMounted } from "vue";
</script>
<template>
  <noscript>
    <p>這個網站必需要使用 JavaScript 才能運作</p>
  </noscript>
  <NavBar />
  <NuxtPage />
  <footer>
    <p style="text-align: center; font-size: 0.6em">
      Copyright © {{ new Date().getFullYear() }} 吳元皓
    </p>
  </footer>
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
