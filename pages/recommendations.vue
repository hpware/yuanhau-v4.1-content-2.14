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
      error.value = "Something went wrong.";
    } else {
      successq.value = true;
      success.value = "Successfully submitted.";
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
        <label for="dchandle_matrix">Discord Handle or Matrix</label>
        <input
          type="text"
          id="dchandle_matrix"
          name="dchandle_matrix"
          v-model="dchandle_matrix"
          required
          placeholder="ex: hwtw or @hwtw:beeper.com"
        />
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          required
          placeholder="ex: web@yuanhau.com"
        />
        <label for="message">Message</label>
        <textarea
          id="message"
          name="message"
          v-model="message"
          required
        ></textarea>
        <button>Submit</button>
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
</style>
