<script setup lang="ts">
const router = useRouter();
const token = useCookie("admintoken");
const username = useCookie("usrn");
const logout = async () => {
  token.value = "";
  username.value = "";
  setTimeout(() => {
    router.push("/admin/login");
  }, 500);
};
onMounted(() => {
  logout();
});
useHead({
  title: "管理者Panel登出區域",
});
</script>
<template>
  <div class="content">
    <h1>登出</h1>
  </div>
</template>
<style scoped>
.content {
  padding-top: 30px;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 60%;
  margin: 0 auto;
  left: 0;
  right: 0;
  transition: all 500ms ease-in-out;
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
