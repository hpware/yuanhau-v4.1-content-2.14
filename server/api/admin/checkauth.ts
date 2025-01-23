import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);
export default defineEventHandler(async (event) => {
    try {
    const body = readBody(event);
    const { data, error } = await supabase
    .from("admin_login_tokens")
    .select('username')
    .eq("btoken", `${body}` )
    .single();
    if (!data.username || data.username === null) {
        return {
            status: "Error",
            error: "No such cookie is found in the Database",
            user: null,
        }
    } else {
        return {
            status: "ok",
            error: null,
            user: data.username,
        }
    }
    } catch (e) {
        return {
            status: "Server Error",
            error: e,
            user: null
        }
    }
})