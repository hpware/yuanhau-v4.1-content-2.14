<script setup>
const route = useRoute();
const apiRoutes = ["/", "/foo", "/bar"];
if (!apiRoutes.includes(route.path)) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>

<template>
  <div>
    <NuxtLink to="/foo">foo</NuxtLink>
    <br />
    <NuxtLink to="/bar">bar</NuxtLink>
  </div>
</template>
