<script setup lang="ts">
// Import
import { ref, onMounted } from "vue";
import { marked } from "marked";
// Set values
const md = ref();
//  Get markdownß
async function getMarkdown() {
  const response = await fetch("/api/db/markdown?id=2");
  const data = await response.text();
  md.value = marked.parse(data);
}
// on startßß
onMounted(() => {
  getMarkdown();
});
</script>
<template>
  <div v-ref="md" v-html="md"></div>
</template>
