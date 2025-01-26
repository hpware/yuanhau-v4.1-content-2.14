import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

export default defineEventHandler(async (event) => {
  const url = new URL(
    event.node.req.url!,
    `http://${event.node.req.headers.host}`,
  );
  const id = url.searchParams.get("id");
  if (event.node.req.method === "GET" && id !== null) {
    try {
      const { data, error } = await supabase
        .from("markdown")
        .select("content")
        .eq("id", `${id}`)
        .single();
      if (error || data === null) {
        throw createError({
          statusCode: 403,
          message: "No Content",
        });
      }
      event.node.res.setHeader("Content-Type", "text/markdown; charset=utf-8");
      return `${data.content}`;
    } catch (e) {
      console.log("error", e);
      return {
        error: 500,
      };
    }
  } else {
    return {
      error: 403,
    };
  }
});
