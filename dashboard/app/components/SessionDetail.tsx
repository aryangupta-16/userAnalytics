'use client';

import { useEffect, useState } from 'react';
import { fetchEventsBySession } from '../services/api';

interface Event {
    _id: string;
    type: 'page_view' | 'click';
    url: string;
    timestamp: string;
    x?: number;
    y?: number;
}

interface SessionDetailProps {
    sessionId: string;
    onClose: () => void;
}

export default function SessionDetail({ sessionId, onClose }: SessionDetailProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEventsBySession(sessionId)
            .then(setEvents)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [sessionId]);

    if (loading) return <div className="p-4">Loading events...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="h-full flex flex-col">
            <div className="px-6 py-5 border-b border-white/5 bg-zinc-900/50 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-white">Session Details</h3>
                    <p className="text-xs text-zinc-500 font-mono mt-1">{sessionId}</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                <div className="relative pl-4 border-l border-white/10 space-y-8">
                    {events.map((event, eventIdx) => (
                        <div key={event._id} className="relative">
                            <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 ${event.type === 'page_view'
                                ? 'border-blue-500 bg-zinc-900'
                                : 'border-pink-500 bg-zinc-900'
                                }`} />

                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${event.type === 'page_view'
                                            ? 'bg-blue-500/20 text-blue-400'
                                            : 'bg-pink-500/20 text-pink-400'
                                            }`}>
                                            {event.type.replace('_', ' ')}
                                        </span>
                                        <span className="text-xs text-zinc-500">
                                            {new Date(event.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="text-sm text-zinc-300 font-medium break-all">
                                    {event.url}
                                </div>

                                {event.type === 'click' && (
                                    <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500 font-mono">
                                        <span className="flex items-center gap-1">
                                            <span className="text-zinc-600">X:</span> {event.x}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="text-zinc-600">Y:</span> {event.y}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
