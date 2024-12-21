<script setup lang="ts">
useHead({
    title: '吳元皓',
    meta: [
        { name: 'description', content: '吳元皓的個人網站首頁' },
        { name: 'keywords', content: '吳元皓,吳元皓的個人網站,吳元皓的個人網站首頁,吳元皓的個人網站首頁' },
        { name: 'author', content: '吳元皓' },
        { name: 'copyright', content: '吳元皓' },
    ],
})
import { ref, onMounted } from 'vue';
import { marked } from 'marked';
const post = ref();
const route = useRoute();
const loading = ref(true);
const fetchMD = '/md/blog/' + route.params.year[0] + '/' + route.params.year[1] + '.md';
async function getBlog() {
    try {
        const res = await fetch(fetchMD);
        if (!res.ok || res.status == 404) {
            console.log("asdass");
            throw createError({
                statusCode: 404,
                message: '找不到文章',
            });
        } else {
            const text = await res.text();
            post.value = marked(text);
        }
    } catch (e) {
        throw createError({
            statusCode: 500,
            message: '錯誤: ' + e,
        });
    }
}
onMounted(getBlog);
</script>
<template>
    <div class="topbar">
        <h1>Blog</h1>
    </div>
    <div v-html="post"></div>
</template>