'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveOnboarding } from '@/lib/clientApi';
import { getOrCreateUserId, setStoredExplicitInterests } from '@/lib/clientUser';
import { MOCK_DATA } from '@/lib/mockData';

function buildSuggestedInterests(): string[] {
  const set = new Set<string>();
  for (const item of MOCK_DATA) {
    for (const t of item.topics) set.add(t);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b)).slice(0, 24);
}

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const suggested = useMemo(() => buildSuggestedInterests(), []);

  const toggle = (interest: string) => {
    setSelected((prev) => (prev.includes(interest) ? prev.filter((x) => x !== interest) : [...prev, interest]));
  };

  const onContinue = async () => {
    try {
      setSaving(true);
      const userId = getOrCreateUserId();
      await saveOnboarding(userId, selected);
      setStoredExplicitInterests(selected);

      // Ensure the router pushes after state is set
      setTimeout(() => {
        router.push('/');
      }, 100);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Choose your interests</h1>
        <p className="text-sm text-slate-500 mt-2">
          Pick a few topics. We’ll use these to generate cross-domain recommendations.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {suggested.map((interest) => {
            const active = selected.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => toggle(interest)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all border ${active
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
              >
                {interest}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-semibold">Selected: {selected.length}</p>
          <button
            disabled={saving || selected.length === 0}
            onClick={onContinue}
            className={`px-5 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-widest transition-all ${saving || selected.length === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 text-white shadow-sm hover:bg-slate-800'
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
