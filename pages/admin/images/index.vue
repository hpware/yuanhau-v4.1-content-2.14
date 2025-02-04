<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import SHA512 from "crypto-js/sha512";
useHead({
  title: "Change account Password",
});
const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const username = cookieusername.value;
const oldpwd = ref("");
const newpwd = ref("");
const oldpwd512 = ref("");
const newpwd512 = ref("");
const newpwd2 = ref("");
const errormsg = ref("");
const success = ref(false);
const loading = ref(false);
const successcanvas = ref();
const router = useRouter();
// Check User Auth
const userauth = async () => {
  try {
    const req = await fetch("/api/admin/checkauth", {
      method: "POST",
      body: `${token.value}`,
    });
    const res = await req.json();
    if (res.status !== "ok" && res.user === null) {
      router.push("/admin/logout");
    }
  } catch (e) {
    console.log(e);
  }
};
onMounted(async () => {
  await userauth();
});
</script>
<template>
  <div></div>
</template>
<style scoped>
.content {
  text-align: center;
  align-self: center;
  justify-content: center;
  align-content: center;
}
</style>
