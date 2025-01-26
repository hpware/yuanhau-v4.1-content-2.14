import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);
export default defineEventHandler(async (event) => {
  try {
    // Debuging Everything, and the only thing that needed to bee added is "await", fuck myself.
    const body = await readBody(event);
    const { data, error } = await supabase
      .from("admin_login_tokens")
      .select("username")
      .eq("btoken", body);
    if (!data[0].username || data[0].username === null) {
      return {
        status: "Error",
        error: "No such cookie is found in the Database",
        user: null,
      };
    } else {
      return {
        status: "ok",
        error: null,
        user: data[0].username,
      };
    }
  } catch (e) {
    return {
      status: "Server Error",
      error: e.message,
      user: null,
    };
  }
});
