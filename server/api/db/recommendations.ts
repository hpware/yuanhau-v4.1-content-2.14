import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    try {
      const body = await readBody(event);
      const { error, data } = await supabase
        .from("contact")
        .insert([
          {
            handle: body.discord,
            email: body.email,
            message: body.message,
          },
        ])
        .select()
        .single();
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      return data;
    } catch (e) {
      console.error("Server Side Error:", e);
      throw createError({
        statusCode: 500,
        message: "Server Side Error",
      });
    }
  } else {
    throw createError({
      statusCode: 403,
      message: "Request Not Allowed",
    });
  }
});
