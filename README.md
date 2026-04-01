# OmniPulse

A unified, cross-domain recommendation platform that aggregates and suggests personalized content across multiple formats — videos, music, podcasts, movies, and news — in a single, intelligent interface.

## 🚀 Features

- **Cross-Domain Recommendations**: Seamlessly discover content across 5 different media types
- **Personalized Feed**: Learns from your explicit interests and implicit behavior
- **Real-Time Adaptation**: Recommendations evolve instantly based on likes, clicks, and skips
- **Topic-Based Matching**: Advanced algorithm connects content through shared themes and interests
- **Modern UI**: Beautiful, responsive interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Next.js API Routes (Serverless Functions)
- **State Management**: React Hooks + Global Memory Store
- **Algorithms**: Custom Topic-based Filtering & Weighted Hybrid Recommender

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd hackathon
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How It Works

### Onboarding
- Select your interests to seed your personalized profile
- Your preferences are saved locally and synced with the server

### Recommendation Algorithm
The system uses a hybrid approach combining:
- **Explicit Signals**: Topics you explicitly select during onboarding
- **Implicit Signals**: Your interaction patterns (likes, clicks, skips, dwell time)
- **Topic Matching**: Content is recommended based on shared themes across domains
- **Weighted Scoring**: 85% similarity, 10% popularity, 5% recency

### Cross-Domain Bridge
Because you liked a movie about startups, you might discover:
- A podcast about entrepreneurship
- News about tech companies
- Videos about business strategies

## 🧠 Algorithm Details

### User Profile
```typescript
interface UserProfile {
  userId: string;
  explicitInterests: string[];        // Topics selected during onboarding
  implicitTopics: Record<string, number>; // Weights from interactions
  history: Interaction[];             // Recent user actions
  createdAt: number;
  updatedAt: number;
}
```

<<<<<<< HEAD
### Scoring Formula
```
total = 0.85 × similarity + 0.10 × popularity + 0.05 × recency
```

- **Similarity**: Average weight of matched topics between user profile and content
- **Popularity**: Content's global popularity score
- **Recency**: Time-based decay (newer content gets slight boost)
=======
>>>>>>> 46b3acdb844166af990f1628cf2ec66ebd12f1ab

### Interaction Weights
- **Like**: +5 points to content topics
- **Click**: +2 points
- **Skip**: -8 points
- **Dwell Time**: Additional boost up to +3 points

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # API routes (server-side)
│   ├── onboarding/       # User preference setup
│   ├── page.tsx         # Main dashboard
│   └── layout.tsx       # Root layout
├── components/
│   ├── RecommendationCard.tsx
│   ├── Sidebar.tsx
│   └── TopNav.tsx
└── lib/
    ├── clientApi.ts     # API client functions
    ├── clientUser.ts    # User management (client-side)
    ├── mockData.ts      # Sample content data
    ├── models.ts        # TypeScript interfaces
    ├── recommender.ts   # Recommendation algorithm
    └── serverStore.ts   # User state (server-side)
```

## 🎨 UI Components

- **RecommendationCard**: Interactive content cards with hover effects
- **Cross-Domain Suggestions**: Special section showing related content across formats
- **Trending Sidebar**: Popular content across all domains
- **User Profile**: View and edit your preferences

## 🔄 Real-Time Updates

The system updates recommendations instantly when you:
- **Like** an item: Strong positive signal for its topics
- **Click** an item: Moderate positive signal
- **Skip** an item: Strong negative signal
- **Hover** on an item: Tracks dwell time for engagement measurement

## 🌐 Content Domains

Each content item includes:
- **Metadata**: Title, author, description, tags
- **Topics**: Semantic tags for matching
- **Popularity**: Global engagement score
- **URL**: Direct link to actual content
- **Type**: video, music, podcast, movie, or news

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
```

Deploy to Vercel for automatic CI/CD and global CDN.

### Other Platforms
The app can be deployed to any platform supporting Node.js and static file serving.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔮 Future Enhancements

- [ ] Real collaborative filtering
- [ ] Content-based similarity analysis
- [ ] User-to-user recommendations
- [ ] Advanced analytics dashboard
- [ ] Mobile app version
- [ ] Social sharing features

## 📞 Support

For questions, suggestions, or issues:
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ for the Design Lab Hackathon**
