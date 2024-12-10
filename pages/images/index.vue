<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '@/components/loading/default.vue';
const loading = ref(true);
const groupImages = ref<Record<string, any[]>>({});
const md = ref();
useSeoMeta({
    title: '我的相簿 | 吳元皓',
})

interface Image {
    img: string;
    alt: string;
    tags: string[];
    origin: string;
    group: string;
}

async function getList() {
    try {
        const res = await fetch('/api/imageslist');
        const jlist = await res.json();
        return jlist;
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
}
</script>
<template>
    <div class="main" id="main">
        <h1 class="title">相簿</h1>
        <h6 class="dec">這裡全部都是我拍的照片! Mostly in <i class="bi bi-badge-hd-fill"></i></h6>
        <Loading v-if="loading" />
        <div v-else>
            <div v-for="(images, group) in getList()" :key="group">
                <h2>{{ group }}</h2>
                <div v-for="image in images" :key="image.id">
                    <a :href="image.url" target="_blank">
                        <img :src="image.url" :alt="image.alt" />
                    </a>
                </div>
            </div>
            <footer class="beg">
            <p>如果你想用這些照片，去用吧！你只需要把我與我的網站放在照片的來源就好了。</p>
            <p>相機很貴的，如果想支持我，我可以在<a href="https://paypal.me/howardwu16802" target="_blank">Paypal</a>上贊助～</p>
        </footer>
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