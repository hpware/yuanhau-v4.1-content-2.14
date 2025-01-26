import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

export default defineEventHandler(async (event) => {
  try {
    const url = new URL(
      event.node.req.url!,
      `http://${event.node.req.headers.host}`,
    );
    const nick = url.searchParams.get("nick");
    const rawBody = (await readBody(event)) || "";
    const content = rawBody.toString();
    if (event.node.req.method === "POST") {
      const { data, error } = await supabase
        .from("markdown")
        .insert([{ nickname: nick }]);
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
