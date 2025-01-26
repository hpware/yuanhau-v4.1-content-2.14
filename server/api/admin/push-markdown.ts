import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { data, error } = await supabase
      .from("admin_login_tokens")
      .select("username")
      .eq("btoken", body.token);
    if (!data[0].username || data[0].username === null) {
      return {
        status: "not ok",
        error: 403,
      };
    } else {
      if (event.node.req.method === "POST") {
        if (body.action === "edit") {
          const { data, error } = await supabase
            .from("markdown")
            .update({ content: body.content })
            .eq("id", `${body.id}`)
            .select();
          if (error) {
            return {
              status: "not ok",
              error: 500,
            };
          }
          return {
            status: "ok",
            data: data,
          };
        } else if (body.action === "create") {
          const { data, error } = await supabase
            .from("markdown")
            .insert({ nickname: body.nickname, content: body.content })
            .select("id");
          if (error) {
            return {
              status: "not ok",
              error: 500,
            };
          }
          return {
            status: "ok",
            data: data,
          };
        }
      } else {
        return {
          status: "not ok",
          error: 403,
        };
      }
    }
  } catch (e) {
    console.log(e);
  }
});
