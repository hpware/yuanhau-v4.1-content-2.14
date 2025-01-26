<script setup lang="ts">
import { ref } from "vue";
import Loading from "@/components/loading/default.vue";
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const loading = ref(false);
useSeoMeta({
  title: "Blog | 吳元皓",
});
const fdate = (dateString: string) => {
  const D1 = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("zh-TW", D1);
};
const submit_search = (e: Event) => {
  e.preventDefault();
};
const query: QueryBuilderParams = {
  sort: [{ date: -1 }],
};
</script>
<template>
  <div class="main" id="main">
    <div class="top">
      <h1 class="title">Blog</h1>
      <h6 class="dec">這裡是我的分享天地，逃離演算法的控制!(雖然有時候會壞)</h6>
    </div>
    <Loading v-if="loading" />
    <div v-else class="list">
      <!--<div class="search">
        <form @submit="">
          <input type="text" placeholder="Ex: Editor" />
          <button>search</button>
        </form>
      </div>-->
      <ContentList path="/posts/" :query="query">
        <template #default="{ list }">
          <div v-for="article in list" :key="article._path">
            <NuxtLink :to="article._path" class="card">
              <div class="a">
                <div class="title">
                  <h2>{{ article.title }}</h2>
                  <span>{{ fdate(article.date) }}</span>
                </div>
                <p>{{ article.description }}</p>
              </div>
            </NuxtLink>
          </div>
          <div class="footer">
            <p class="adminpanel"><a href="/admin/login">管理員後台</a></p>
            <p>
              Built using <a href="https://nuxtjs.org">NuxtJS</a> &
              <a href="https://giscus.app">Giscus.</a>
            </p>
            <p class="end">我的網站，我的規則</p>
          </div>
        </template>
        <template #not-found>
          <div class="not-found">
            <p>沒有文章 :(</p>
            <p>可能這個系統沒有設定好，記得跑</p>
            <p><code>git submodule update --init --remote</code></p>
          </div>
        </template>
      </ContentList>
    </div>
  </div>
</template>
<style scoped>
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
  color: white;
  div.a {
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #33333327;
    border-radius: 10px;
    margin: 1em;
    border: 2px solid transparent;
    transition: all 300ms;
    h2 {
      margin-bottom: 0;
      text-align: left;
    }
    p {
      margin-top: 0;
      color: rgb(153, 153, 153);
    }
  }
  div.a:hover {
    border-color: rgb(71, 166, 255);
    filter: drop-shadow(0 0 2em #646464aa);
  }
  .title {
    display: flex;
    span {
      color: rgb(153, 153, 153);
      text-align: left;
      align-items: left;
      justify-content: left;
      margin-left: auto;
      align-self: self-end;
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
        text-align: left;
      }
      p {
        margin-top: 0;
        color: rgb(153, 153, 153);
        font-size: 0.6em;
      }
    }
    .title {
      display: block;
      span {
        color: rgb(153, 153, 153);
        text-align: left;
        align-items: left;
        justify-content: left;
        margin-left: auto;
        font-size: 0.7em;
        align-self: left;
      }
    }
  }
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
div.list {
  animation: fade-in 700ms ease-in-out;
}
.search {
  display: flex;
  justify-content: center;
  margin-top: 1em;
  margin-bottom: 1em;
  form {
    display: flex;
    input {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #333333;
      margin-right: 5px;
    }
    button {
      padding: 5px;
      border-radius: 5px;
      background-color: #333333;
      color: white;
      transition: all 500ms;
    }
    button:hover {
      border: 1px solid #9afa9a;
    }
  }
}
@media (max-width: 500px) {
  .top {
    font-size: 0.9em;
    .dec {
      font-size: 0.8em;
    }
  }
  .footer {
    p {
      font-size: 0.4em;
    }
    p.end {
      font-size: 0.8em;
    }
  }
  .card {
    margin-top: 0;
    .a {
      margin-top: 0;
    }
    .title {
      h2 {
        font-size: 0.9em;
      }
    }
  }
}
div.not-found {
  p {
    color: gray;
  }
}
.adminpanel {
  a {
    color: #2599ba;
  }
  a:hover {
    color: #1a728c;
  }
}
</style>
