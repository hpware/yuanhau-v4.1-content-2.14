<script setup>
import { defineProps } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  repo: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  MoreText: {
    type: String,
    required: false,
  },
  between_projects: {
    type: String,
    required: true,
  },
  ai: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <p>
    {{ name }}&nbsp;<br />
    <span v-if="props.ai === 'make'" class="small-ai-text"
      >(AI 製作 Key feature)</span
    ><span v-if="props.ai === 'help'" class="small-ai-text"
      >(AI 有幫助完整程式)</span
    >
    <br v-if="props.ai" />
    <a
      v-if="props.about"
      :href="`https://yuanh.xyz/About/AboutThisProject/${props.about}`"
      >關於</a
    >
    <span v-if="props.about && props.repo">&nbsp;</span>
    <a v-if="props.repo" :href="props.repo">Repo</a>
    <span v-if="props.repo && props.website">&nbsp;</span>
    <span v-else-if="props.about && props.website">&nbsp;</span>
    <a v-if="props.website" :href="props.website">網站</a>
    <span v-if="props.MoreText">&nbsp;</span>
    <span v-if="props.MoreText" v-html="props.MoreText"></span>
  </p>
  <hr class="between_projects" v-if="props.between_projects === '1'" />
</template>

<style scoped>
hr.between_projects {
  width: 30%;
  margin-bottom: 0;
}
p {
  margin-top: 0.4em;
  margin-bottom: 0;
}
span.small-ai-text {
  font-size: 0.7em;
  margin-top: 0;
}
</style>
