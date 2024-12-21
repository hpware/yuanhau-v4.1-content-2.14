<script setup lang="ts">
const error = useError();
</script>

<template>
    <NuxtLayout>
        <div>
            <h1>{{error.statusCode}}</h1>
            <p> 穿梭者，你好<br/>你已經踏入到一個所人未知的地方<br />
            </p>
        </div>
    </NuxtLayout>
</template>