'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchClickData } from '../services/api';

interface ClickData {
    x: number;
    y: number;
}

export default function Heatmap() {
    const [url, setUrl] = useState('');
    const [clicks, setClicks] = useState<ClickData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);
        fetchClickData(url)
            .then(setClicks)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    return (
        <div className="h-full flex flex-col">
            <div className="px-6 py-5 border-b border-white/5 bg-zinc-900/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                    Click Heatmap
                </h3>
                <form onSubmit={handleSubmit} className="flex gap-3">
                    <div className="relative flex-1 group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-200"></div>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter page URL (e.g., http://localhost:3002/)"
                            className="relative w-full bg-zinc-900 text-white rounded-lg border border-white/10 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-zinc-600"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Generating...' : 'Generate Heatmap'}
                    </button>
                </form>
                {error && <p className="mt-2 text-sm text-red-400 bg-red-500/10 px-3 py-1 rounded border border-red-500/20 inline-block">{error}</p>}
            </div>

            <div className="flex-1 relative overflow-auto bg-zinc-950 p-8 min-h-[500px]">
                {clicks.length > 0 ? (
                    <div className="relative w-full h-full min-w-[1024px] min-h-[768px] bg-white border-4 border-zinc-800 rounded-xl mx-auto shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none z-10">
                            {clicks.map((click, i) => (
                                <div
                                    key={i}
                                    className="absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        left: click.x,
                                        top: click.y,
                                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(236, 72, 153, 0) 70%)'
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-center h-full text-zinc-300 bg-zinc-900">
                            <div className="text-center">
                                <p className="text-xl font-medium mb-2">Page Preview Area</p>
                                <p className="text-sm text-zinc-500">Overlaying {clicks.length} interaction points</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5">
                            <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <p>Enter a URL above to visualize user clicks</p>
                    </div>
                )}
            </div>
        </div>
    );
}
