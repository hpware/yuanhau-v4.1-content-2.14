<script setup>
import { ref, onMounted } from "vue";
import { animate, scroll } from "motion";
const loading = ref(null);

onMounted(() => {
  animate(
    loading.value,
    { rotate: 360 },
    {
      type: "spring",
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
      duration: 0.8,
    },
  );
});
</script>
<template>
  <div class="center">
    <!--Loading Animation-->
    <div class="loading" ref="loading"></div>
  </div>
  <br />
  <span class="text">載入中..</span>
</template>
<style scoped>
.loading {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: transparent;
  background-image: url("https://utfs.io/f/CCLPSN5W2HD5ziRBkeSZ5pJYf32lWLvIK8uGb41xkHCUnXm7");
  background-repeat: no-repeat;
  background-size: 100px 100px;
  top: 0;
  bottom: 0;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 500px) {
  .text {
    font-size: 0.8em;
  }
}
</style>
