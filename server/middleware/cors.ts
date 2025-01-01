export default defineEventHandler((event) => {
  const policy = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "same-origin",
    "Access-Control-Allow-Origin": "Same-Origin",
    crossOriginResourcePolicy: "same-origin",
    crossOriginOpenerPolicy: "same-origin",
  };
  setHeaders(event, policy);
});
