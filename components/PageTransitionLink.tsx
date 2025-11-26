'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PageTransitionLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function PageTransitionLink({ href, children, className }: PageTransitionLinkProps) {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Don't intercept for external links or hash links
        if (href.startsWith('http') || href.startsWith('#')) {
            return;
        }

        e.preventDefault();
        setIsTransitioning(true);

        // Trigger transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);

        // Navigate after overlay appears
        setTimeout(() => {
            router.push(href);

            // Remove overlay after navigation
            setTimeout(() => {
                overlay.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(overlay);
                    setIsTransitioning(false);
                }, 500);
            }, 100);
        }, 500);
    };

    return (
        <Link href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}
