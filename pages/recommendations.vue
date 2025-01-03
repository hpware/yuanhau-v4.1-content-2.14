<script setup lang="ts">
import { ref } from "vue";
import loading from "@/components/loading/discordstyle.vue";
useHead: {
  title: "Recommendations | 吳元皓";
}
const func = async () => {
  loading.value = true;
  try {
    const res = await fetch("/api/db/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({
        //discordhandle: discordhandle,
        //email: email,
        //message: message,
    //});
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="background">
    <div class="main">
      <h1 class="title">Recommendations</h1>
      <form @submit.prevent="func">
        <label for="discordhandle">Discord Handle</label>
        <input
          type="text"
          id="discordhandle"
          name="discordhandle"
          required
          placeholder="yh_tw"
        />
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="ex: web@yuanhau.com"
        />
        <label for="message">Message</label>
        <textarea id="message" name="message" required></textarea>
        <button>Submit</button>
      </form>
    </div>
  </div>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 0 auto;
  padding: 1em;
  background-color: rgba(0, 0, 0, 0.5);
  width: 50%;
  border-radius: 10px;
}
input {
  margin: 0.5em;
}
textarea {
  height: 100px;
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
</style>
