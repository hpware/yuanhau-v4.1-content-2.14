<script setup lang="ts">
const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const username = cookieusername.value;
</script>
<template>
  <div class="nav">
    <div class="actions">
      <div class="changepwd">
        <i class="bi bi-key"> </i>
        Change Password
      </div>
    </div>
    <div class="bottom"><i class="bi bi-person"></i>{{ username }}</div>
  </div>
</template>
<style scoped>
.bottom {
  margin-bottom: 10px;
  position: fixed;
  bottom: 0;
}
.nav {
  background-color: transparent;
  position: fixed;
  overflow: auto;
  left: 0;
  bottom: 0;
  top: 0;
  width: 40%;
  height: 100%;
  min-height: 200px;
  max-width: 300px;
}
</style>
