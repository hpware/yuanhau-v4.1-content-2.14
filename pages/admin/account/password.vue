<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AccountSideNav from "~/components/AccountSideNav.vue";
import SHA512 from "crypto-js/sha512";
import confetti from "js-confetti";

useHead({
  title: "Change account Password",
});
const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const username = cookieusername.value;
const oldpwd = ref("");
const newpwd = ref("");
const oldpwd512 = ref("");
const newpwd512 = ref("");
const newpwd2 = ref("");
const errormsg = ref("");
const success = ref(false);
const loading = ref(false);
const successcanvas = ref();
const router = useRouter();
let successpop: any;
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
  successpop = new confetti();
});
const submit = async (e: Event) => {
  e.preventDefault();
  errormsg.value = "";
  loading.value = true;
  oldpwd512.value = SHA512(oldpwd.value).toString();
  newpwd512.value = SHA512(newpwd.value).toString();
  if (newpwd.value !== newpwd2.value) {
    errormsg.value = "Passwords do not match.";
  } else {
    try {
      const req = await fetch("/api/admin/changepwd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          oldpassword: oldpwd512.value,
          newpassword: newpwd512.value,
          token: token.value,
        }),
      });
      const res = await req.json();
      console.log(res);
      if (res.status === "success") {
        success.value = true;
        successpop.addConfetti({
          emojis: ["🔑", "✨", "🎉", "⭐", "🎆"],
          emojiSize: 100,
          confettiNumber: 50,
        });
      } else {
        errormsg.value = res.status;
      }
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }
};
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
      <div class="errormsg" v-if="errormsg">
        <p>{{ errormsg }}</p>
      </div>
      <div v-else-if="loading" class="loading">
        <div class="spinner-c7wet2"></div>
      </div>
      <div v-else>
        <p>&nbsp;</p>
      </div>
      <!--start AI generated block-->
      <form @submit.prevent="submit" v-if="!success">
        <div class="form-group">
          <label>舊密碼：</label>
          <input type="password" v-model="oldpwd" required />
        </div>
        <div class="form-group">
          <label>新密碼：</label>
          <input type="password" v-model="newpwd" required />
        </div>
        <div class="form-group">
          <label>在輸入一次新的密碼：</label>
          <input type="password" v-model="newpwd2" required />
        </div>
        <button type="submit">更改密碼</button>
      </form>
      <!--end AI generated block-->
      <div class="success" v-if="success">
        <h3>🥳</h3>
        <p>你已成功更改密碼！</p>
        <div v-ref="successcanvas"></div>
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
  color: white;
  h3 {
    font-size: 100px;
    margin-bottom: 0;
  }
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

/*Start 10015.io Copy Block*/
.spinner-c7wet2 {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  left: 0;
  right: 0;
  align-self: center;
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background:
    radial-gradient(farthest-side, #fafafa 94%, #0000) top/9px 9px no-repeat,
    conic-gradient(#0000 30%, #fafafa);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
  animation: spinner-c7wet2 0.6s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
.dots-wila4g {
  width: 34.7px;
  height: 34.7px;
  display: flex;
  justify-content: space-between;
}

.dots-wila4g::before,
.dots-wila4g::after {
  content: "";
  width: 13.4px;
  background:
    radial-gradient(farthest-side, #ffffff 90%, #0000) top,
    radial-gradient(farthest-side, #ffffff 90%, #0000) bottom;
  background-size: 13.4px 13.4px;
  background-repeat: no-repeat;
  transform-origin: 50% calc(100% - 6.7px);
  animation: dots-wila4g 1.2s infinite;
}

.dots-wila4g::after {
  transform-origin: 50% 6.7px;
}

@keyframes dots-wila4g {
  70%,
  100% {
    transform: rotate(-270deg);
  }
}
/*End 10015.io Copy Block*/
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.errormsg {
  p {
    color: #e35e48;
  }
}
</style>
