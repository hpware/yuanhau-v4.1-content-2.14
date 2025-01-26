<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AccountSideNav from "~/components/AccountSideNav.vue";
import SHA512 from "crypto-js/sha512";

useHead({
  title: "Change account Password",
});
const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const username = cookieusername.value
const oldpwd = ref('')
const newpwd = ref('')
const oldpwd512 = ref("")
const newpwd512 = ref("")
const newpwd2 = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const router = useRouter();

// Check User Auth
const userauth = async (e: Event) => {
  e.preventDefault();
  oldpwd512.value = SHA512(oldpwd.value).toString();
  newpwd512.value = SHA512(newpwd.value).toString();
  if (newpwd !== newpwd2)
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
const submit = async () => {
  try {
    const req = await fetch("/api/admin/changepwd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

      })
    })
  }
}
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
      <!--start AI generated block-->
      <form @submit.prevent="">
        <div class="form-group">
          <label>當前密碼：</label>
          <input type="password" v-model="oldpwd" required>
        </div>
        <div class="form-group">
          <label>新密碼：</label>
          <input type="password" v-model="newpwd" required>
        </div>
        <div class="form-group">
          <label>確認新密碼：</label>
          <input type="password" v-model="newpwd2" required>
        </div>
        <button type="submit">更改密碼</button>
      </form>
      <!--end AI generated block-->
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
/*Start Ai gen block*/
.form-group {
  margin: 1rem 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  margin: 1rem 0;
}

.success {
  color: green;
  margin: 1rem 0;
}

/*button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}*/
/*end ai gen block */
</style>
