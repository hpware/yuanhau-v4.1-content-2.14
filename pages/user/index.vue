<script setup lang="ts">
  import Loader from "~/components/loading/randomloader.vue"
  const data = useLogtoUser();
  const data2 = useLogtoClient();
  const loading = ref(false);
</script>
<template>
  <div v-if="loading" class="loading">
    <Loader/>
  </div>
  <main v-else>
  <h2>使用者平台</h2>
  <div>
    <div v-if="!Boolean(data)" class="auth-required">
      <p>你需要登入才能訪問使用者平台</p>
      <a href="/sign-in" class="btn-primary">前往登入</a>
    </div>
  </div>
</main>
</template>
<style scoped>
.auth-required {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  p {
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  }
}
</style>