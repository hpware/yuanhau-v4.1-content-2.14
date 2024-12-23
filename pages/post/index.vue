<script setup lang="ts">
import { ref } from "vue";
import Loading from "@/components/loading/default.vue";
const loading = ref(false);
useSeoMeta({
  title: "Blog | 吳元皓",
});
const fdate = (dateString: string) => {
  const D1 = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("zh-TW", D1);
};
</script>
<template>
  <div class="main" id="main">
    <h1 class="title">Blog</h1>
    <h6 class="dec">這裡是我的分享天地，逃離演算法的控制!</h6>
    <Loading v-if="loading" />
    <div v-else>
      <ContentList path="/post/">
        <template #default="{ list }">
          <div v-for="article in list" :key="article._path">
            <a :href="article._path" class="card">
              <div class="a">
                <div class="title"><h2>{{ article.title }}</h2><span>{{ fdate(article.date) }}</span></div>
                <p>{{ article.description }}</p>
              </div>
            </a>
            </div>
            </template>
      <template #not-found>
        <p>沒有文章 :(</p>
      </template>
    </ContentList>
    </div>
  </div>
</template>
<style scoped>
.main {
}
h1.title {
  margin-bottom: 0;
  font-size: 2.5em;
}
h6.dec {
  margin-top: 0;
}
h1 {
  margin-bottom: 0;
}
.card {
  text-decoration: none;
  color:white;
  div.a {
    padding: 10px;
    background-color: #33333350;
    border-radius: 10px;
    margin: 1em;
    border: 1px solid transparent;
    transition: all 300ms;
    h2 {
      margin-bottom: 0;
      text-align:left;
    }
    p {
      margin-top: 0;
      color:rgb(153, 153, 153);
    }
  }
  div.a:hover {
    border-color:rgb(71, 166, 255);
  }
  .title {
    display: flex;
    span {
      color:rgb(153, 153, 153);
      text-align:left;
      align-items:left;
      justify-content: left;
      margin-left: auto;
      align-self:self-end;
    }
  }
}
@media (max-width: 502px) {

  h1.title {
    font-size: 2em;
  }
  h6.dec {
    font-size: 0.8em;
  }
  .card {
    div.a {
      padding: 10px;
      background-color: #33333350;
      border-radius: 15px;
      margin: 1em;
      border: 1px solid transparent;
      transition: all 300ms;
      h2 {
        margin-bottom: 0;
        text-align:left;
      }
      p {
        margin-top: 0;
        color:rgb(153, 153, 153);
        font-size:0.6em;
      }
    }
    .title {
      display: block;
      span {
        color:rgb(153, 153, 153);
        text-align:left;
        align-items:left;
        justify-content: left;
        margin-left: auto;
        font-size:0.7em;
        align-self:left;
      }
    }
  }
}
</style>
