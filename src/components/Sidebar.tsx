'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  Compass, 
  TrendingUp, 
  Layers, 
  Heart, 
  Clock, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Compass, label: 'Explore', href: '/search' },
  { icon: TrendingUp, label: 'Trending', href: '/' },
  { icon: Layers, label: 'Onboarding', href: '/onboarding' },
];

const secondaryItems = [
  { icon: Heart, label: 'Favorites' },
  { icon: Clock, label: 'History' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white/90 backdrop-blur-xl border-r border-slate-200 h-screen sticky top-0 flex flex-col p-5 z-50">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-br from-blue-600 to-violet-600">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col leading-tight">
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
          OmniPulse
          </h1>
          <p className="text-[11px] font-semibold text-slate-500">Unified Platform</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-2">
            Menu
          </p>
          {menuItems.map((item) => (
            (() => {
              const active = pathname === item.href;
              return (
            <motion.button
              key={item.label}
              whileHover={{ x: 4 }}
              onClick={() => router.push(item.href)}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group ${
                active 
                ? 'bg-slate-100 text-slate-900 border border-slate-200' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
              );
            })()
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-2">
            Library
          </p>
          {secondaryItems.map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 px-3 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all group"
            >
              <item.icon className="w-5 h-5 text-slate-400 group-hover:text-slate-700" />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </nav>

      <div className="mt-auto pt-5 border-t border-slate-200 flex flex-col gap-2">
         <button className="flex items-center gap-4 px-3 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
            <Settings className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium">Settings</span>
         </button>
         <button className="flex items-center gap-4 px-3 py-3 rounded-xl text-red-600/80 hover:text-red-600 hover:bg-red-50 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
         </button>
      </div>
    </aside>
  );
}
