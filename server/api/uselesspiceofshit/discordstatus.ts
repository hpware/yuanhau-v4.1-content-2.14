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
  
  let DiscordStatus = "";
  let statusColor = "";
  let statusIcon = "";
  let text = "";
  
  const fetchDiscordStatus = async () => {
    try {
      const response = await fetch("https://api.lanyard.rest/v1/users/918723093646684180");
      const data = await response.json();
      
      if (!data?.activities?.[0]) {
        return;
      }
  
      const ActivityStatus0: ActivityStatus = data.activities[0];
  
      switch (ActivityStatus0.type) {
        case 0: // Playing/Coding
          if (ActivityStatus0.name === "Visual Studio Code") {
            const FileNameStatus = "Working on";
            const ProjectName = ActivityStatus0.details;
            text = `${FileNameStatus} ${ProjectName}`;
            statusIcon = "bi-code-slash .fontsize1";
          } else {
            text = `Playing ${ActivityStatus0.name}`;
            statusIcon = "bi-controller .fontsize1";
          }
          break;
  
        case 2: // Spotify
          const artist = ActivityStatus0.state?.replace(/;/g, ", ") || "";
          text = `${ActivityStatus0.details} - ${artist}`;
          statusIcon = "bi-music-note fontsize1";
          break;
  
        case 3: // Watching
          text = `Watching: ${ActivityStatus0.name} - ${ActivityStatus0.details}`;
          statusIcon = "bi-music-note fontsize1";
          break;
  
        case 4: // Custom Status
          text = `Status: ${ActivityStatus0.state}`;
          break;
      }
    } catch (error) {
      console.error("Error fetching Discord status:", error);
      text = "Unable to fetch Discord status";
      statusIcon = "bi-exclamation-triangle";
    }
  };
  
  export default defineEventHandler(async (event): Promise<DiscordResponse> => {
    await fetchDiscordStatus();
    return {
      DiscordStatus,
      statusColor,
      statusIcon,
      text
    };
  });