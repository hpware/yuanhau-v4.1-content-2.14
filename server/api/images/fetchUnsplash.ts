import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
global.fetch = fetch;

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

const img = unsplash.users.getPhotos({ username: "hwtw" });

async function main() {
  const feres = await unsplash.users.getPhotos({ username: "hwtw" });
  if (feres.type !== "success") {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching images" }),
    };
  }
  return feres.response.results;
}

export default defineEventHandler((event) => {
  return main();
});
