<script setup lang="ts">
import { ref, onMounted } from "vue";
import Loading from "@/components/loading/discordstyle.vue";
// Start AI Code change (i still need to type to explain what the code is or I will forget)

const loading = ref(true);
const groupimg = ref<Record<string, any[]>>({});

useSeoMeta({
  title: "我的相簿 | 吳元皓",
});

async function getList() {
  try {
    const res = await fetch("/api/db/imagelist");
    const jlist = await res.json();
    // Group stuff I guess, via its groups
    groupimg.value = jlist.reduce((acc: Record<string, any[]>, img: any) => {
      // Makes the group into a new group that is what the obj is about.
      const group = img.grouped || "其他";
      // acc is an obj that stores grouped objs, acc starts as an empty obj, and slowly decodes per image, until its compelete.
      if (!acc[group]) {
        acc[group] = [];
      }
      // obj group push the img (the img: any thing) via the group prop
      acc[group].push(img);
      // return to groupImages.value NOT getList();
      return acc;
    }, {});
  } catch (e) {
    console.error(e);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 3000);
  }
}
function gettags(tagg: string) {
  return (
    tagg
      // the /[\[\]]/g is to trim the [] in the start and end of an array from the server aka supabase.
      .replace(/[\[\]]/g, "")
      .split(",")
      // .map takes each item in a array and trim the unneed spaces like  this using .trim to filter it out and throw it to the filter.
      .map((tag) => tag.trim())
      // Filter empty tags (It uses javascript boolean to check if the values are just a blank space or null or undefined or 0 (which maybe used for some images, but it isn't need for now.))
      .filter((tag) => tag)
  );
}
// End AI code change
onMounted(() => {
  getList();
});
</script>

<template>
  <div class="main" id="main">
    <h1 class="title">相簿</h1>
    <h6 class="dec">
      這裡全部都是我拍的照片! Mostly in <i class="bi bi-badge-hd-fill"></i>
    </h6>
    <Loading v-if="loading" />
    <div v-else>
      <div v-for="(images, group) in groupimg" :key="group" class="container">
        <h2 class="title">{{ group }}</h2>
        <div class="image-grid">
          <div v-for="image in images" :key="image.id" class="image-card">
            <a :href="image.link" target="_blank">
              <img :src="image.src" :alt="image.alt" />
              <div class="image-tags">
                <span v-for="tags in gettags(image.tags)" :key="tags"
                  >#{{ tags }}</span
                >
              </div>
            </a>
          </div>
        </div>
      </div>
      <footer class="beg">
        <p>
          如果你想用這些照片，去用吧！你只需要把我與我的網站放在照片的來源就好了。
        </p>
        <p>
          如果想支持我，我可以在<a href="https://yhw.tw/paypal" target="_blank"
            >Paypal</a
          >上贊助～
        </p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/** Start AI edit block */
.container {
  margin-bottom: 2rem;
  text-align: center;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  .title {
    margin: 1rem 0;
    font-size: 1.5rem;
  }
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  display: flex;
}

.image-card {
  border-radius: 8px;
  display: block;
  overflow: hidden;
  transition: transform 300ms;
  text-decoration: none;
  a {
    text-decoration: none;
    color: white;
  }
}

.image-card:hover {
  transform: scale(1.02);
  transform: drop-shadow(0 0 5em #444444aa);
}

.image-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.image-tags {
  padding: 0.5rem;
  font-size: 0.9rem;
  gap: 10px;
  span {
    background-color: #82858559;
    border-radius: 10px;
    padding: 0.2rem 0.5rem;
  }
}
/** end ai code block*/
h1.title {
  margin-bottom: 0;
  font-size: 2.5em;
}
h6.dec {
  margin-top: 0;
}
h1 {
  margin-bottom: 0;
}
@media only screen and (max-width: 700px) {
  .imagetags {
    spam {
      font-size: 0.8em;
    }
  }
}
</style>
