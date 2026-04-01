'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, LayoutGrid } from 'lucide-react';
import {
  getBridgedRecommendation,
  getTrendingAcrossDomains,
  RecommendedItem
} from '../lib/recommender';
import { MOCK_DATA, ContentType } from '../lib/mockData';
import RecommendationCard from '@/components/RecommendationCard';
import { fetchRecommendations, saveOnboarding } from '@/lib/clientApi';
import { getOrCreateUserId, getStoredExplicitInterests, setStoredExplicitInterests } from '@/lib/clientUser';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [selectedType, setSelectedType] = useState<'all' | ContentType>('all');
  const [forYouItems, setForYouItems] = useState<RecommendedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const trendingItems = useMemo(() =>
    getTrendingAcrossDomains(),
    []);

  // Cross-domain bridge example: "Because you liked The Social Network (Movie), you might like Mind & Machines (Podcast)"
  const sourceMovie = MOCK_DATA.find(i => i.id === 'm2'); // The Social Network
  const bridgedPodcast = sourceMovie ? getBridgedRecommendation(sourceMovie, 'podcast') : null;
  const bridgedNews = sourceMovie ? getBridgedRecommendation(sourceMovie, 'news') : null;

  const movies = useMemo(() => forYouItems.filter((i) => i.type === 'movie').slice(0, 4), [forYouItems]);
  const podcasts = useMemo(() => forYouItems.filter((i) => i.type === 'podcast').slice(0, 4), [forYouItems]);
  const news = useMemo(() => forYouItems.filter((i) => i.type === 'news').slice(0, 4), [forYouItems]);
  const videos = useMemo(() => forYouItems.filter((i) => i.type === 'video').slice(0, 6), [forYouItems]);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        setLoading(true);
        const userId = getOrCreateUserId();
        const cachedInterests = getStoredExplicitInterests();

        let user: any;
        let items: RecommendedItem[];

        // If we have cached interests, sync them first
        if (cachedInterests.length > 0) {
          await saveOnboarding(userId, cachedInterests);
        }

        const data = await fetchRecommendations(userId, selectedType, 8);
        user = data.user;
        items = data.items;

        if (!mounted) return;

        // Final check: if both server and cache are empty, then redirect
        if ((user.explicitInterests ?? []).length === 0 && cachedInterests.length === 0) {
          router.push('/onboarding');
          return;
        }

        // Always trust server's interests if they exist
        if (user.explicitInterests && user.explicitInterests.length > 0) {
          setStoredExplicitInterests(user.explicitInterests);
        }

        setForYouItems(items);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [router, selectedType]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Your Unified Feed <span className="text-slate-500 font-semibold">(Personalized Recommendations)</span>
        </h1>
        <div className="flex items-center gap-2">
          {(['all', 'movie', 'music', 'podcast', 'news', 'video'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold border transition-all ${selectedType === type
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
            >
              {type === 'movie' ? 'Movies & TV' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
          <button
            onClick={() => router.push('/onboarding')}
            className="ml-1 px-3 py-2 rounded-xl text-xs font-extrabold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
          >
            User Profile & Preferences
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-9 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="rounded-2xl border border-slate-200 bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">Top Movie & TV Picks For You</h2>
              <span className="text-[10px] font-extrabold px-2 py-1 rounded-lg bg-blue-600 text-white">Movie</span>
            </div>
            <div className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {!loading && movies.map((item) => (
                  <RecommendationCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-gradient-to-b from-violet-50 to-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">Podcast Episodes You'll Love</h2>
              <span className="text-[10px] font-extrabold px-2 py-1 rounded-lg bg-violet-600 text-white">Podcast</span>
            </div>
            <div className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {!loading && podcasts.map((item) => (
                  <RecommendationCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-gradient-to-b from-emerald-50 to-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">Top News Headlines (Curated For You)</h2>
              <span className="text-[10px] font-extrabold px-2 py-1 rounded-lg bg-emerald-600 text-white">News</span>
            </div>
            <div className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {!loading && news.map((item) => (
                  <RecommendationCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-slate-700" />
                <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700">Recommended Videos</h2>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-1 rounded-lg bg-slate-900 text-white">Video</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {!loading && videos.map((item) => (
                  <RecommendationCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          </section>

          {(bridgedPodcast || bridgedNews) && (
            <section className="lg:col-span-3 rounded-2xl border border-slate-200 bg-slate-900 p-4 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4" />
                <h2 className="text-[11px] font-extrabold uppercase tracking-widest">Relevant Cross-Domain Suggestions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bridgedPodcast && (
                  <div
                    onClick={() => bridgedPodcast.url && window.open(bridgedPodcast.url, '_blank', 'noopener,noreferrer')}
                    className="rounded-2xl bg-white/10 border border-white/10 p-4 flex items-center gap-3 cursor-pointer hover:bg-white/20 transition-all"
                  >
                    <img src={bridgedPodcast.thumbnail} className="w-14 h-14 rounded-xl object-cover" alt="" />
                    <div className="min-w-0">
                      <p className="text-xs text-white/70 font-semibold">Because you liked “{sourceMovie?.title}”</p>
                      <p className="text-sm font-extrabold truncate">{bridgedPodcast.title}</p>
                      <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Podcast • {bridgedPodcast.author}</p>
                    </div>
                    <button className="ml-auto w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {bridgedNews && (
                  <div
                    onClick={() => bridgedNews.url && window.open(bridgedNews.url, '_blank', 'noopener,noreferrer')}
                    className="rounded-2xl bg-white/10 border border-white/10 p-4 flex items-center gap-3 cursor-pointer hover:bg-white/20 transition-all"
                  >
                    <img src={bridgedNews.thumbnail} className="w-14 h-14 rounded-xl object-cover" alt="" />
                    <div className="min-w-0">
                      <p className="text-xs text-white/70 font-semibold">Stay updated on your interests</p>
                      <p className="text-sm font-extrabold truncate">{bridgedNews.title}</p>
                      <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">News • {bridgedNews.platform}</p>
                    </div>
                    <button className="ml-auto px-3 py-2 rounded-xl bg-white text-slate-900 text-xs font-extrabold">
                      Read
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <aside className="xl:col-span-3 flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-700">User Profile & Preferences</h3>
            <p className="text-sm text-slate-500 mt-2">Cross-domain affinity evolves as you like/skip content.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Signals</p>
                <p className="text-sm font-extrabold text-slate-900">Realtime</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Sources</p>
                <p className="text-sm font-extrabold text-slate-900">Multi-domain</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/onboarding')}
              className="mt-4 w-full px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-extrabold uppercase tracking-widest"
            >
              Edit Preferences
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-700">Trending Across Formats</h3>
            <div className="mt-4 flex flex-col gap-3">
              {trendingItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => item.url && window.open(item.url, '_blank', 'noopener,noreferrer')}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 cursor-pointer hover:bg-slate-100 transition-all"
                >
                  <img src={item.thumbnail} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-slate-900 truncate">{item.title}</p>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
