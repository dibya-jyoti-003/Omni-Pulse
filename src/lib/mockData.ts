export type ContentType = 'video' | 'music' | 'podcast' | 'movie' | 'news';

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  author: string;
  thumbnail: string;
  description: string;
  tags: string[];
  duration?: string;
  year?: string;
  platform?: string;
  topics: string[];
  popularityScore?: number;
  releasedAt?: number;
  url?: string;
}

export const MOCK_DATA: ContentItem[] = [
  // MOVIES
  {
    id: 'm1',
    type: 'movie',
    title: 'Inception',
    author: 'Christopher Nolan',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    tags: ['Sci-Fi', 'Action', 'Psychological'],
    year: '2010',
    topics: ['Dreams', 'Consciousness', 'Espionage', 'Heist'],
    popularityScore: 0.92,
    releasedAt: 1277942400000,
    url: 'https://www.warnerbros.com/movies/inception'
  },
  {
    id: 'm2',
    type: 'movie',
    title: 'The Social Network',
    author: 'David Fincher',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400',
    description: 'As Harvard student Mark Zuckerberg creates the social networking site that would become Facebook.',
    tags: ['Biography', 'Drama'],
    year: '2010',
    topics: ['Startups', 'Technology', 'Social Media', 'Legal'],
    popularityScore: 0.78,
    releasedAt: 1287014400000,
    url: 'https://www.sonypictures.com/movies/thesocialnetwork'
  },
  {
    id: 'm3',
    type: 'movie',
    title: 'Interstellar',
    author: 'Christopher Nolan',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure human survival.',
    tags: ['Sci-Fi', 'Adventure'],
    year: '2014',
    topics: ['Space', 'Physics', 'Future', 'Environment'],
    popularityScore: 0.95,
    releasedAt: 1415232000000,
    url: 'https://www.warnerbros.com/movies/interstellar'
  },
  {
    id: 'm4',
    type: 'movie',
    title: 'The Big Short',
    author: 'Adam McKay',
    thumbnail: 'https://images.unsplash.com/photo-1611974717482-48a07106096a?auto=format&fit=crop&q=80&w=400',
    description: 'In 2006-2007 a group of investors bet against the US mortgage market.',
    tags: ['Drama', 'Comedy'],
    year: '2015',
    topics: ['Economy', 'Finance', 'Business', 'Legal'],
    popularityScore: 0.82,
    releasedAt: 1449792000000,
    url: 'https://www.paramount.com/movies/the-big-short'
  },

  // VIDEOS
  {
    id: 'v1',
    type: 'video',
    title: 'The Future of AI Architecture',
    author: 'TechExplained',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400',
    description: 'Exploring how transformer models are evolving in 2024.',
    tags: ['Tech', 'AI', 'Education'],
    duration: '15:20',
    topics: ['AI', 'Architecture', 'Neural Networks', 'Future'],
    popularityScore: 0.86,
    releasedAt: 1704067200000,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'v2',
    type: 'video',
    title: 'Cooking the Perfect Risotto',
    author: 'Chef Skills',
    thumbnail: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=400',
    description: 'Master the art of Italian Arborio rice.',
    tags: ['Cooking', 'Food', 'Lifestyle'],
    duration: '10:45',
    topics: ['Cooking', 'Italian', 'Risotto', 'Culinary'],
    popularityScore: 0.6,
    releasedAt: 1701475200000,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'v3',
    type: 'video',
    title: 'Quantum Physics for Beginners',
    author: 'Science Daily',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
    description: 'Understanding the fundamentals of the subatomic world.',
    tags: ['Science', 'Education'],
    duration: '22:10',
    topics: ['Quantum', 'Physics', 'Science', 'Computing'],
    popularityScore: 0.75,
    releasedAt: 1705017600000,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: 'v4',
    type: 'video',
    title: 'Stock Market 101',
    author: 'Finance Insights',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400',
    description: 'How to start investing in 2024.',
    tags: ['Finance', 'Business'],
    duration: '12:30',
    topics: ['Finance', 'Economy', 'Business', 'Investment'],
    popularityScore: 0.72,
    releasedAt: 1708300800000,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },

  // PODCASTS
  {
    id: 'p1',
    type: 'podcast',
    title: 'Mind & Machines',
    author: 'Dr. Sarah Chen',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2fccd27ee8f0?auto=format&fit=crop&q=80&w=400',
    description: 'Interviews with leading AI researchers about the ethics of artificial minds.',
    tags: ['Silicon Valley', 'Philosophy'],
    duration: '45 mins',
    topics: ['AI', 'Ethics', 'Consciousness', 'Philosophy'],
    popularityScore: 0.74,
    releasedAt: 1706745600000,
    url: 'https://spotify.com'
  },
  {
    id: 'p2',
    type: 'podcast',
    title: 'Startup Stories',
    author: 'Silicon INSIDER',
    thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=400',
    description: 'Deep dives into the early days of world-changing companies.',
    tags: ['Business', 'Tech'],
    duration: '32 mins',
    topics: ['Startups', 'Business', 'Innovation', 'History'],
    popularityScore: 0.69,
    releasedAt: 1706140800000,
    url: 'https://spotify.com'
  },
  {
    id: 'p3',
    type: 'podcast',
    title: 'The Green Planet',
    author: 'Eco Voice',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400',
    description: 'Discussing the future of renewable energy and conservation.',
    tags: ['Environment', 'Science'],
    duration: '28 mins',
    topics: ['Environment', 'Sustainability', 'Energy', 'Future'],
    popularityScore: 0.65,
    releasedAt: 1709164800000,
    url: 'https://spotify.com'
  },

  // MUSIC
  {
    id: 'mu1',
    type: 'music',
    title: 'Midnight City',
    author: 'M83',
    thumbnail: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400',
    description: 'Synth-pop masterpiece capturing the neon nights of a futuristic metropolis.',
    tags: ['Synthwave', 'Electronic'],
    duration: '4:03',
    topics: ['Retrofuturism', 'Energy', 'City Lights', 'Nostalgia'],
    popularityScore: 0.88,
    releasedAt: 1317340800000,
    url: 'https://music.apple.com'
  },
  {
    id: 'mu2',
    type: 'music',
    title: 'Claire de Lune',
    author: 'Claude Debussy',
    thumbnail: 'https://images.unsplash.com/photo-1520529682723-e45136973c2b?auto=format&fit=crop&q=80&w=400',
    description: 'A peaceful, impressionist classic for piano.',
    tags: ['Classical', 'Piano'],
    duration: '5:12',
    topics: ['Peaceful', 'Moonlight', 'Dreams', 'Ethereal'],
    popularityScore: 0.81,
    releasedAt: -2208988800000,
    url: 'https://music.apple.com'
  },
  {
    id: 'mu3',
    type: 'music',
    title: 'Cyberpunk Beats',
    author: 'Neon Pulse',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400',
    description: 'Heavy bass and electronic synth for late night coding.',
    tags: ['Electronic', 'Cyberpunk'],
    duration: '6:45',
    topics: ['Technology', 'Futuristic', 'Energy', 'Computing'],
    popularityScore: 0.76,
    releasedAt: 1707696000000,
    url: 'https://music.apple.com'
  },

  // NEWS
  {
    id: 'n1',
    type: 'news',
    title: 'New Breakthrough in Quantum Computing',
    author: 'Daily Science',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
    description: 'Researchers achieve stable 512-qubit system at room temperature.',
    tags: ['Science', 'Tech'],
    platform: 'The Verge',
    topics: ['Quantum', 'Physics', 'Technology', 'Computing'],
    popularityScore: 0.66,
    releasedAt: 1710288000000,
    url: 'https://www.theverge.com'
  },
  {
    id: 'n2',
    type: 'news',
    title: 'Global Economic Shift Towards Green Energy',
    author: 'Finance World',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400',
    description: 'Why the next decade belongs to renewable resources.',
    tags: ['Economics', 'Environment'],
    platform: 'Bloomberg',
    topics: ['Energy', 'Sustainability', 'Economy', 'Policy'],
    popularityScore: 0.63,
    releasedAt: 1710460800000,
    url: 'https://www.bloomberg.com'
  },
  {
    id: 'n3',
    type: 'news',
    title: 'The Rise of Generative AI in Creative Industries',
    author: 'Tech Today',
    thumbnail: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=400',
    description: 'How AI is reshaping film, music, and art.',
    tags: ['AI', 'Tech', 'Culture'],
    platform: 'Wired',
    topics: ['AI', 'Innovation', 'Innovation', 'Future'],
    popularityScore: 0.85,
    releasedAt: 1710892800000,
    url: 'https://www.wired.com'
  }
];
