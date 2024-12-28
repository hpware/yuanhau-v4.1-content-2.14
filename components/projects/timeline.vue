<script setup lang="ts">
import { ref, onMounted } from "vue";
const props = defineProps<{
  date: string;
  title: string;
  content: string;
  links: string;
}>();
</script>
<template>
  <div class="component">
    <span class="date"> {{ props.date }}</span>
    <span class="title"> {{ props.title }}</span>
    <span class="content">{{ props.content }}</span>
    <div class="links">{{ props.links }}</div>
  </div>
</template>
<style scoped>
.component {
  .date {
    font-size: 0.8em;
    color: rgb(133, 133, 133);
    margin-top: 0em;
    margin-bottom: 0.5em;
  }
  .title {
    font-size: 1.5em;
    margin-top: 0em;
    margin-bottom: 0.5em;
  }
  .content {
    font-size: 1em;
    margin-top: 0em;
    margin-bottom: 0.5em;
  }
  .links {
    font-size: 0.8em;
    margin-top: 0em;
    margin-bottom: 0.5em;
  }
}
</style>
