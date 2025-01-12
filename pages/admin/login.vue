<script lang="ts" setup>
// Init
const token = useCookie("admintoken");
const username = ref("");
const pwd = ref("");
// Redirect dashboard
if (token.value) {
  router.push("/admin/dashboard");
}
// Login [TODO]
</script>
<template>
  <div>
    <form>
      <label for="username">使用者</label><br />
      <input type="text" id="username" v-model="username" required />
      <br />
      <label for="password">密碼</label>
      <br />
      <input type="password" v-model="pwd" required />
      <br />
      <button>登入</button>
    </form>
  </div>
</template>
