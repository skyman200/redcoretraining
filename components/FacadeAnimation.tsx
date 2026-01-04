'use client';

import { useState, useEffect } from 'react';

export default function FacadeAnimation() {
    const [isVisible, setIsVisible] = useState(true);
    const [animatingOut, setAnimatingOut] = useState(false);

    useEffect(() => {
        // Check if animation has been shown this session
        const hasShown = sessionStorage.getItem('facadeShown');

        if (hasShown) {
            setTimeout(() => setIsVisible(false), 0);
            return;
        }

        // Start fade out after 2 seconds
        const timer = setTimeout(() => {
            setAnimatingOut(true);
            // Remove from DOM after animation completes
            setTimeout(() => {
                setIsVisible(false);
                sessionStorage.setItem('facadeShown', 'true');
            }, 500);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] bg-white dark:bg-black flex items-center justify-center ${animatingOut ? 'fade-out' : 'fade-in'
                }`}
        >
            <div className="text-center">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
                    <span className="bg-gradient-to-r from-black via-red-600 to-black dark:from-white dark:via-red-400 dark:to-white bg-clip-text text-transparent animate-gradient">
                        REDCORE
                    </span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-gray-500 uppercase tracking-widest">
                    Training Center & Lab
                </p>
            </div>
        </div>
    );
}
