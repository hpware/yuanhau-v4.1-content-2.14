<script setup lang="ts">
  import { useLogtoUser } from '#imports'; // Add this line if auto-import is disabled
  const user = useLogtoUser();
</script>
<template>
    <h3>User infomation</h3>
  <ul v-if="Boolean(user)"> 
    <li v-for="(value, key) in user"><b>{{ key }}:</b> {{ value }}</li>
  </ul>
</template>