'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number;
    vy: number;
    size: number;
}

export default function EmblemParticles({ className = '' }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouseX = -9999;
        let mouseY = -9999;

        // Set canvas size
        const setCanvasSize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = parent.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            ctx.scale(dpr, dpr);

            return { width: rect.width, height: rect.height };
        };

        const initParticles = () => {
            const size = setCanvasSize();
            if (!size) return;

            const { width, height } = size;

            // Load image
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                // Create offscreen canvas for image analysis
                const offCanvas = document.createElement('canvas');
                const offCtx = offCanvas.getContext('2d');
                if (!offCtx) return;

                // Size for the R logo - make it centered and appropriately sized
                const logoSize = Math.min(width, height) * 0.4;
                offCanvas.width = logoSize;
                offCanvas.height = logoSize;

                // Draw image
                offCtx.drawImage(img, 0, 0, logoSize, logoSize);

                // Get image data
                const imageData = offCtx.getImageData(0, 0, logoSize, logoSize);
                const data = imageData.data;

                // Create particles - very dense grid (1 pixel = 1 potential particle)
                particles = [];
                const density = 2; // Lower = more particles

                for (let y = 0; y < logoSize; y += density) {
                    for (let x = 0; x < logoSize; x += density) {
                        const index = (y * logoSize + x) * 4;
                        const r = data[index];
                        const g = data[index + 1];
                        const b = data[index + 2];
                        const alpha = data[index + 3];

                        // Detect dark pixels (the logo itself)
                        const brightness = (r + g + b) / 3;

                        if (alpha > 50 && brightness < 200) {
                            // Position in center of screen
                            const originX = (width - logoSize) / 2 + x;
                            const originY = (height - logoSize) / 2 + y;

                            particles.push({
                                x: Math.random() * width,
                                y: Math.random() * height,
                                originX,
                                originY,
                                vx: 0,
                                vy: 0,
                                size: 1.5
                            });
                        }
                    }
                }

                console.log(`Created ${particles.length} particles`);
                animate();
            };

            img.onerror = () => {
                console.error('Failed to load logo image');
            };

            img.src = '/logo-mark.jpg';
        };

        const animate = () => {
            const size = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, size.width, size.height);

            particles.forEach(p => {
                // Spring physics towards origin
                const dx = p.originX - p.x;
                const dy = p.originY - p.y;

                // Mouse repulsion
                const mdx = mouseX - p.x;
                const mdy = mouseY - p.y;
                const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mouseDist < 100) {
                    const force = (100 - mouseDist) / 100;
                    p.vx -= (mdx / mouseDist) * force * 3;
                    p.vy -= (mdy / mouseDist) * force * 3;
                }

                // Spring force
                p.vx += dx * 0.02;
                p.vy += dy * 0.02;

                // Damping
                p.vx *= 0.85;
                p.vy *= 0.85;

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Draw
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Event listeners
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -9999;
            mouseY = -9999;
        };

        const handleResize = () => {
            initParticles();
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);

        // Initialize
        initParticles();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className={className} />;
}
