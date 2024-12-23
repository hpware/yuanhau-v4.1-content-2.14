export default defineEventHandler((event) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT;
  const redirectUri = "https://yuanhau-v4.vercel.app/api/auth/callback/github";
  const scope = "user:email";
  const URL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  // Redirect to Github
  return sendRedirect(event, URL);
});
