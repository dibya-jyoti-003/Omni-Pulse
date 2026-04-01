'use client';

import React, { useEffect, useMemo, useState } from 'react';
import RecommendationCard from '@/components/RecommendationCard';
import { searchContent } from '@/lib/clientApi';
import { RecommendedItem } from '@/lib/recommender';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<RecommendedItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    const initial = (url.searchParams.get('q') ?? '').trim();
    if (initial) setQ(initial);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!debounced.trim()) {
        setItems([]);
        return;
      }
      try {
        setLoading(true);
        const results = await searchContent(debounced);
        if (!mounted) return;
        setItems(results);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [debounced]);

  const emptyState = useMemo(() => {
    if (loading) return 'Searching...';
    if (!debounced.trim()) return 'Type to search across all formats.';
    if (items.length === 0) return 'No results found.';
    return null;
  }, [debounced, items.length, loading]);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-3xl">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Search</h1>
        <p className="text-sm text-slate-500 mt-2">Find content across movies, music, podcasts, videos, and news.</p>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title, author, tags, topics..."
          className="mt-5 w-full h-12 bg-white border border-slate-200 rounded-2xl px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100 transition-all"
        />
      </div>

      {emptyState ? (
        <div className="text-sm text-slate-500">{emptyState}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <RecommendationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
