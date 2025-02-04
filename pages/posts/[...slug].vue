<script setup lang="ts">
import Giscus from "@giscus/vue";
import { inView, animate } from "motion";
import "@/components/markdown.css";
const clipboardthingy = ref(false);
// Year stuff
const link = ref();
const formatDate = (dateString: string) => {
  const D1 = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("zh-TW", D1);
};
// Fetch Short URL
const route = useRoute();
const slug = route.params.slug;
onMounted(async () => {
  try {
    const req = await fetch("/api/db/obtainshortlink", {
      method: "POST",
      body: `/posts/${slug}`,
    });
    const res = await req.json();
    link.value = `https://yhw.tw/${res.short}`;
    console.log("onMounted: " + link.value);
  } catch (e) {
    console.log(e);
  }
});
// Copy Link
const copylink = async () => {
  navigator.clipboard.writeText(link.value);
  clipboardthingy.value = true;
  setTimeout(() => {
    clipboardthingy.value = false;
  }, 500);
};
</script>
<template>
  <main>
    <ContentDoc>
      <template v-slot="{ doc }">
        <article>
          <h1 class="title">{{ doc.title }}</h1>
          <div class="meta">
            <span>最後編輯: {{ formatDate(doc.ldate) }}</span>
          </div>
          <ContentRenderer :value="doc" class="content" />
        </article>
        <p class="share">
          分享連結:
          <span v-if="link"
            >{{ link }}
            <button @click="copylink()" v-if="!clipboardthingy">
              <i class="bi bi-clipboard"></i>
            </button>
            <button v-if="clipboardthingy"><i class="bi bi-check"></i></button>
          </span>
          <span v-else-if="!link">創立中...</span>
        </p>
        <div class="comments">
          <!--Remove load on Giscus Server (maybe github)-->
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
          <!--<div class="force-center">
            <div class="create-quick-link">
              <p>短連結</p>
              <div>{{ link }}</div>
            </div>
          </div>-->
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
h1.title {
  margin-bottom: 0;
}

.meta {
  font-size: 0.8em;
  color: rgb(133, 133, 133);
  margin-top: 0em;
  margin-bottom: 0.5em;
  span {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
}
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
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}
article {
  animation: fade-in 700ms ease-in-out;
}
.content {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: white;
    text-decoration: none;
    a {
      color: white;
      text-decoration: none;
    }
  }
  img {
    max-width: 100%;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 600px) {
  .meta {
    font-size: 0.7em;
  }
  .content {
    font-size: 0.9em;
  }
  .footer {
    p {
      font-size: 0.4em;
    }
    p.end {
      font-size: 0.8em;
    }
  }
}
.force-center {
  width: 100%;
}
.create-quick-link {
  background-color: lightskyblue;
  color: black;
  max-width: 300px;
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: center;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
  position: absolute;
  left: 0;
  right: 0;
  animation: fade-in 300ms ease-in;
  p {
    margin-top: 0;
    margin-bottom: 0;
  }
  div {
    margin-top: 0;
    font-size: 0.7em;
  }
  ::selection {
    opacity: 1;
    background-color: #9c84a7;
  }
}
.share {
  color: #ebe58b94;
  &::selection {
    opacity: 1;
    background-color: #9c84a7;
  }
  ::selection {
    opacity: 1;
    background-color: #9c84a7;
  }
  font-size: 0.7em;
  span {
    font-size: 1.15em;
  }
  button {
    background-color: transparent;
    color: white;
    border-color: transparent;
    padding: 0;
    transition: all 100ms ease-in-out;
  }
  button:hover {
    color: greenyellow;
  }
}
</style>
