import { ref, onMounted } from "vue";
import { marked } from "marked";

export default function GetMD(file: string) {
  const md = ref();
  async function getMD() {
    const Source = await fetch(file);
    const text = await Source.text();
    md.value = marked(text);
  }
  onMounted(() => {
    getMD();
  });

  return md;
}
