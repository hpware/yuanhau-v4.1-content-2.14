<script setup lang="ts">
import { ref } from "vue";

const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const router = useRouter();
const username = cookieusername.value;
// Skip user check, remove when the login panel & the api works
if (
  !token.value ||
  token.value === "" ||
  !cookieusername.value ||
  cookieusername.value === ""
) {
  router.push("/admin/logout");
}
useHead({
  title: "管理者Panel上傳區域",
});
// Check User Auth
const userauth = async () => {
  try {
    const req = await fetch("/api/admin/checkauth?plaform=", {
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
  <div class="content">
    <div class="header">
      <h1>Wasabi S3 Upload</h1>

      <i class="bi bi-person"></i> {{ username }}
    </div>
    <div class="upload">
      <form>
        <input type="file" name="file" id="file" />
        <button>Upload</button>
      </form>
    </div>
  </div>
</template>
