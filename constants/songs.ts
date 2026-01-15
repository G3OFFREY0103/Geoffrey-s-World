
export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export const SONGS: Song[] = [
  {
    id: '1',
    title: 'Solitude',
    artist: 'Atmospheric',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Midnight Shanghai',
    artist: 'Geoffrey Choice',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'Dream Reflections',
    artist: 'Minimalist',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: '4',
    title: 'Urban Silence',
    artist: 'Noir',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  }
];
