<script setup lang="ts">
import Giscus from '@giscus/vue'
</script>
<template>
    <main>
      <ContentDoc>
        <template v-slot="{ doc }">
          <article>
            <h1>{{ doc.title }}</h1>
            <ContentRenderer :value="doc" />
          </article>
          <div class="comments">
            <Giscus 
            repo="hpware/posts"
            repo-id="R_kgDONg6K8Q"
            category="posts"
           category-id="DIC_kwDONg6K8c4Clc9m"
           mapping="title"
           strict="0"
            reactions-enabled="1"
            emit-metadata="0"
            input-position="bottom"
            theme="cobalt"
            lang="zh-TW"
            loading="lazy"
            crossorigin="anonymous"
            async/>
          </div>
        </template>
        <template #not-found>
            <h1>>_<</h1>
            <h2>沒有這個文章</h2>
            <a href="/blog"><button>返回Blog主頁</button></a>
        </template>
    </ContentDoc>
    </main>
</template>
<style scoped>
.comments {
  margin-top: 2rem;
  margin-bottom:20px;
  width:90%;
  display:block;
  margin-left:auto;
  margin-right:auto;
  
}
</style>