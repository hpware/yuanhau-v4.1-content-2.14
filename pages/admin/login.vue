<script lang="ts" setup>
// Init
useHead({
  title: "管理者Panel登入區域",
});
import SHA512 from "crypto-js/sha512";
const token = useCookie("admintoken");
const username = ref("");
const pwd = ref("");
const encryptedpwd = ref("");
const router = useRouter();
const sitekey = process.env.YUANHAU_CAPTCHA;
const captchaSuccess = ref(false);
const error = ref("");
onMounted(async () => {
  await import("friendly-challenge/widget");
});

// Redirect dashboard
if (token.value) {
  router.push("/admin/dashboard");
}
const usercheck = async (e: Event) => {
  e.preventDefault();
  encryptedpwd.value = SHA512(pwd.value).toString();
  if (!captchaSuccess.value) {
    error.value = "請先完成驗證碼";
    return;
  } else {
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
        username.value = data.user;
        router.push("/admin/dashboard");
      } else {
        alert("Wrong Password");
      }
    } catch (error) {
      alert("Wrong Password");
    }
  }
  pwd.value = "";
  encryptedpwd.value = "";
};
function captchadone() {
  captchaSuccess.value = true;
}
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
        <div
          class="frc-captcha captcha"
          :data-sitekey="sitekey"
          :data-callback="captchadone"
          data-lang="zh_TW"
          data-puzzle-endpoint="https://captcha.yuanhau.com/puzzle.php"
        ></div>
        <button>登入</button>
        <div class="temp">
          <h6>
            系統還沒做好ㄝ，可以用<a href="/temp/obtain_admin"
              >按鈕取得暫時的管理員權限</a
            >
          </h6>
        </div>
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
</style>
