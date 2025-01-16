<script setup lang="ts">
import { ref } from "vue";
import LoadingAnimation from "@/components/loading/discordstyle.vue";
useHead({
  title: "建議 | 吳元皓",
});
const loading = ref();
const dchandle_matrix = ref();
const email = ref();
const message = ref();
const error = ref();
const success = ref();
const errorq = ref(false);
const successq = ref(false);
const func = async () => {
  loading.value = true;
  try {
    const res = await fetch("/api/db/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        discord: dchandle_matrix.value,
        email: email.value,
        message: message.value,
      }),
    });
    if (!res.ok) {
      errorq.value = true;
      error.value = "伺服器出了問題，請稍後再試";
    } else {
      successq.value = true;
      success.value = "成功提交！";
    }
  } catch (e) {
    console.error(e);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};
</script>
<template>
  <div v-if="loading">
    <br />
    <LoadingAnimation />
  </div>
  <div v-if="successq && !loading && !errorq">
    <div class="main">
      <h1 class="title">建議平台</h1>
      <p class="message">{{ success }}</p>
    </div>
  </div>
  <div v-if="errorq && !loading && !successq">
    <div class="main">
      <h1 class="title">建議平台</h1>
      <p class="message">{{ error }}</p>
    </div>
  </div>
  <div class="background" v-if="!successq && !errorq && !loading">
    <div class="main">
      <h1 class="title">建議平台</h1>
      <form @submit.prevent="func">
        <label for="dchandle_matrix">Discord 或 Matrix 帳號</label>
        <input
          type="text"
          id="dchandle_matrix"
          name="dchandle_matrix"
          v-model="dchandle_matrix"
          required
          placeholder="例: hwtw 或 @hwtw:beeper.com"
        />
        <label for="email">信箱</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          required
          placeholder="例: example@yuanhau.com"
        />
        <label for="message">訊息</label>
        <textarea
          id="message"
          name="message"
          v-model="message"
          required
        ></textarea>
        <button>送出</button>
      </form>
    </div>
  </div>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: auto;
  margin: 0 auto;
  padding: 1em;
  background-color: #5050503c;
  width: 50%;
  border-radius: 15px;
  border: 1px solid #ccc;
  transition: fade-in 500ms ease-in-out;
  animation: fade-in 700ms ease-in-out;
}
input {
  margin: 0.5em;
  padding: 0.5em;
  border: 1px solid #1d1d1d;
  border-radius: 7px;
  background-color: #8d8d8d5c;
  width: 100%;
  color: white;
  transition: all 1000ms ease-in-out;
  font-size: 0.8em;
}
input:focus {
  border-color: #ffffff;
}
input::grammar-error {
  border-color: red;
}
input::spelling-error {
  border-color: red;
}
textarea {
  margin: 0.5em;
  padding: 0.5em;
  border: 1px solid #1d1d1d;
  border-radius: 7px;
  background-color: #8d8d8d5c;
  width: 100%;
  color: white;
  transition: all 1000ms ease-in-out;
  min-height: 10em;
  height: 40%;
}
textarea:focus {
  border-color: #ffffff;
}
button {
  margin: 0.5em;
  color: #1d1d1d;
  transition: all 300ms ease-out;
}
button:hover {
  border-color: #1d1d1d;
  background-color: white;
  color: black;
}
@keyframes fade-in-out {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
