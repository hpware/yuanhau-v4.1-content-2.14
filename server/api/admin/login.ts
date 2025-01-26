import scrypt from "scrypt-js";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const salt = process.env.ADMINLOGIN_SALT;
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

interface params {
  username: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const params = await readBody<params>(event);
  if (!params?.username || !params?.password) {
    return {
      status: "error",
      user: null,
      token: null,
    };
  } else {
    try {
      const incomingpwd = new TextEncoder().encode(params.password);
      const incomingsalt = new TextEncoder().encode(salt);
      // Need await so the whatever buffer thing would work.
      const pwdhash = await scrypt.scrypt(
        incomingpwd,
        incomingsalt,
        1024,
        8,
        1,
        32,
      );
      const { data } = await supabase
        .from("admin_users")
        .select("pwdhash")
        .eq("username", `${params.username}`);
      // Use length for [] aka [ {pwdhash = opsfodsfos} ], Use data === null when there is only a value
      if (!data || data.length === 0) {
        return {
          status: "User account not found.",
          user: null,
          token: null,
        };
      }
      const dbhash = data[0].pwdhash;
      // Uses Buffer.from(pwdhash).toString('hex'), because js have no clue what is a Uint8Array, so buffer transfers the uint8array to a butter then to hex
      const scrypthash = Buffer.from(pwdhash).toString("hex");
      if (dbhash !== scrypthash) {
        return {
          status: "Wrong Password",
          user: null,
          token: null,
        };
      }
    } catch (e) {
      console.error(e);
      return {
        status: "Server error",
        user: null,
        token: null,
      };
    }
  }
  const uuid = uuidv4();
  const { data, error } = await supabase
    .from("admin_login_tokens")
    .insert([{ username: params.username, btoken: uuid }]);
  return {
    status: "success",
    user: params.username,
    token: uuid,
    supabase: data,
  };
});
