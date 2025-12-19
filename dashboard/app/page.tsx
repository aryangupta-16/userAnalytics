'use client';

import { useState } from 'react';
import SessionList from './components/SessionList';
import SessionDetail from './components/SessionDetail';
import Heatmap from './components/Heatmap';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'sessions' | 'heatmap'>('sessions');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200 p-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-zinc-400">
              Real-time insights into user behavior and engagement.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Live System</span>
          </div>
        </header>

        <div className="mb-8">
          <nav className="flex space-x-1 bg-zinc-900/50 p-1 rounded-xl border border-white/5 w-fit backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('sessions')}
              className={`${activeTab === 'sessions'
                ? 'bg-zinc-800 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                } px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200`}
            >
              Sessions
            </button>
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`${activeTab === 'heatmap'
                ? 'bg-zinc-800 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                } px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200`}
            >
              Heatmap
            </button>
          </nav>
        </div>

        <div className="h-[calc(100vh-250px)]">
          {activeTab === 'sessions' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              <div className="md:col-span-1 h-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm shadow-xl">
                <SessionList onSelectSession={setSelectedSessionId} />
              </div>
              <div className="md:col-span-2 h-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm shadow-xl">
                {selectedSessionId ? (
                  <SessionDetail
                    sessionId={selectedSessionId}
                    onClose={() => setSelectedSessionId(null)}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center">
                      <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <p>Select a session to view detailed timeline</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm shadow-xl overflow-hidden">
              <Heatmap />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
