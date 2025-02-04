// Supabase
import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);
// Shlink
import * as shlink from "@shlinkio/shlink-js-sdk";
import { NodeHttpClient } from "@shlinkio/shlink-js-sdk/node";
const serverInfo = {
  //baseUrl: "https://go.yuanhau.com", // NOT PROD
  baseUrl: "https://yhw.tw", // PROD
  apiKey: process.env.shlink_api,
};
export const shlinkapi = new shlink.ShlinkApiClient(
  new NodeHttpClient(),
  serverInfo,
);
// API
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (body.includes("http://") || body.includes("https://")) {
      return {
        status: "ok",
        short: "/",
      };
    } else {
      const dbfetch = await supabase
        .from("shortlink")
        .select("code")
        .eq("url", `${body}`)
        .single();
      if (!dbfetch.data || dbfetch.data === null) {
        const req = await shlinkapi.createShortUrl({
          longUrl: `https://yuanhau.com${body}`,
        });
        const dbsent = await supabase
          .from("shortlink")
          .insert({ code: req.shortCode, url: body });
        if (dbsent.error) {
          console.log(dbsent.error);
          return {
            status: "not ok",
            short: "",
          };
        } else {
          console.log(dbsent.data);
          return {
            status: "ok",
            short: req.shortCode,
          };
        }
      } else {
        return {
          status: "ok",
          short: dbfetch.data.code,
        };
      }
    }
  } catch (e) {
    console.log(e);
  }
});
