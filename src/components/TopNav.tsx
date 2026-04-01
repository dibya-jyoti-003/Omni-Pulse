'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, User, Sparkles, Filter } from 'lucide-react';

export default function TopNav() {
  const router = useRouter();
  const [q, setQ] = useState('');

  return (
    <header className="h-20 bg-white/85 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-3xl">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-700 transition-colors" />
          <input 
            type="text" 
            placeholder="Search across all content (Movies, Music, Podcasts...)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const next = q.trim();
                router.push(next ? `/search?q=${encodeURIComponent(next)}` : '/search');
              }
            }}
            className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
             <kbd className="px-1.5 py-0.5 rounded border border-slate-200 text-[10px] text-slate-400">⌘</kbd>
             <kbd className="px-1.5 py-0.5 rounded border border-slate-200 text-[10px] text-slate-400">K</kbd>
          </div>
        </div>
        <button className="p-2.5 rounded-xl hover:bg-slate-100 transition-all border border-slate-200 bg-white">
          <Filter className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="bg-slate-900 p-2.5 rounded-xl shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 px-4">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white uppercase tracking-tight">Insights</span>
        </button>
        <button className="p-2.5 rounded-xl hover:bg-slate-100 transition-all relative border border-slate-200 bg-white">
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
        </button>
        <div className="h-10 w-10 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
           <div className="w-full h-full rounded-[10px] flex items-center justify-center">
              <User className="w-6 h-6 text-slate-500" />
           </div>
        </div>
      </div>
    </header>
  );
}
