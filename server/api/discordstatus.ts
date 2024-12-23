interface ActivityStatus {
  type: number;
  name?: string;
  details?: string;
  state?: string;
}

interface DiscordResponse {
  DiscordStatus: string;
  statusColor: string;
  statusIcon: string;
  text: string;
}

// Set Vars for this thingy
let DiscordStatus = "";
let statusColor = "";
let statusIcon = "";
let text = "";

// Function
const fetchDiscordStatus = async () => {
  try {
    const response = await fetch(
      "https://api.lanyard.rest/v1/users/918723093646684180",
    );
    const data = await response.json();
    DiscordStatus = data.data.discord_status;
    // Status set & color
    if (DiscordStatus === "online") {
      statusColor = "color:#23a459;";
      statusIcon = "bi-circle-fill";
      text = "Online";
    } else if (DiscordStatus === "idle") {
      statusColor = "color:#eeb132;";
      statusIcon = "bi-moon-fill";
      text = "Idle";
    } else if (DiscordStatus === "dnd") {
      statusColor = "color:#f03f42";
      statusIcon = "bi-circle-fill";
      text = "Do not Disturb";
    } else {
      statusColor = "color:grey";
      statusIcon = "bi-circle-fill";
      text = "Offline";
    }
    // Check if on mobile or on desktop?
    const IsOnMobile = data.data.active_on_discord_mobile;
    const IsOnWeb = data.data.active_on_discord_web;
    const IsOnDesktop = data.data.active_on_discord_desktop;
    if (IsOnDesktop === true || IsOnWeb === true) {
    } else if (IsOnMobile === true) {
      statusIcon = "bi-circle-fill";
    }
    // Activity Listening to Spotify, Playing Games or Coding
    const ActivityStatus0 = data.data.activities[0];
    if (ActivityStatus0) {
      if (ActivityStatus0.type === 0) {
        if (
          ActivityStatus0.name === "WebStorm" ||
          ActivityStatus0.name === "Visual Studio Code" ||
          ActivityStatus0.name === "PyCharm" ||
          ActivityStatus0.name === "Code"
        ) {
          const FileNameStatus = ActivityStatus0.state;
          const ProjectName = ActivityStatus0.details;
          text = `${FileNameStatus} ${ProjectName}`;
          statusIcon = "bi-code-slash .fontsize1";
        } else {
          const ActivityName = ActivityStatus0.name;
          text = `Playing ${ActivityName}`;
          statusIcon = "bi-controller .fontsize1";
        }
      } else if (ActivityStatus0.type === 2) {
        let SpotifyCurrentlyPlayingSong = ActivityStatus0.details;
        let SpotifyCurrentlyPlayingArtist = ActivityStatus0.state;
        let SpotifyCurrentlyPlayingArtistComma =
          SpotifyCurrentlyPlayingArtist.replace(/;/g, ", ");
        let SpotifyCurrentlyPlaying = `${SpotifyCurrentlyPlayingSong} - ${SpotifyCurrentlyPlayingArtistComma}`;
        let text = SpotifyCurrentlyPlaying;
        statusIcon = "bi-music-note fontsize1";
      } else if (ActivityStatus0.type === 3) {
        let Watching = ActivityStatus0.name;
        let Details = ActivityStatus0.details;
        text = `Watching: ${Watching} - ${Details}`;
        // text = SpotifyCurrentlyPlaying;
        // 👆👆👆 I have no idea what is this doing here, but old code still works tho.
        statusIcon = "bi-music-note fontsize1";
      } else if (ActivityStatus0.type === 4) {
        const ActivityName = ActivityStatus0.state;
        text = `Status: ${ActivityName}`;
      }
    }
  } catch (error) {}
};

export default defineEventHandler((event) => {
  fetchDiscordStatus();
  return {
    DiscordStatus: DiscordStatus,
    statusColor: statusColor,
    statusIcon: statusIcon,
    text: text,
  };
});
