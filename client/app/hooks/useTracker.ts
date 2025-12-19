'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:3001/api/events';

export const useTracker = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const getSessionId = useCallback(() => {
        if (typeof window === 'undefined') return '';
        let sessionId = localStorage.getItem('user_analytics_session_id');
        if (!sessionId) {
            sessionId = uuidv4();
            localStorage.setItem('user_analytics_session_id', sessionId);
        }
        return sessionId;
    }, []);

    const sendEvent = useCallback((eventData: any) => {
        const payload = JSON.stringify(eventData);
        console.log('Sending event:', eventData);

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload,
            keepalive: true
        }).catch(err => console.error('Failed to send event:', err));
    }, []);

    const trackPageView = useCallback(() => {
        const url = window.location.href;
        sendEvent({
            session_id: getSessionId(),
            type: 'page_view',
            url,
            timestamp: new Date().toISOString()
        });
    }, [getSessionId, sendEvent]);

    const trackClick = useCallback((e: MouseEvent) => {
        const url = window.location.href;
        sendEvent({
            session_id: getSessionId(),
            type: 'click',
            url,
            timestamp: new Date().toISOString(),
            x: e.pageX,
            y: e.pageY
        });
    }, [getSessionId, sendEvent]);

    return {
        trackEvent: (type: 'page_view' | 'click', data: any = {}) => {
            sendEvent({
                session_id: getSessionId(),
                type,
                url: window.location.href,
                timestamp: new Date().toISOString(),
                ...data
            });
        },
        trackPageView,
        trackClick
    };
};
