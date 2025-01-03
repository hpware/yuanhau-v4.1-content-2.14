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
        const { reqevent } = supabase.from('recommendations').insert({
                discord: body.discord,
                email: body.email,
                message: body.message,
        });
        if (reqevent) {
            throw reqevent;
        }
        return {
            statusCode: 200,
            message: "Recommendation added successfully",
          };
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
