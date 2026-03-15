import { useEffect, useState } from 'react';

interface SpotifyData {
  artist: string;
  song: string;
  album_art_url: string;
}

interface DiscordStatus {
  status: 'online' | 'idle' | 'dnd' | 'offline' | null;
  activity: string | null;
  spotify: SpotifyData | null;
  loading: boolean;
  error: string | null;
}

const useDiscordStatus = (userId: string): DiscordStatus => {
  const [status, setStatus] = useState<DiscordStatus>({
    status: null,
    activity: null,
    spotify: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!userId) {
      setStatus((prev) => ({ ...prev, loading: false, error: 'User ID not provided' }));
      return;
    }

    const fetchStatus = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}` );
        if (!response.ok) throw new Error('Failed to fetch Discord status');

        const data = await response.json();
        const { discord_status, activities, spotify } = data.data;

        let activity = null;
        if (activities && activities.length > 0) {
          const nonSpotifyActivity = activities.find((a: any) => a.name !== 'Spotify');
          if (nonSpotifyActivity) {
            activity = nonSpotifyActivity.name;
            if (nonSpotifyActivity.details) activity += ` - ${nonSpotifyActivity.details}`;
          }
        }

        setStatus({
          status: discord_status || 'offline',
          activity,
          spotify: spotify ? {
            artist: spotify.artist,
            song: spotify.song,
            album_art_url: spotify.album_art_url
          } : null,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStatus((prev) => ({ ...prev, loading: false, error: 'Error' }));
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, [userId]);

  return status;
};

export default useDiscordStatus;
