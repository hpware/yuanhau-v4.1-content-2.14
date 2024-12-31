<script setup lang="ts">
import { ref } from "vue";
useSeoMeta({
  title: "登入 / 註冊系統 | 吳元皓",
  description: "登入系統",
});

//Github Login Func
async function githubLogOn() {
  window.location.href = "/api/auth/github";
}
// Ths is a comment for me testing my enw keyboard!
// This is a comment for me using my macbooks internal keyboard. Its fine.ßß
// UnDeny Login Panel. Thanks Vercel! Why the fuck can't I include this?
</script>
<template>
  <div>
    <div class="background">
      <h2 class="title">登入 / 註冊系統</h2>
      <button @click="githubLogOn()" class="github">
        <i class="bi bi-github"></i>&nbsp;使用 Github 登入
      </button>
      <br />
      <button
        class="google"
        onclick="//window.location.href='/api/auth/google'"
      >
        <i class="b i bi-google"></i>&nbsp;使用 Google 登入 (未完成)
      </button>
      <p class="readreq">您在登入的同時，您將同意我們的條款</p>
    </div>
  </div>
</template>
<style scoped>
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

div.background {
  background: rgba(141, 141, 141, 0.36);
  text-align: center;
  padding: 1rem;
  border-radius: 1rem;
  display: block;
  margin: auto;
  width: 30rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  top: 50%;
  transform: translateY(60%);
  justify-content: center;
  .title {
    margin-top: 5vh;
    margin-bottom: 0;
  }
  p.readreq {
    font-size: 0.5em;
    color: white;
    margin-bottom: 5vh;
    a {
      color: white;
    }
    a:hover {
      color: #ccc;
    }
  }
  button.github {
    background-color: #333;
    color: white;
    transition: ease-in-out 500ms;
  }
  button.github:hover {
    background: linear-gradient(
      to top right,
      rgb(0, 126, 65),
      rgb(76, 0, 255),
      rgb(184, 1, 1)
    );
    background-size: 200% 200%;
    animation: gradientAnimation infinite ease 3s;
  }
  button.google {
    background-color: #393939a5;
    color: white;
  }
}
button {
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #ccc;
  cursor: pointer;
}
button:hover {
  background-color: #ddd;
}
@media only screen and (max-width: 535px) {
  div.background {
    width: 15rem;
  }
  button.google {
    font-size: 0.59em;
  }
}
@media only screen and (max-width: 300px) {
  div.background {
    width: 10rem;
    button.github {
      font-size: 0.59em;
    }
  }
}
</style>
