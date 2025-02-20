import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

export default defineEventHandler(async (event) => {
  console.log("event", event, event.node.req.method);
    try {
      const { data } = await supabase.from("images").select();
      return data;
    } catch (error) {
      console.log("error", error);
      return {
        error: 500,
      };
    }
});
