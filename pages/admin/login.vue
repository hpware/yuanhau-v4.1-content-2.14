<script lang="ts" setup>
// Init
const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const username = ref("");
const pwd = ref("");
// Redirect dashboard
if (token.value) {
  router.push("/admin/dashboard");
}
// Login [TODO]
const usercheck = async (e: Event) => {
  e.preventDefault();
  alert("Wrong Password");
  username.value = "";
  pwd.value = "";
};
</script>
<template>
  <div class="content">
    <h1>管理員登入</h1>
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
</style>
