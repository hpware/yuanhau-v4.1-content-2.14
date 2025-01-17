<script setup lang="ts">
import { ref } from "vue";
interface datastuff {
    social: string,
    email: string,
    message: string
};
const donateamount = ref(0);
const donatepeople = ref(0);
const router = useRouter();
const token = useCookie("admintoken");
const cookieusername = useCookie("usrn");
const data = ref<datastuff[]>([]); 
const username = cookieusername.value;
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
</script>
<template>
    <div class="content">
        <div class="header">
            <h1>Recommendation Data Dashboard</h1>
            <h4>Welcome Back, {{ username }}</h4>
        </div>
        <div class="dash">
            <div class="data">
                <table>
                    <tr>
                        <th>DC或MTRX</th>
                        <th>Email</th>
                        <th>訊息</th>
                    </tr>
                    <hr/>
                        <tr v-bind="data">
                        <td>{{ data.social }}</td>
                        <td>{{ data.email }}</td>
                        <td>{{ data.message }}</td>
                    </tr>
            </table>
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
.data {
    text-align:center;
    align-self:center;
    justify-content:center;
    align-items:center;
    table {
        text-align:center;
    align-self:center;
    justify-content:center;
    align-items:center;
    left:0;
    right:0;
    width:100%; 
    text-decoration-line: dotted;
    }
}
</style>
 