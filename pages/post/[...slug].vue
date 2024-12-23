<script setup lang="ts">
import Giscus from "@giscus/vue";
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
            async
          />
        </div>
        <div class="footer">
          <p>
            Built using <a href="https://nuxtjs.org">NuxtJS</a> &
            <a href="https://giscus.app">Giscus.</a>
          </p>
          <p class="end">我的網站，我的規則</p>
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
  margin-bottom: 0;
  width: 90%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.footer {
  align-content: end;
  align-items: end;
  text-align: center;
  position: absolute;
  display: grid;
  left: 0;
  right: 0;
  p {
    font-size: 0.5em;
    margin-top: 0.1em;
    margin-bottom: 0;
  }
  p.end {
    margin-bottom: 0.5em;
    margin-top: 0.1em;
    font-size: x-large;
    color: rgb(169, 169, 169);
  }
  a {
    text-decoration: none;
    color: white;
    transition: all 200ms;
  }
  a:hover {
    color: rgb(169, 169, 169);
  }
  margin-top: 1em;
  margin-bottom: 1em;
}
@media (max-width: 502px) {
  .comments {
    width: 95%;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
