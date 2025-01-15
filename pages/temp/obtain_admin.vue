<script setup lang="ts">
const token = useCookie("admintoken");
const username = useCookie("usrn");
const obtain = () => {
    token.value = "temp";
    username.value = "temp_admin";
    token.maxAge = 1000;
    username.maxAge = 1000;
    alert("done!")
}
</script>
<template>
    <div>
        Obtain Admin Access here <br/>
        <button @click="obtain">Obtain</button>
    </div>
</template>
<style scoped>
div {
    margin-top:32px
}
</style>