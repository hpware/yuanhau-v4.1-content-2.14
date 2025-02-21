import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
    try {
      const { data, error } = await supabase
        .from("pages_content_markdown")
        .select("content")
        .eq("uuid", `${id}`)
        .single();
      if (error || data === null) {
        return {
          statusCode: 403,
          message: "No Content",
        };
      }
      event.node.res.setHeader("Content-Type", "text/markdown; charset=utf-8");
      return `${data.content}`;
    } catch (e) {
      console.log("error", e);
      return {
        error: 500,
      };
    }
});
