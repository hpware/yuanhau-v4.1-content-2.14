import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

export default defineEventHandler(async (event) => {
  try {
    if (event.node.req.method === "GET") {
      const { data, error } = await supabase
        .from("markdown")
        .select("id, nickname")
        .order("id");
      if (error) {
        return {
          error: 500,
        };
      }
      return data;
    } else {
      return {
        error: 403,
      };
    }
  } catch (e) {
    console.log(e);
  }
});
