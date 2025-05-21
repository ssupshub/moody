import { Song } from '../types/Song';

// Simulated music recommendation API
export const getMusicRecommendations = async (mood: string): Promise<Song[]> => {
  // In a real app, this would call a backend API that interfaces with Spotify/YouTube
  console.log(`Getting recommendations for mood: ${mood}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return different songs based on mood
  const recommendations = getMockSongsByMood(mood);
  
  // Shuffle the array to get different results on refresh
  return shuffle(recommendations);
};

// Mock data for different moods
const getMockSongsByMood = (mood: string): Song[] => {
  const songs: Record<string, Song[]> = {
    happy: [
      {
        id: 'h1',
        title: 'Happy',
        artist: 'Pharrell Williams',
        albumArt: 'https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Pop',
        externalUrl: 'https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCO'
      },
      {
        id: 'h2',
        title: 'Can\'t Stop the Feeling!',
        artist: 'Justin Timberlake',
        albumArt: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Pop',
        externalUrl: 'https://www.youtube.com/watch?v=ru0K8uYEZWw'
      },
      {
        id: 'h3',
        title: 'Uptown Funk',
        artist: 'Mark Ronson ft. Bruno Mars',
        albumArt: 'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Funk/Pop',
        externalUrl: 'https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS'
      },
      {
        id: 'h4',
        title: 'Good as Hell',
        artist: 'Lizzo',
        albumArt: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Pop/R&B',
        externalUrl: 'https://www.youtube.com/watch?v=SmbmeOgWsqE'
      }
    ],
    sad: [
      {
        id: 's1',
        title: 'Someone Like You',
        artist: 'Adele',
        albumArt: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Pop/Soul',
        externalUrl: 'https://open.spotify.com/track/4kflIGfjdZJW4ot2ioixTB'
      },
      {
        id: 's2',
        title: 'Fix You',
        artist: 'Coldplay',
        albumArt: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Alternative Rock',
        externalUrl: 'https://www.youtube.com/watch?v=k4V3Mo61fJM'
      },
      {
        id: 's3',
        title: 'All I Want',
        artist: 'Kodaline',
        albumArt: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Indie Rock',
        externalUrl: 'https://open.spotify.com/track/2tznHmp70DxMyr2XhWLOW0'
      },
      {
        id: 's4',
        title: 'Skinny Love',
        artist: 'Bon Iver',
        albumArt: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Indie Folk',
        externalUrl: 'https://www.youtube.com/watch?v=ssdgFoHLwnk'
      }
    ],
    angry: [
      {
        id: 'a1',
        title: 'Killing In The Name',
        artist: 'Rage Against The Machine',
        albumArt: 'https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Rock/Metal',
        externalUrl: 'https://open.spotify.com/track/59WN2psjkt1tyaxjspN8fp'
      },
      {
        id: 'a2',
        title: 'Break Stuff',
        artist: 'Limp Bizkit',
        albumArt: 'https://images.pexels.com/photos/33779/hand-microphone-mic-hold.jpg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Nu Metal',
        externalUrl: 'https://www.youtube.com/watch?v=ZpUYjpKg9KY'
      },
      {
        id: 'a3',
        title: 'Bulls On Parade',
        artist: 'Rage Against The Machine',
        albumArt: 'https://images.pexels.com/photos/89909/pexels-photo-89909.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Rock/Metal',
        externalUrl: 'https://open.spotify.com/track/1EcOzxfCsMEooKTAtDNOHF'
      },
      {
        id: 'a4',
        title: 'Du Hast',
        artist: 'Rammstein',
        albumArt: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Industrial Metal',
        externalUrl: 'https://www.youtube.com/watch?v=W3q8Od5qJio'
      }
    ],
    fearful: [
      {
        id: 'f1',
        title: 'Everybody Wants To Rule The World',
        artist: 'Tears For Fears',
        albumArt: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'New Wave',
        externalUrl: 'https://open.spotify.com/track/4RvWPyQ5RL0ao9LPZeSouE'
      },
      {
        id: 'f2',
        title: 'Breathe Me',
        artist: 'Sia',
        albumArt: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Pop/Indie',
        externalUrl: 'https://www.youtube.com/watch?v=ghPcYqn0p4Y'
      },
      {
        id: 'f3',
        title: 'Hurt',
        artist: 'Johnny Cash',
        albumArt: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Country/Rock',
        externalUrl: 'https://open.spotify.com/track/28cnXtME493VX9NOw9cIUh'
      },
      {
        id: 'f4',
        title: 'Mad World',
        artist: 'Gary Jules',
        albumArt: 'https://images.pexels.com/photos/34221/violin-musical-instrument-music-sound.jpg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Alternative',
        externalUrl: 'https://www.youtube.com/watch?v=4N3N1MlvVc4'
      }
    ],
    neutral: [
      {
        id: 'n1',
        title: 'Clocks',
        artist: 'Coldplay',
        albumArt: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Alternative Rock',
        externalUrl: 'https://open.spotify.com/track/0BCPKOYdS2jbQ8iyB56Zns'
      },
      {
        id: 'n2',
        title: 'Reminder',
        artist: 'The Weeknd',
        albumArt: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'R&B/Pop',
        externalUrl: 'https://www.youtube.com/watch?v=JZjAg6fK-BQ'
      },
      {
        id: 'n3',
        title: 'Dreams',
        artist: 'Fleetwood Mac',
        albumArt: 'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Rock',
        externalUrl: 'https://open.spotify.com/track/0ofHAoxe9vBkTCp2UQIavz'
      },
      {
        id: 'n4',
        title: 'Watermelon Sugar',
        artist: 'Harry Styles',
        albumArt: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Pop',
        externalUrl: 'https://www.youtube.com/watch?v=E07s5ZYygMg'
      }
    ],
    surprised: [
      {
        id: 'su1',
        title: 'Wow.',
        artist: 'Post Malone',
        albumArt: 'https://images.pexels.com/photos/33779/hand-microphone-mic-hold.jpg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Hip-Hop',
        externalUrl: 'https://open.spotify.com/track/7xQAfvXzm3AkraOtGPWIZg'
      },
      {
        id: 'su2',
        title: 'Supermassive Black Hole',
        artist: 'Muse',
        albumArt: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Alternative Rock',
        externalUrl: 'https://www.youtube.com/watch?v=OgvLej8ln2w'
      },
      {
        id: 'su3',
        title: 'What Do You Mean?',
        artist: 'Justin Bieber',
        albumArt: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'Spotify',
        genre: 'Pop',
        externalUrl: 'https://open.spotify.com/track/3dEjWRteBznPmdSLUaUXFi'
      },
      {
        id: 'su4',
        title: 'Poker Face',
        artist: 'Lady Gaga',
        albumArt: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
        source: 'YouTube',
        genre: 'Pop',
        externalUrl: 'https://www.youtube.com/watch?v=bESGLojNYSo'
      }
    ]
  };
  
  // Default to neutral if mood not found
  return songs[mood.toLowerCase()] || songs.neutral;
};

// Fisher-Yates shuffle algorithm for randomizing song order
const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};