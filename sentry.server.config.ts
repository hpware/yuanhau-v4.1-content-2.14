import * as Sentry from "@sentry/nuxt";

Sentry.init({
  dsn: "https://45c3eaec73ccb05778589e7dad477e2f@o4507948895174656.ingest.us.sentry.io/4508385679769600",
  // Tracing
  // We recommend adjusting this value in production, or using a tracesSampler for finer control.
  tracesSampleRate: 1.0, // Capture 100% of the transactions
});
