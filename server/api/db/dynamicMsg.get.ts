import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);
export default defineEventHandler(async (event) => {
    try {
        const { data, error } = await supabase.from("dynamicMsg").select("*").eq("type", "homepage").maybeSingle();
        console.log(data);
        return {
          data: data.text
        }
    } catch(e) {
      console.log(e);
      return {
        data: "Server Side Error."
      }
    }
})