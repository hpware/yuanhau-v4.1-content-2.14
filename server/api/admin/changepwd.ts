import scrypt from "scrypt-js";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
const supabasetoken = process.env.SUPABASE_KEY;
const salt = process.env.ADMINLOGIN_SALT;
let token_user = "";
let newscrypthashg = "";
const supabase = createClient(
  "https://rlretgpxqtgzsjuhqjwu.supabase.co",
  `${supabasetoken}`,
);

interface params {
  username: string;
  oldpassword: string;
  newpassword: string;
  token: string;
}

export default defineEventHandler(async (event) => {
  const params = await readBody<params>(event);
  if (
    !params?.username ||
    !params?.oldpassword ||
    !params.newpassword ||
    !params.token
  ) {
    return {
      status: "error",
    };
  } else {
    try {
      const { data, error } = await supabase
        // Please use the right name its admin_login_tokens NOT admin_user_tokens, you idiot.
        .from("admin_login_tokens")
        .select("username")
        .eq("btoken", `${params.token}`);
      token_user = data[0].username;
      //console.log(data);
      if (error) {
        return {
          status: "server error",
        };
      } else if (!data[0].username || data[0].username === null) {
        return {
          status: "User account not found",
        };
        // Ai aka deepseek r1 recommands to check if the user in the params and the data are the same
      } else if (data[0].username !== params.username) {
        return {
          status: "User account not found",
        };
      } else {
        const incomingsalt = new TextEncoder().encode(salt);
        // Need await so the whatever buffer thing would work.
        const incomingoldpwd = new TextEncoder().encode(params.oldpassword);
        const oldpwdhash = await scrypt.scrypt(
          incomingoldpwd,
          incomingsalt,
          1024,
          8,
          1,
          32,
        );
        const oldscrypthash = Buffer.from(oldpwdhash).toString("hex");
        const incomingnewpwd = new TextEncoder().encode(params.newpassword);
        const newpwdhash = await scrypt.scrypt(
          incomingnewpwd,
          incomingsalt,
          1024,
          8,
          1,
          32,
        );
        const newscrypthash = Buffer.from(newpwdhash).toString("hex");
        newscrypthashg = newscrypthash;
        const { data } = await supabase
          .from("admin_users")
          .select("pwdhash")
          .eq("username", `${token_user}`);
        // Use length for [] aka [ {pwdhash = opsfodsfos} ], Use data === null when there is only a value
        if (!data || data.length === 0) {
          return {
            status: "User account not found.",
          };
        }
        const dbhash = data[0].pwdhash;
        // Uses Buffer.from(pwdhash).toString('hex'), because js have no clue what is a Uint8Array, so buffer transfers the uint8array to a butter then to hex
        if (dbhash !== oldscrypthash) {
          return {
            status: "Incorrect Password",
          };
        }
      }
    } catch (e) {
      console.error(e);
      return {
        status: "Server error",
      };
    }
  }
  const { data, error } = await supabase
    .from("admin_users")
    // STOP MAKING BASIC MISTAKES, ITS PWDHASH NOT BTOKEN!!!
    .update({ pwdhash: `${newscrypthashg}` })
    .eq("username", `${params.username}`);
  if (error) {
    return {
      status: "Server Error",
    };
  }
  return {
    status: "success",
    supabase: data,
  };
  //return {
  //    status: null
  //  }
});
