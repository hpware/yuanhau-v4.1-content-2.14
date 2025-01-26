<script setup lang="ts">
import { marked } from "marked";
import "@/components/markdown.css";
const markdown = ref();
const router = useRoute();
const id = router.params.slug;
async function md(id: string) {
  try {
    const req = await fetch(`/api/db/markdown/${id}`);
    const reqtext = await req.text();
    if (
      reqtext.includes("403") &&
      reqtext.includes("message") &&
      reqtext.includes("No Content") &&
      reqtext.startsWith("{") &&
      reqtext.endsWith("}") &&
      reqtext.includes("statusCode")
    ) {
      markdown.value = marked("Markdown not found in db");
      return;
    }
    markdown.value = marked(reqtext);
  } catch (e) {}
}
md(id);
useHead({
  title: `Magic View ${id}`,
});
</script>
<template>
  <main>
    <article>
      <!--I just need to remove the v-ref="markdown" from the html, why the fuck is this a problem?-->
      <div v-html="markdown"></div>
    </article>
    <div class="footer">
      <p>Built using markedJS</p>
    </div>
  </main>
</template>
<style scoped>
h1.title {
  margin-bottom: 0;
}

.meta {
  font-size: 0.8em;
  color: rgb(133, 133, 133);
  margin-top: 0em;
  margin-bottom: 0.5em;
  span {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
}
.comments {
  margin-top: 2rem;
  margin-bottom: 0;
  width: 90%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.footer {
  align-content: end;
  align-items: end;
  text-align: center;
  position: absolute;
  display: grid;
  left: 0;
  right: 0;
  p {
    font-size: 0.5em;
    margin-top: 0.1em;
    margin-bottom: 0;
  }
  p.end {
    margin-bottom: 0.5em;
    margin-top: 0.1em;
    font-size: x-large;
    color: rgb(169, 169, 169);
  }
  a {
    text-decoration: none;
    color: white;
    transition: all 200ms;
  }
  a:hover {
    color: rgb(169, 169, 169);
  }
  margin-top: 1em;
  margin-bottom: 1em;
}
@media (max-width: 502px) {
  .comments {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
}
article {
  animation: fade-in 700ms ease-in-out;
}
.content {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: white;
    text-decoration: none;
    a {
      color: white;
      text-decoration: none;
    }
  }
  img {
    max-width: 100%;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 600px) {
  .meta {
    font-size: 0.7em;
  }
  .content {
    font-size: 0.9em;
  }
  .footer {
    p {
      font-size: 0.4em;
    }
    p.end {
      font-size: 0.8em;
    }
  }
}
</style>
