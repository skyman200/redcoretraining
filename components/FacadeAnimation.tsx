'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number;
    vy: number;
}

export default function FacadeAnimation() {
    const [stage, setStage] = useState<'text' | 'particles' | 'done'>('text');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        // Text stage: 2 seconds
        const textTimer = setTimeout(() => {
            setStage('particles');
        }, 2000);

        return () => clearTimeout(textTimer);
    }, []);

    useEffect(() => {
        if (stage !== 'particles') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let opacity = 0;
        let fadeStart = Date.now() + 2000; // Start fading after 2 seconds

        // Set canvas size
        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
            return { width: window.innerWidth, height: window.innerHeight };
        };

        const initParticles = () => {
            const size = setCanvasSize();
            const { width, height } = size;

            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                const offCanvas = document.createElement('canvas');
                const offCtx = offCanvas.getContext('2d');
                if (!offCtx) return;

                // Make logo HUGE - fill most of the screen
                const logoSize = Math.min(width, height) * 0.8;
                offCanvas.width = logoSize;
                offCanvas.height = logoSize;

                offCtx.drawImage(img, 0, 0, logoSize, logoSize);
                const imageData = offCtx.getImageData(0, 0, logoSize, logoSize);
                const data = imageData.data;

                // VERY DENSE particles - density = 1 means almost every pixel
                const density = 1;
                const particles: Particle[] = [];

                for (let y = 0; y < logoSize; y += density) {
                    for (let x = 0; x < logoSize; x += density) {
                        const index = (y * logoSize + x) * 4;
                        const r = data[index];
                        const g = data[index + 1];
                        const b = data[index + 2];
                        const alpha = data[index + 3];

                        const brightness = (r + g + b) / 3;

                        if (alpha > 50 && brightness < 200) {
                            const originX = (width - logoSize) / 2 + x;
                            const originY = (height - logoSize) / 2 + y;

                            particles.push({
                                x: originX + (Math.random() - 0.5) * 200,
                                y: originY + (Math.random() - 0.5) * 200,
                                originX,
                                originY,
                                vx: 0,
                                vy: 0
                            });
                        }
                    }
                }

                particlesRef.current = particles;
                console.log(`Created ${particles.length} particles`);
                animate();
            };

            img.onerror = () => {
                console.error('Failed to load logo');
                setStage('done');
            };

            img.src = '/logo-mark.jpg';
        };

        const animate = () => {
            const size = { width: window.innerWidth, height: window.innerHeight };
            ctx.clearRect(0, 0, size.width, size.height);

            const now = Date.now();
            const particles = particlesRef.current;

            // Calculate opacity
            if (now < fadeStart) {
                opacity = Math.min(1, opacity + 0.05);
            } else {
                opacity = Math.max(0, opacity - 0.02);
                if (opacity <= 0) {
                    setStage('done');
                    return;
                }
            }

            particles.forEach(p => {
                // Spring towards origin
                const dx = p.originX - p.x;
                const dy = p.originY - p.y;

                p.vx += dx * 0.01;
                p.vy += dy * 0.01;

                p.vx *= 0.9;
                p.vy *= 0.9;

                p.x += p.vx;
                p.y += p.vy;

                // Draw small dots
                ctx.globalAlpha = opacity;
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [stage]);

    if (stage === 'done') {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-white">
            <AnimatePresence>
                {stage === 'text' && (
                    <motion.div
                        key="text"
                        initial={{ scale: 5, opacity: 1 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <h1 className="text-9xl font-black tracking-tighter text-black">
                            REDCORE
                        </h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {stage === 'particles' && (
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                />
            )}
        </div>
    );
}
