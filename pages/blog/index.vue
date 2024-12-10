<script setup lang="ts">
import { ref } from 'vue';
import Loading from '@/components/loading/default.vue';
const loading = ref(true);
useSeoMeta({
    title: 'Blog | 吳元皓',
})
</script>
<template>
    <div class="main" id="main">
     <h1 class="title">Blog</h1>
        <h6 class="dec">這裡是我的分享天地，逃離演算法的控制!</h6>
        <Loading v-if="loading" />
    </div>
</template>
<style scoped>
.main {
    
}
h1.title {
    margin-bottom:0;
    font-size:2.5em;
}
h6.dec {
    margin-top:0;
}
h1 {
    margin-bottom:0;
}
</style>