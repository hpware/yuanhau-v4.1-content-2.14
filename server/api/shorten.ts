import { ShlinkApiClient } from "@shlinkio/shlink-js-sdk";
import { FetchHttpClient } from "@shlinkio/shlink-js-sdk/browser";
const domain = "https://yhw.tw/";
const api_key = process.env.SHLINK_API_KEY || "";
const serverInfo = { baseUrl: domain, apiKey: api_key };
//const client = new ShlinkApiClient(new FetchHttpClient(), serverInfo);
export default defineEventHandler(async (event) => {
  //TODO implement shorten using shlink-js-sdk
  const query = getQuery(event);
  console.log(query);
});
