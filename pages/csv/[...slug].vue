<script setup lang="ts"></script>
<template>
  <main>
    <ContentDoc>
      <template v-slot="{ doc }">
        <article>
          <h1>{{ doc.title }}</h1>
          <ContentRenderer :value="doc" />
        </article>
      </template>
      <template #not-found>
        <h1>>_<</h1>
        <h2>沒有這個 CSV</h2>
        <a href="/"><button>返回主頁</button></a>
      </template>
    </ContentDoc>
  </main>
</template>
<style scoped></style>
