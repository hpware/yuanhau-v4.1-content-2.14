<script setup lang="ts">
const token = useCookie("admintoken");
const username = useCookie("usrn");
const sitekey = process.env.YUANHAU_CAPTCHA;
const captchaSuccess = ref(false);
const obtain = () => {
  //if (captchaSuccess.value) {
  token.value = "temp";
  username.value = "temp_admin";
  token.maxAge = 1000;
  username.maxAge = 1000;
  alert("done!");
  //} else {
  //  alert("Please compelete the captcha");
  //}
};
onMounted(async () => {
  await import("friendly-challenge/widget");
});
</script>
<template>
  <div>
    <h2>Obtain Admin Access</h2>
    <h6>Compelte captcha</h6>
    <!--<div
      class="frc-captcha captcha"
      :data-sitekey="sitekey"
      :data-callback="captchadone"
      data-lang="zh_TW"
      style="align-items:center;text-align:center;align-self:center;left:0;right:0;display:block;content:center;align-content:center;"
      data-puzzle-endpoint="https://captcha.yuanhau.com/puzzle.php"
    ></div>-->
    <button @click="obtain">Obtain</button>
  </div>
</template>
<style scoped>
div {
  margin-top: 32px;
}
</style>
