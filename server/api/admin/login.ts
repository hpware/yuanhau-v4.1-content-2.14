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
      const pwdhash = scrypt.scrypt(incomingpwd, incomingsalt, 1024, 8, 1, 32);
      console.log(pwdhash);
      const { data } = await supabase
        .from("admin_users")
        .select("pwdhash")
        .eq("username", `${params.username}`);
      console.log(data);
      // Use length for [] aka [ {pwdhash = opsfodsfos} ], Use data === null when there is only a value
      if (!data || data.length === 0) {
        return {
          status: "user error",
          user: null,
          token: null,
        };
      }
    } catch (e) {
      console.error(e);
      return {
        status: "server error",
        user: null,
        token: null,
      };
    }
  }
  const uuid = uuidv4();
  //const { pushtokendata } = await supabase 
  return {
    status: "success",
    user: params.username,
    token: uuid,
  };
});
