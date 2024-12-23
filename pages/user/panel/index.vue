<script setup lang="ts">
import { ref } from "vue";
const githubUsername = ref("");

//const token = useCookie('token');

//const ge = await fetch('https://api.github.com/user',
//    {
//        method: 'GET',
//        headers: {
//            'Authorization': `Bearer ${token}`,
//            'Accept': 'application/vnd.github.v3+json'
//        }
//    }
//) .then(response => {
//    if (!response.ok) {
//        throw new Error('Network response was not ok ' + response.statusText);
//    }
//    return response.json();
//})
//const data = await ge;
//console.log(data);
</script>
<template>
  <div>
    <h1>
      <span>{{ githubUsername }}</span
      >的面板
    </h1>
  </div>
</template>
