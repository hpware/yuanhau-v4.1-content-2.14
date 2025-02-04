<script setup lang="ts">
import { animate } from "motion";
import { ref } from "vue";

const ff = ref(false);
const x_off = ref();

const ff_off = () => {
  ff.value = false;
};
const ff_on = () => {
  ff.value = true;
};
</script>
<template>
  <div class="enablesidebar" v-if="!ff">
    <button @click="ff_on" alt="Menu Button" id="menu-button">
      <i class="bi bi-list"></i>
    </button>
  </div>
  <div>
    <Transition name="slide">
      <div class="nav" v-if="ff">
        <div class="nav-content">
          <button class="x-off" @click="ff_off" alt="Close the menu">
            <i class="bi bi-x" v-ref="x_off"></i>
          </button>

          <!--Main Navagation-->
          <NuxtLink to="/" @click="ff_off"
            ><button alt="Home page">
              <i class="bi bi-house"></i>首頁
            </button></NuxtLink
          >
          <NuxtLink to="/about" @click="ff_off"
            ><button alt="About page">
              <i class="bi bi-info-circle"></i>關於我
            </button></NuxtLink
          >
          <NuxtLink to="/posts/" @click="ff_off"
            ><button alt="Blog">
              <i class="bi bi-journal-text"></i>Blog
            </button></NuxtLink
          >
          <NuxtLink to=""
            ><button alt="Photo library">
              <i class="bi bi-images"></i>相簿
            </button></NuxtLink
          >
          <NuxtLink to="/recommendations" @click="ff_off"
            ><button alt="Blog">
              <i class="bi bi-chat-left-text"></i>建議/聯絡
            </button></NuxtLink
          >
          <NuxtLink to="/v3-pages/projects" @click="ff_off">
            <button alt="Blog">
              <i class="bi bi-node-plus-fill"></i>專案(v3)
            </button></NuxtLink
          >
          <!--<NuxtLink to=""
            ><button alt="My Projects" class="nd">
              <i class="bi bi-code-square"></i>專案
            </button></NuxtLink
          >--->
          <a href="mailto:hw@yuanhau.com" target="_blank"
            ><button alt="email"><i class="bi bi-inbox"></i>我的信箱</button></a
          >
          <!--<a href="/user/login" class="login"><button alt="login"><i class="bi bi-person"></i>登入</button></a>-->

          <!--Bottom Buttons-->
          <p class="socials">
            <a href="https://github.com/hpware" target="_blank"
              ><i class="bi bi-github"></i
            ></a>
            <a href="https://yhw.tw/threads" target="_blank"
              ><i class="bi bi-threads"></i
            ></a>
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
:root {
  --navbar-width: 200px;
}
.po {
  z-index: 1000;
}
.enablesidebar {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  width: 72px;
  button {
    background: #43afbb40;
    color: white;
    border: 0;
    margin-right: 10px;
    margin-top: 10px;
    border-radius: 100px;
    cursor: pointer;
  }
}
.nav {
  .x-off {
    margin-top: 10px;
    font-size: 1.5em;
    place-items: center;
  }
  background: transparent;
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  width: var(--navbar-width);
  height: 100%;
  background: #12642771;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  button {
    background: transparent;
    color: white;
    border: 0;
    padding: 0;
    cursor: pointer;
    display: flex;
    gap: 25px;
    align-items: center;
    height: 50px;
    font-size: 16px;
    font-weight: 200;
    letter-spacing: 2px;
    line-height: 1;
    padding: 0 25px;
    transition: ease-in-out 200ms;
    text-decoration: none;
  }
  button:hover {
    color: rgb(207, 207, 207);
  }
  .nd {
    color: rgb(170, 170, 170);
  }
  .nd:hover {
    color: rgb(170.17, 170);
  }
}

.socials {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 1.5rem;
  transform: translateX(18%);
  a {
    color: white;
    transition: all 200ms;
    margin: 10px;
  }
  a:hover {
    color: #b3b3b3;
  }
}
.recomendations {
  position: fixed;
  justify-content: center;
  align-items: center;
  bottom: 0.3rem;
  transform: translateX(5%);
  font-size: 0.5em;
  a {
    color: white;
    transition: all 200ms;
    margin: 10px;
  }
  a:hover {
    color: #b3b3b3;
  }
}
@keyframes slide-out {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes slide-in {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
.slide-enter-active {
  animation: slide-out 0.5s ease-out;
}

.slide-leave-active {
  animation: slide-in 0.5s ease-in;
}
.router-link-active {
  button {
    color: rgb(207, 207, 207);
  }
  color: #27676ea9;
}
</style>
