<script setup lang="ts">
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

const dytextabcd = abcdpicker();
function title() {
  if (dytextabcd === "A") {
    return "A";
  } else if (dytextabcd === "B") {
    return "B";
  } else if (dytextabcd === "C") {
    return "C";
  } else {
    return "D";
  }
}

useHead({
  title: title(),
});
</script>
<template>
  <div class="background">
    <section id="aboutme" class="about"></section>
  </div>
</template>

<style scoped>
.background {
  background-image: url("https://utfs.io/f/CCLPSN5W2HD58Z27Hs4o2sROedIPkBh97bo83YyxSurMXgNt");
  background-size: cover;
  margin: 0;
  padding: 0;
  background-repeat: no-repeat;
  background-color: #878a8e;
  background-position: center;
  color: white;
  width: 100%;
  min-height: 100vh;
  z-index: 1;
}
.about {
  text-align: center;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.38);
  margin: 0;
  min-height: 100vh;
  z-index: 1;
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
  min-width: 100px;
  animation: ease-in 300ms pfp-fade-in;
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
footer {
  position: fixed;
  bottom: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.829);
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
    display: none;
  }
}
</style>
