'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Music, Mic, Film, Newspaper, ExternalLink } from 'lucide-react';
import { RecommendedItem } from '../lib/recommender';
import { getOrCreateUserId } from '@/lib/clientUser';
import { trackInteraction } from '@/lib/clientApi';

interface Props {
  item: RecommendedItem;
  variant?: 'compact' | 'featured';
}

const typeIcons = {
  video: Play,
  music: Music,
  podcast: Mic,
  movie: Film,
  news: Newspaper,
};

export default function RecommendationCard({ item, variant = 'compact' }: Props) {
  const Icon = typeIcons[item.type];
  const openedAtRef = useRef<number | null>(null);

  const sendEvent = async (event: 'click' | 'like' | 'skip') => {
    const userId = getOrCreateUserId();
    const openedAt = openedAtRef.current;
    const dwellTimeMs = openedAt ? Math.max(0, Date.now() - openedAt) : undefined;
    try {
      const updatedProfile = await trackInteraction(userId, item.id, event, dwellTimeMs);
      if (event === 'like') {
        window.location.reload(); // Refresh to see updated recommendations
      }
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => {
        if (!openedAtRef.current) openedAtRef.current = Date.now();
      }}
      onClick={() => {
        void sendEvent('click');
        if (item.url) {
          window.open(item.url, '_blank', 'noopener,noreferrer');
        }
      }}
      className={`rounded-2xl overflow-hidden cursor-pointer group flex flex-col bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all ${variant === 'featured' ? 'h-[420px]' : 'h-[320px]'
        }`}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-white/60 px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
          <Icon className="w-3.5 h-3.5 text-slate-700" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800">
            {item.type}
          </span>
        </div>
        {item.duration && (
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur border border-white/60 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-800 shadow-sm">
            {item.duration}
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col gap-2">
        <h3 className="text-[15px] font-extrabold leading-snug text-slate-900 group-hover:text-slate-950 transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-slate-500 font-semibold">{item.author}</p>

        {item.description && (
          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
            {item.description}
          </p>
        )}

        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              void sendEvent('like');
            }}
            className="px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all"
          >
            Like
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              void sendEvent('skip');
            }}
            className="px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200"
          >
            Skip
          </button>
        </div>

        <div className="mt-auto pt-3 flex flex-wrap gap-1.5 overflow-hidden h-6">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[9px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
              {tag}
            </span>
          ))}
        </div>

        {item.reason && (
          <div className="mt-2 pt-2 border-t border-slate-200 flex items-start gap-2">
            <div className="w-1 h-full bg-slate-300 rounded-full self-stretch mt-1" />
            <div>
              <p className="text-[9px] text-slate-600 font-extrabold uppercase tracking-tight">
                Recommended Because:
              </p>
              <p className="text-[10px] text-slate-600 italic leading-tight">
                Matches topic "{item.reason.sharedTopics[0]}" from {item.reason.sourceTitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
