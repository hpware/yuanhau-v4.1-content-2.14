<script setup lang="ts">
import { ref } from "vue";
import { marked } from "marked";
import { animate } from 'motion';
import '~/components/about.css';
import Loading from '~/components/loading/discordstyle.vue';
useHead({
  title: '關於我 | 吳元皓',
  meta: [
    { name: 'description', content: '關於吳元皓' },
  ],
});
// Refs
const codinghistory = ref();
const loading = ref(true);
// Coding History List
async function getCodingHistoryMD() {
  try {
    const mdfile = await fetch("/md/about.md");
    const mdtext = await mdfile.text();
    codinghistory.value = marked(mdtext);
  } catch (e) {
    throw createError({
      statusCode: 500,
      message: '錯誤: ' + e,
    });
    loading.value = false;
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }    
}
  getCodingHistoryMD();
  </script>
<template>
  <div v-if="loading" class="loading">
    <Loading/>
  </div>
    <section id="about" class="about" v-if="!loading">
        <div v-ref="codinghistory" v-html="codinghistory"></div>
    </section>
</template>
<style scoped>
.loading {
  justify-content: center;
  align-items: center;
  text-align:center;
  margin-top:5%;
}
</style>