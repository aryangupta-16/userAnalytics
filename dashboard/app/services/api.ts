const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const fetchSessions = async () => {
    const response = await fetch(`${API_URL}/sessions`);
    if (!response.ok) {
        throw new Error('Failed to fetch sessions');
    }
    return response.json();
};

export const fetchEventsBySession = async (sessionId: string) => {
    const response = await fetch(`${API_URL}/events/session/${sessionId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    return response.json();
};

export const fetchClickData = async (url: string) => {
    const response = await fetch(`${API_URL}/heatmap?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch heatmap data');
    }
    return response.json();
};
