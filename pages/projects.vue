<script setup lang="ts">
import { ref } from "vue";
import Loading from "@/components/loading/default.vue";
import { marked } from "marked";

const loading = ref(true);
const md = ref();

useSeoMeta({
  title: "我的專案 | 吳元皓",
});

async function getMD() {
  try {
    const res = await fetch("/markdown/projects.md");
    const text = await res.text();
    md.value = marked(text);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  getMD();
});
</script>
<template>
  <div class="main" id="main">
    <h1 class="title">我的專案</h1>
    <h6 class="dec">這裡新的頁面最底部有 Timeline ;)</h6>
    <Loading v-if="loading" />
    <div v-else>
      <div v-ref="md" v-html="md"></div>
    </div>
  </div>
</template>
<style scoped>
.main {
}
h1.title {
  margin-bottom: 0;
  font-size: 2.5em;
}
h6.dec {
  margin-top: 0;
}
h1 {
  margin-bottom: 0;
}
</style>
