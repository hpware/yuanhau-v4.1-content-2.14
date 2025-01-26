<script lang="ts" setup>
// Init
useHead({
  title: "管理者Panel登入區域",
});
import SHA512 from "crypto-js/sha512";
const token = useCookie("admintoken");
const usrname = useCookie("usrn");
const username = ref("");
const pwd = ref("");
const encryptedpwd = ref("");
const router = useRouter();
const errorglobal = ref(false);
const errormsg = ref("");

// Redirect dashboard
if (token.value) {
  router.push("/admin/dashboard");
}
const usercheck = async (e: Event) => {
  e.preventDefault();
  encryptedpwd.value = SHA512(pwd.value).toString();
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: encryptedpwd.value,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      token.value = data.token;
      usrname.value = data.user;
      router.push("/admin/dashboard");
    } else {
      let errordata = data.status;
      errorglobal.value = true;
      errormsg.value = `Server: ${errordata}`;
    }
  } catch (error) {
    errorglobal.value = true;
    errormsg.value = `Client: ${error.message}`;
  }
  pwd.value = "";
  encryptedpwd.value = "";
};
</script>
<template>
  <div class="content">
    <h1>管理員登入</h1>
    <div class="error" v-if="errorglobal">
      <span>{{ errormsg }}</span>
    </div>
    <div class="login">
      <form @submit.prevent="usercheck">
        <label for="username">使用者</label>
        <input type="text" id="username" v-model="username" required />
        <label for="password">密碼</label>
        <input type="password" v-model="pwd" required />
        <button>登入</button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.content {
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 60%;
  margin: 0 auto;
  left: 0;
  right: 0;
  transition: all 500ms ease-in-out;
  animation: fade-in 800ms ease-in-out;
}
.login {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  align-self: center;
}
form {
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: all 300ms ease-in-out;
}
input[type="text"],
input[type="password"] {
  margin: 0.5em;
  padding: 0.5em;
  border: 1px solid #1d1d1d;
  color: black;
  border-radius: 7px;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  align-self: center;
  transition: all 1000ms ease-in-out;
  font-size: 0.8em;
}
input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #ffffff;
}
input[type="text"]:not(:focus),
input[type="password"]:not(:focus) {
  border-color: #1d1d1d;
}
button {
  text-align: center;
  align-items: center;
  justify-content: center;
  align-self: center;
}
.error {
  color: rgb(209, 29, 29);
  margin-top: 0;
  margin-bottom: 20px;
}
h1 {
  margin-bottom: 0;
}
</style>
