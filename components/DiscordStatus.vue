<script setup lang="ts">
// Setup
import { onMounted, ref } from "vue";

// Set Vars for this thingy
const DiscordStatus = ref("");
const statusColor = ref("");
const statusIcon = ref("");
const text = ref("");
const error = ref("");
const errorb = ref(false);

// Function
onMounted(async () => {
  try {
    const response = await fetch(
      "https://api.lanyard.rest/v1/users/918723093646684180",
    );
    const data = await response.json();
    DiscordStatus.value = data.data.discord_status;
    // Status set & color
    if (DiscordStatus.value === "online") {
      statusColor.value = "color:#23a459;";
      statusIcon.value = "bi-circle-fill";
      text.value = "Online";
    } else if (DiscordStatus.value === "idle") {
      statusColor.value = "color:#eeb132;";
      statusIcon.value = "bi-moon-fill";
      text.value = "Idle";
    } else if (DiscordStatus.value === "dnd") {
      statusColor.value = "color:#f03f42";
      statusIcon.value = "bi-circle-fill";
      text.value = "Do not Disturb";
    } else {
      statusColor.value = "color:grey";
      statusIcon.value = "bi-circle-fill";
      text.value = "Offline";
    }
    // Check if on mobile or on desktop?
    const IsOnMobile = data.data.active_on_discord_mobile;
    const IsOnWeb = data.data.active_on_discord_web;
    const IsOnDesktop = data.data.active_on_discord_desktop;
    if (IsOnDesktop === true || IsOnWeb === true) {
    } else if (IsOnMobile === true) {
      statusIcon.value = "bi-circle-fill";
    }
    // Activity Listening to Spotify, Playing Games or Coding
    const ActivityStatus0 = data.data.activities[0];
    if (ActivityStatus0) {
      if (ActivityStatus0.type === 0) {
        if (
          ActivityStatus0.name === "WebStorm" ||
          ActivityStatus0.name === "Visual Studio Code" ||
          ActivityStatus0.name === "PyCharm" ||
          ActivityStatus0.name === "Code" ||
          ActivityStatus0.name === "IntelliJ IDEA" ||
          ActivityStatus0.name === "Zed"
        ) {
          const FileNameStatus = ref(ActivityStatus0.state);
          const ProjectName = ref(ActivityStatus0.details);
          text.value = `${FileNameStatus.value} ${ProjectName.value}`;
          statusIcon.value = "bi-code-slash .fontsize1";
        } else {
          const ActivityName = ref(ActivityStatus0.name);
          text.value = `Playing ${ActivityName.value}`;
          statusIcon.value = "bi-controller .fontsize1";
        }
      } else if (ActivityStatus0.type === 2) {
        const SpotifyCurrentlyPlayingSong = ref(ActivityStatus0.details);
        const SpotifyCurrentlyPlayingArtist = ref(ActivityStatus0.state);
        const SpotifyCurrentlyPlayingArtistComma = ref(
          SpotifyCurrentlyPlayingArtist.value.replace(/;/g, ", "),
        );
        const SpotifyCurrentlyPlaying = ref(
          `${SpotifyCurrentlyPlayingSong.value} - ${SpotifyCurrentlyPlayingArtistComma.value}`,
        );
        text.value = SpotifyCurrentlyPlaying.value;

        statusIcon.value = "bi-spotify fontsize1";
      } else if (ActivityStatus0.type === 3) {
        const Watching = ref(ActivityStatus0.name);
        const Details = ref(ActivityStatus0.details);
        text.value = `Watching: ${Watching.value} - ${Details.value}`;
        text.value = SpotifyCurrentlyPlaying.value;
        statusIcon.value = "bi-spotify fontsize1";
      } else if (ActivityStatus0.type === 4) {
        const ActivityName = ref(ActivityStatus0.state);
        text.value = `Status: ${ActivityName.value}`;
      }
    }
  } catch (error) {
    errorb.value = true;
  }
});
</script>

<template>
  <span class="onlinepr" v-if="errorb === true"
    ><i class="bi bi-circle-fill" style="color: grey"></i>&nbsp;
    <span>Error fetching Status.</span>
  </span>
  <span class="onlinepr" v-else
    ><i class="bi" :class="statusIcon" :style="statusColor"></i>&nbsp;
    <span>{{ text }}</span>
  </span>
</template>

<style scoped>
.onlinepr {
  font-size: 0.6em;
  margin-top: 0em;
}
.fontsize1 {
  font-size: 1.123em;
}
@media (max-width: 700px) {
  .onlinepr {
    font-size: 0.5em;
  }
}
</style>
