import * as Sentry from "@sentry/nuxt";

Sentry.init({
  dsn: "https://1b3d78190dbfa936f29f5a1f165b44fc@o4507948895174656.ingest.us.sentry.io/4508827691057152",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
