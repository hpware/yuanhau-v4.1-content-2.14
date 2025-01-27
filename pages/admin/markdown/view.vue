<script setup lang="ts">
import { ref } from "vue";
import { marked } from "marked";
import { rmSync } from "node:fs";

const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const router = useRouter();
const username = cookieusername.value;
const current_item = ref("");
const markdown = ref("");
const complete = ref(false);
const error = ref("");
const route = useRoute();
const id = route.query.id as string;
const prev = route.query.id as string;
// Skip user check, remove when the login panel & the api works
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
const submit = async () => {
  try {
    const req = await fetch(`/api/admin/push-markdown?id=${id}`, {
      method: "POST",
      body: `${markdown.value}`,
    });
    if (!req.ok) {
      throw new Error("error");
    } else {
      const res = await req.json();
      if (res.status === "ok") {
        complete.value = true;
      }
    }
  } catch (e) {
    console.log(e);
  }
};
async function fetchmarkdown() {
  try {
    const res = await fetch(`/api/db/markdown?id=${id}`);
    const md = await res.text();
    markdown.value = md;
  } catch (e) {
    error.value = `${e}`;
  }
}
onMounted(async () => {
  if (id) {
    await fetchmarkdown();
  }
});
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
      <h1>Markdown editor</h1>

      <i class="bi bi-person"></i> {{ username }} <i class="bi bi-person"></i>
      {{ username }}
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
      <div class="editor" v-if="!complete">
        <form @submit.prevent="submit">
          <textarea v-model="markdown"></textarea>
          <br />
          <button>Submit</button>
        </form>
      </div>
      <div v-else>
        <div>
          <h3>編輯完成！</h3>
          <button @click="router.push('/admin/dashboard')">返回首頁</button>
        </div>
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
.dash {
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
form {
  text-align: center;
  align-self: center;
  justify-content: center;
  align-items: center;
}
textarea {
  left: 0;
  right: 0;
  display: block;
  content: top;
  text-align: left;
  width: 96%;
  height: 500px;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 300ms;
  margin: 0 auto;
  padding: 10px;
}
</style>
