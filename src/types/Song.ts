export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  source: string; // 'Spotify', 'YouTube', etc.
  genre: string;
  externalUrl: string;
}