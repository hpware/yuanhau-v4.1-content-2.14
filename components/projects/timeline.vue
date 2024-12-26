<script setup lang="ts">
import { ref, onMounted } from "vue";
</script>
<template>
  <div class="component">
    <span class="date"></span>
    <span class="title"></span>
    <span class="content"></span>
    <span class="links"></span>
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
