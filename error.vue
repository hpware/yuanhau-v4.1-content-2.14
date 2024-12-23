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
