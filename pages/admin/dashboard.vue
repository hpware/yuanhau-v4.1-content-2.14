<script setup lang="ts">
import { ref } from "vue";

interface md {
  id: number;
  nickname: string;
  content: string;
}

const donateamount = ref(0);
const donatepeople = ref(0);
const router = useRouter();
const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const username = cookieusername.value;
const mdresdata = ref<md[]>([]);
const fmperror = ref("");
if (
  !token.value ||
  token.value === "" ||
  !cookieusername.value ||
  cookieusername.value === ""
) {
  router.push("/admin/logout");
}
useHead({
  title: "管理者Panel",
});
fetchMarkdownPosts();
async function fetchMarkdownPosts() {
  try {
    const res = await fetch("/api/admin/fetch-markdown-list", {
      method: "GET",
    });
    if (res.ok) {
      const redata = await res.json();
      mdresdata.value = redata;
    } else {
      fmperror.value = "錯誤";
    }
  } catch (e) {
    fmperror.value = "發生了錯誤";
  }
}
// Check User Auth
const userauth = async () => {
  try {
    const req = await fetch("/api/admin/checkauth?plaform=", {
      method: "POST",
      body: `${token.value}`,
    });
    const res = await req.json();
    if (res.status !== "ok" && res.user === null) {
      router.push("/admin/logout");
    }
  } catch (e) {
    console.log(e);
  }
};
onMounted(async () => {
  await userauth();
});
</script>
<template>
  <div class="content">
    <div class="header">
      <h1>後台管理</h1>
      <i class="bi bi-person"></i> {{ username }}
    </div>
    <div class="nav">
      <span><a href="/admin/dashboard">首頁</a></span>
      &nbsp;
      <span><a href="/admin/account">帳戶</a></span>
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
      <hr />
      <div class="markdown-list">
        <div class="md-header">
          <h2>MD 編輯系統</h2>
          <div class="nav">
            <a href="/admin/markdown/create"><i class="bi bi-plus"></i></a>
            <a href="/admin/markdown/delete"><i class="bi bi-trash"></i></a>
          </div>
        </div>
        <div class="md" v-if="!fmperror">
          <div v-for="md in mdresdata" :key="md.id">
            <a :href="`/admin/markdown/edit?id=${md.id}`"
              ><div class="window mdwindow">
                <h5>{{ md.nickname }}</h5>
                <p>{{ md.id }}</p>
              </div></a
            >
          </div>
        </div>
        <div v-else>
          {{ fmperror }}
        </div>
        <br />
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
.dash {
  animation: fade-in 800ms ease-in-out;
}
.dtitle {
  margin-bottom: 0;
  margin-top: 10px;
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
.md-header {
  display: absolute;
  left: 0;
  right: 0;
  margin-top: 10px;
  h2 {
    margin: 0;
  }
  .nav {
    margin: 10px;
    color: white;
    a {
      color: white;
      transition: all 300ms ease-in-out;
    }
    a:hover {
      color: rgb(208, 208, 208);
    }
  }
}
.md {
  display: flex;
  transition: all 300ms;
  right: 0;
  left: 0;
  width: 100%;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    text-decoration-color: none;
  }
}
.mdwindow {
  width: fit-content;
  min-width: 150px;
  height: fit-content;
  min-height: 125px;
  color: white !important;
  transition: all 150ms ease-in-out;
  border-width: 3px;
  border-style: solid;
  border-color: #545454;
  text-decoration: none !important;
  grid-template-columns: 1fr;
  a {
    color: white !important;
    text-decoration: none !important;
    text-decoration-color: none;
  }
  a:hover {
    color: white !important;
  }
  h5 {
    color: white !important;
    text-decoration: none !important;
  }
  p {
    color: white !important;
    text-decoration: none !important;
  }
}
.mdwindow:hover {
  border-color: #6ba5c7;
  filter: drop-shadow(0 0 2em #444444aa);
}
</style>
