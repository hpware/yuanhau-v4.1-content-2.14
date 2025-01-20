import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

export default defineEventHandler(async (event) => {
  if (event.node.req.headers.orgin = `https://${event.node.req.headers.host}`) {
  try {
    const url = new URL(
      event.node.req.url!,
      `https://${event.node.req.headers.host}`,
    );
    const id = url.searchParams.get("id");
    if (event.node.req.method === "POST") {
      const { data, error } = await supabase
        .from("markdown")
        .update({ content: await readBody(event) })
        .eq("id", `${id}`)
        .select()
      if (error) {
        return {
          status: "not ok",
          error: 500,
        };
      }
      return {
        status: "ok",
        data: data,
      }
    } else {
      return {
        status: "not ok",
        error: 403,
      };
    }
  } catch (e) {
    console.log(e);
  }
} else {
  return {
    status: "not ok",
    error: 403,
  }
}
});
