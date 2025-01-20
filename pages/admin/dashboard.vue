<script setup lang="ts">
import { ref } from "vue";

interface md {
  id: number,
  nickname: string,
  content: string,
}

const donateamount = ref(0);
const donatepeople = ref(0);
const router = useRouter();
const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const username = cookieusername.value;
const mdresdata = ref<md[]>([]);
const fmperror = ref("")
if (
  !token.value ||
  token.value === "" ||
  !cookieusername.value ||
  cookieusername.value === ""
) {
  router.push("/admin/login");
}
useHead({
  title: "管理者Panel",
});
fetchMarkdownPosts();
async function fetchMarkdownPosts() {
  try {
    const res = await fetch("/api/admin/fetch-markdown-list",
      {
        method: "GET",
      }
    );
    if (res.ok) {
      const redata = await res.json();
      mdresdata.value = redata;
    } else {
      fmperror.value = "錯誤"
    }
  } catch (e) {
    fmperror.value = "發生了錯誤"
  }
}
</script>
<template>
  <div class="content">
    <div class="header">
      <h1>Admin Dashboard</h1>
      <h4>{{ username }}, 歡迎回來!</h4>
    </div>
    <div class="nav">
      <span><a href="/admin/dashboard">首頁</a></span>
      &nbsp;
      <span><a href="/admin/logout">登出</a></span>
    </div>
    <hr />
    <div class="dash">
      <div class="donate">
        <h2 class="dtitle">Donate</h2>
        <div class="donate-items">
          <div class="donate-amount window donate-wi">
            <span>金額</span>
            <span>{{ donateamount }}</span>
          </div>
          <div class="donate-people donate-wi window">
            <span>人數</span>
            <span>{{ donatepeople }}</span>
          </div>
        </div>
      </div>
      <hr />
      <div class="contact">
        <h2 class="dtitle">Contact stuff</h2>
        <div class="contact-items">
          <h1></h1>
        </div>
      </div>
      <hr/>
      <div class="markdown-list">
        <div class="mini-header">
          <h2>MD 編輯系統</h2>
          <div class="md" v-if="!fmperror">
          <div v-for="md in mdresdata" :key="md.id">
            <a :href="`/admin/edit-markdown?id=${md.id}`">{{ md.nickname }}</a>
          </div>
          </div>
          <div v-else>
            {{ fmperror }}
          </div>
        </div>
        <br/>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  align-self: center;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
  animation: fade-in 800ms ease-in-out;
}
.header {
  margin-left: 20px;
  h1 {
    margin-bottom: 0;
  }
  h4 {
    margin-top: 0;
  }
}
.dtitle {
  margin-bottom: 0;
}
.donate-items {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 0;
}
.window {
  display: flex;
  flex-direction: column;
  background-color: #545454;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  border-color: #ffffff;
  margin: 10px;
  padding: 10px;
  transition: all 1000ms ease-in-out;
  span {
    color: #ffffff;
    font-size: 1.2em;
    margin-bottom: 0;
    margin-top: 0;
  }
}
.donate {
  background-color: #27272775;
  border-radius: 10px;
  margin: 1em;
  border: 2px solid transparent;
  transition: all 300ms;
  width: 50%;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  justify-content: center;
  align-items: center;
}
.donate-wi {
  height: 60%;
  width: 100px;
}
</style>
