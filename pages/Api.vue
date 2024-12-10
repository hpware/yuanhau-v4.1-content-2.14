<script setup lang="ts">
import { ref, onMounted } from "vue";
import { marked } from "marked";

const md = ref();

async function getMarkdown() {
    const response = await fetch("/markdown/pager/api.md");
    const data = await response.text();
    md.value = marked.parse(data);
}
onMounted(() => {
    getMarkdown();
});
</script>
<template>
    <div v-ref="md" v-html="md"></div>
</template>