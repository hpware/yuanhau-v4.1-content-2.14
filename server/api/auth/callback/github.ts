import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  // Query Login Code
  const logincode = getQuery(event).code;
  if (!logincode) {
    const msg = `
        <html>
            <head>
                <title>Error</title>
            </head>
            <body>
            <h1>Error</h1>
            <p>Error: Failed to obtain access token</p>
            </body>
            </html>`;
    event.node.res.setHeader("Content-Type", "text/html");
    event.node.res.statusCode = 403;
    event.node.res.end(msg);
    setTimeout(() => {
      return sendRedirect(event, "/user/login");
    }, 3000);
  }
  // Github Client ID & Secret
  const client_id = process.env.GITHUB_OAUTH_CLIENT;
  const client_secret = process.env.GITHUB_OAUTH_SECRET;
  const redirect_uri = "https://yuanhau-v4.vercel.app/api/auth/callback/github";
  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: `client_id=${client_id}&client_secret=${client_secret}&code=${logincode}&redirect_uri=${redirect_uri}`,
    });
    const data = await res.json();
    if (!data.access_token) {
      throw new Error("Failed to obtain access token");
    }
    // Store the access token in a session or cookie
    // For example, using a cookie:
    setCookie(event, "token", data.access_token, {
      path: "/",
      httpOnly: true,
    });
    return sendRedirect(event, "/user/panel/");
  } catch (e) {
    const msg = `
            <html>
                <head>
                    <title>Error</title>
                </head>
                <body>
                <h1>Error</h1>
                <p>${e}</p>
                </body>
                </html>`;
    event.node.res.setHeader("Content-Type", "text/html");
    event.node.res.statusCode = 500;
    event.node.res.end(msg);
    setTimeout(() => {
      return sendRedirect(event, "/user/login");
    }, 12000);
  }
});
