'use client';

import { ReactNode, Suspense, useEffect } from 'react';
import { useTracker } from '../hooks/useTracker';
import { usePathname, useSearchParams } from 'next/navigation';

function TrackerLogic() {
    const { trackPageView, trackClick } = useTracker();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Track page views on route change
    useEffect(() => {
        trackPageView();
    }, [pathname, searchParams, trackPageView]);

    // Track clicks globally
    useEffect(() => {
        window.addEventListener('click', trackClick);
        return () => {
            window.removeEventListener('click', trackClick);
        };
    }, [trackClick]);

    return null;
}

export function TrackerProvider({ children }: { children: ReactNode }) {
    return (
        <>
            <Suspense fallback={null}>
                <TrackerLogic />
            </Suspense>
            {children}
        </>
    );
}
