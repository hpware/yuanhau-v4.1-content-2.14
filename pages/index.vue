<script setup lang="ts">
useHead({
  title: "首頁 | 吳元皓",
});
// Init
import { ref, onMounted } from "vue";
import DiscordStatus from "~/components/DiscordStatus.vue";
import { marked } from "marked";
import { animate } from "motion";
import { NuxtImg } from "#components";

// Ref
const moreAbout = ref(false);
const handPickedImages = ref(false);
const name = ref("");
const othercooltext = ref("");
const pfp = ref();

// Picker
function abcdpicker() {
  const randomValue = Math.random();
  if (randomValue < 0.25) {
    return "D";
  } else if (randomValue < 0.5) {
    return "B";
  } else if (randomValue < 0.75) {
    return "C";
  } else {
    return "A";
  }
}
// Dynamic Name
//function abcdpicker1() {
// const randomValue = (Math.random() * 4);
// switch (randomValue) {
//    case 0:
//      return "D";
//    case 1:
//      return "B";
//    case 2:
//      return "C";
//    case 3:
//      return "A";
//  }
//}
// Dynamic Other Text aka I use some vim btw.
const dytextabcd = abcdpicker();
function dyothertext() {
  if (dytextabcd === "A") {
    return "開啟新篇章?";
  } else if (dytextabcd === "B") {
    return "2025年到了";
  } else if (dytextabcd === "C") {
    return "Developer";
  } else if (dytextabcd === "D") {
    return "IG: yh_.5_26";
  }
}
othercooltext.value = dyothertext();
</script>
<template>
  <div class="background">
    <section id="aboutme" class="about">
      <br />
      <img
        alt="大頭貼"
        class="pfp"
        draggable="false"
        src="/img/pfp-1.jpg"
        v-lazy-load
      />
      <h2 class="mbmt0">
        <span style="margin-bottom: 0em" id="zhname">吳元皓</span>
      </h2>
      <DiscordStatus />
      <p class="mbmt0">
        嗨! 我是一個五專生，我對<a href="/images/" style="color: white">攝影</a
        >與前端(與後端)方面有興趣。 <br />習慣並熟悉使用 VueJS, Git &
        Debian(Ubuntu)<br />
        <span>{{ othercooltext }}</span>
        <!--<span>2024結束了...</span>-->
      </p>
      <h3 class="buttons">
        <NuxtLink class="not-a-button profilebutton" href="/about"
          >關於我</NuxtLink
        >|<NuxtLink class="not-a-button profilebutton" to="/posts/"
          >Blog</NuxtLink
        ><!--|暫用<a
          class="not-a-button profilebutton"
          href="/v3-pages/projects"
          >專案(v3)</a
        >-->|<NuxtLink class="not-a-button profilebutton" to="/images/"
          >照片</NuxtLink
        >
      </h3>
      <p class="socials">
        <a href="https://github.com/hpware" alt="github" id="github"
          ><i class="bi bi-github"></i
        ></a>
        <!--<a href="https://instagram.com/yh_.5_26" alt="instagram" id="instagram"
          ><i class="bi bi-instagram"></i
        ></a>
        <a href="https://threads.net/yh_.5_26" alt="threads" id="threads"
          ><i class="bi bi-threads"></i
        ></a>-->
        <a href="https://yhw.tw/bluesky" alt="bluesky" id="bluesky"
          ><i class="fab fa-bluesky"></i
        ></a>
        <a href="https://youtube.com/@號" alt="youtube" id="youtube"
          ><i class="bi bi-youtube"></i
        ></a>
        <a href="https://unsplash.com/@hwtw" alt="unsplash" id="unsplash">
          <i class="fab fa-unsplash"></i>
        </a>
        <a href="mailto:hw@yuanhau.com" alt="email" id="email"
          ><i class="bi bi-inbox"></i
        ></a>
        <!--<a href="https://unsplash.com/@hwtw" alt="unsplash" id="unsplash">
          <NuxtImg src="/img/unsplash_logo.png" width="auto" />
        </a>-->
      </p>
    </section>
  </div>
</template>
<style scoped>
.background {
  background-image: url("/img/tokyo-smallest.jpg");
  background-size: cover;
  margin: 0;
  padding: 0;
  top: 0;
  bottom: 0;
  display: flex;
  background-repeat: no-repeat;
  background-color: #878a8e;
  background-position: center;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  min-height: 100vh;
}
.about {
  text-align: center;
  top: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.38);
  margin: 0;
  min-height: 100vh;
  width: 100%;
}
@keyframes pfp-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.pfp {
  display: block;
  margin: 0 auto 2rem;
  transition: filter 300ms;
  align-items: center;
  border-radius: 50%;
  width: 20%;
  min-width: 250px;
  animation: ease-in 600ms pfp-fade-in;
  margin-bottom: 0em;
}
.pfp:hover {
  filter: drop-shadow(0 0 2em #444444aa);
}
.not-a-button {
  background-color: transparent;
  border: none;
  color: rgba(191, 191, 191, 0.7);
  font-size: 1em;
  cursor: pointer;
  margin-top: 0em;
  margin-bottom: 0em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  text-decoration: none;
}
.button {
  width: 100%;
  font-size: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
}
.profilebutton {
  color: rgb(220, 220, 220);
  transition: all 200ms;
}
.profilebutton:hover {
  color: rgba(204, 204, 204, 0.75);
}
.socials {
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: white;
    transition: all 200ms;
    margin: 10px;
  }
  a:hover {
    color: #b3b3b3;
  }
}
@media screen and (min-width: 700px) {
  .background {
    position: fixed;
  }
}
@media (max-width: 800px) {
  .profilebutton {
    color: rgb(201, 201, 201);
    transition: all 200ms;
  }
  .profilebutton:hover {
    color: rgba(154, 154, 154, 0.75);
  }
  footer {
    display: none;
  }
  .about {
    font-size: 1em;
  }
  .buttons {
    font-size: 0.86em;
  }
  .socials {
    font-size: 0.8em;
  }
}
.mbmt0 {
  margin-top: 0em;
  margin-bottom: 0em;
}
</style>
