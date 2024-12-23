async function spotifyCurrentPlaying() {
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + process.env.SPOTIFY_TOKEN,
        },
      },
    );
    const check_no_response = await res.text();
    if (check_no_response.includes("EMPTY_RESPONSE")) {
    }
  } catch (e) {
    console.log(e);
  }
}
export default defineEventHandler(async (event) => {
  throw createError({
    statusCode: 403,
    message: "此功能未完成",
  });
});
