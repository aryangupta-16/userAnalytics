'use client';

import { useEffect, useState } from 'react';
import { fetchSessions } from '../services/api';

interface Session {
    _id: string;
    eventCount: number;
    startTime: string;
    endTime: string;
}

interface SessionListProps {
    onSelectSession: (sessionId: string) => void;
}

export default function SessionList({ onSelectSession }: SessionListProps) {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSessions()
            .then(setSessions)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4">Loading sessions...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="h-full flex flex-col">
            <div className="px-6 py-5 border-b border-white/5 bg-zinc-900/50">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    User Sessions
                </h3>
            </div>
            <ul className="flex-1 overflow-y-auto divide-y divide-white/5 p-2">
                {sessions.map((session) => (
                    <li
                        key={session._id}
                        onClick={() => onSelectSession(session._id)}
                        className="group p-4 hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-200 mb-1 border border-transparent hover:border-white/5"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-purple-400 truncate font-mono">
                                {session._id.slice(0, 8)}...
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                {session.eventCount} events
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                            <span>Started {new Date(session.startTime).toLocaleTimeString()}</span>
                            <span>{new Date(session.startTime).toLocaleDateString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
