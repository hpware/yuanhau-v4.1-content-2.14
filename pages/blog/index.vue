<script setup lang="ts">
import { ref } from 'vue';
import Loading from '@/components/loading/default.vue';
const loading = ref(false);
useSeoMeta({
    title: 'Blog | 吳元皓',
})
</script>
<template>
    <div class="main" id="main">
     <h1 class="title">Blog</h1>
        <h6 class="dec">這裡是我的分享天地，逃離演算法的控制!</h6>
        <Loading v-if="loading" />
        <div v-else>
            <h3>功能即將完成，在給我兩週(就是下一年 ^^)</h3>
        </div>
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