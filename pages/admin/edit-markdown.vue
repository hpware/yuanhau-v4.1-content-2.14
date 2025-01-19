<script setup lang="ts">
import { ref } from "vue";

const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const router = useRouter();
const username = cookieusername.value;
const current_item = ref("");
const markdown = ref("");
const prev = ref(false);
// Skip user check, remove when the login panel & the api works
if (
  !token.value ||
  token.value === "" ||
  !cookieusername.value ||
  cookieusername.value === ""
) {
  router.push("/admin/login");
}
useHead({
  title: "管理者Panel",
});
const submit = () => {
  console.log(current_item.value);
};
const preview = () => {
  console.log("preview");
  prev.value = !prev.value;
};
</script>
<template>
  <div class="content">
    <div class="header">
      <h1>Markdown editor</h1>
      <h4>{{ username }}, 歡迎回來!</h4>
    </div>
    <div class="dash">
      <div class="picker">
        <button
          v-for="item in ['A', 'B', 'C', 'D']"
          :key="item"
          @click="current_item = item"
        >
          {{ item }}
        </button>
        &nbsp;
        <button @click="preview">Preview</button>
      </div>
      <div class="preview" v-if="prev"></div>
      <div class="editor" v-else>
        <form @submit.prevent="submit">
          <textarea v-model="markdown"></textarea>
          <button>Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  align-self: center;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
  animation: fade-in 800ms ease-in-out;
}
.header {
  margin-left: 20px;
  h1 {
    margin-bottom: 0;
  }
  h4 {
    margin-top: 0;
  }
}
.dtitle {
  margin-bottom: 0;
}
.donate-items {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 0;
}
.window {
  display: flex;
  flex-direction: column;
  background-color: #545454;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  border-color: #ffffff;
  margin: 10px;
  padding: 10px;
  transition: all 1000ms ease-in-out;
  span {
    color: #ffffff;
    font-size: 1.2em;
    margin-bottom: 0;
    margin-top: 0;
  }
}
.donate {
  background-color: #27272775;
  border-radius: 10px;
  margin: 1em;
  border: 2px solid transparent;
  transition: all 300ms;
  width: 50%;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  justify-content: center;
  align-items: center;
}
.donate-wi {
  height: 60%;
  width: 100px;
}
form {
  text-align: center;
  align-self: center;
  justify-content: center;
  align-items: center;
}
textarea {
  left: 0;
  right: 0;
  display: block;
  content: top;
  text-align: left;
  width: 96%;
  height: auto;
  min-height: 100px;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 300ms;
  margin: 0 auto;
  padding: 10px;
}
</style>
