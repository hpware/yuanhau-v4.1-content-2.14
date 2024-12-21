<script setup lang="ts">
useHead({
    title: '首頁 | 吳元皓',
    link: [
        { rel: 'dns-prefetch', href: 'https://utfs.io' },
        { rel: 'dns-prefetch', href: 'https://blogge.yuanh.xyz/' }
    ],
    meta: [
        { name: 'description', content: '吳元皓的個人網站首頁' },
        { name: 'keywords', content: '吳元皓,吳元皓的個人網站,吳元皓的個人網站首頁,吳元皓的個人網站首頁' },
        { name: 'author', content: '吳元皓' },
        { name: 'copyright', content: '吳元皓' },
    ],
})
// Init
import { ref, onMounted } from "vue";
import DiscordStatus from "~/components/DiscordStatus.vue";
import { marked } from "marked";
import { animate } from 'motion';

// Ref
const moreAbout = ref(false);
const handPickedImages = ref(false);
const name = ref("");
const otherCoolText = ref("");
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
    return "";
  } else if (dytextabcd === "B") {
    return "print('Hello World!')";
  } else if (dytextabcd === "C") {
    return "I use some vim btw.";
  } else if (dytextabcd === "D") {
    return "";
  }
}
const othercooltext = dyothertext();
</script>
<template>
  <div class="background">
    <section id="aboutme" class="about">
      <br />
      <NuxtImg alt="大頭貼" class="pfp" draggable="false"
        src="https://utfs.io/f/CCLPSN5W2HD54UUISb2l2q0rQXUaYE5mBZ1PdIuVpt4l6F3T"
        />
      <h2 style="margin-top: 0em; margin-bottom: 0em">
        <span style="margin-bottom:0em;" id="zhname">吳元皓</span>
      </h2>
      <DiscordStatus />
      <p style="margin-top: 0em; margin-bottom: 0em">
        嗨! 我是一個高中生，我對<a
          href="/photos"
          style="color: white"
          >攝影</a
        >與前端(與後端)方面有興趣。 <br />習慣並熟悉使用 HTML, Vercel 與 Git &
        Debian(Ubuntu)<br />
        <span>{{otherCoolText}}</span>
      </p>
      <h3 class="buttons">
        <NuxtLink class="not-a-button profilebutton" href="/about">關於我</NuxtLink><!--|<NuxtLink class="not-a-button profilebutton" to="/blog">Blog</NuxtLink>|<NuxtLink class="not-a-button profilebutton" to="/projects">專案</NuxtLink>|<NuxtLink class="not-a-button profilebutton" to="/images/">照片</NuxtLink>--></h3>
      <p class="socials"><a href="https://github.com/hpware" alt="github"><i class="bi bi-github"></i></a>
        <a href="https://instagram.com/yh_.5_26" alt="instagram"><i class="bi bi-instagram"></i></a>
        <a href="https://threads.net/yh_.5_26" alt="threads"><i class="bi bi-threads"></i></a>
        <a href="mailto:hw@yuanhau.com" alt="email"><i class="bi bi-inbox"></i></a>
        </p>
        <br/>
<!--        <footer>
          <p>Copyright © {{ new Date().getFullYear() }} 吳元皓</p>
        </footer>
-->
    </section>
    </div>
</template>


<style scoped>
.background {
  background-image: url("https://utfs.io/f/CCLPSN5W2HD58Z27Hs4o2sROedIPkBh97bo83YyxSurMXgNt");
  background-size: cover;
  margin:0;
  padding:0;
  display:flex;
  background-repeat: no-repeat;
  background-color:#878a8e;
  background-position: center;
  text-align:center;
  justify-content: center;
  align-items:center;
  color: white;
  width:100%;
  min-height:100vh;
}
.about {
  text-align: center;
  backdrop-filter: blur(10px);
  padding:0;
  margin:0;
  background: rgba(0, 0, 0, 0.38);
  margin:0;
  min-height:100vh;
  width:100%;
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
  min-width:100px;
  animation: ease-in 300ms pfp-fade-in;
  margin-bottom: 0em
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
  width:100%;
  text-align: center;
  display:flex;
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
    margin:10px;
  }
  a:hover {
    color: #b3b3b3;
  }
}
footer {
      position:fixed;
      bottom:1rem;
      text-align: center;
      color:rgba(255, 255, 255, 0.829);
      p {
        font-size: 0.6em;
         margin-bottom: 0;
      }
       a {
         text-decoration: none;
         font-size: 0.8em;
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
        display:none;
    }
}
</style>