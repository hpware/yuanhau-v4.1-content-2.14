import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

export default defineEventHandler(async (event) => {
  console.log("event", event, event.node.req.method);
  if (event.node.req.method === "POST") {
    try {
      const body = await readBody(event);
      const { error, data } = supabase
        .from("recommendations")
        .insert([
          {
            discord: body.discord,
            email: body.email,
            message: body.message,
          },
        ])
        .select()
        .single();
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  } else {
    throw createError({
      statusCode: 403,
      message: "Request Not Allowed",
    });
  }
});
