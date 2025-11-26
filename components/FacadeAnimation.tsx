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
    color: string;
    angle: number;
    radius: number;
    speed: number;
}

export default function FacadeAnimation() {
    const [stage, setStage] = useState<'text' | 'particles' | 'done'>('text');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const textTimer = setTimeout(() => {
            setStage('particles');
        }, 2500);

        return () => clearTimeout(textTimer);
    }, []);

    useEffect(() => {
        if (stage !== 'particles') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;
        let fadingOut = false;
        let opacity = 1;

        const colors = [
            '#FF0000', // Red
            '#FF3366', // Pink Red
            '#FF6B35', // Orange Red
            '#FF8C42', // Orange
            '#FFB649', // Yellow Orange
            '#FF1744', // Vivid Red
            '#E91E63', // Pink
            '#F44336', // Light Red
            '#FF5722', // Deep Orange
        ];

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
            const centerX = width / 2;
            const centerY = height / 2;

            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                const offCanvas = document.createElement('canvas');
                const offCtx = offCanvas.getContext('2d');
                if (!offCtx) return;

                // HUGE logo - almost fill entire screen (2x bigger)
                const logoSize = Math.min(width, height) * 1.6;
                offCanvas.width = logoSize;
                offCanvas.height = logoSize;

                offCtx.drawImage(img, 0, 0, logoSize, logoSize);
                const imageData = offCtx.getImageData(0, 0, logoSize, logoSize);
                const data = imageData.data;

                const particles: Particle[] = [];

                // Calculate density to get ~50,000 particles
                const targetParticles = 50000;
                const totalPixels = logoSize * logoSize;
                const estimatedDarkPixels = totalPixels * 0.3; // Rough estimate
                const density = Math.sqrt(estimatedDarkPixels / targetParticles);

                for (let y = 0; y < logoSize; y += density) {
                    for (let x = 0; x < logoSize; x += density) {
                        const index = (Math.floor(y) * logoSize + Math.floor(x)) * 4;
                        const r = data[index];
                        const g = data[index + 1];
                        const b = data[index + 2];
                        const alpha = data[index + 3];

                        const brightness = (r + g + b) / 3;

                        if (alpha > 50 && brightness < 200) {
                            const originX = (width - logoSize) / 2 + x;
                            const originY = (height - logoSize) / 2 + y;

                            // Calculate angle and distance from center for vortex effect
                            const dx = originX - centerX;
                            const dy = originY - centerY;
                            const angle = Math.atan2(dy, dx);
                            const radius = Math.sqrt(dx * dx + dy * dy);

                            // Assign color based on angle (creates rainbow vortex)
                            const colorIndex = Math.floor(((angle + Math.PI) / (Math.PI * 2)) * colors.length);
                            const color = colors[colorIndex % colors.length];

                            // Start particles in a vortex pattern far from origin
                            const startAngle = angle + Math.PI * 2;
                            const startRadius = radius + 500;
                            const startX = centerX + Math.cos(startAngle) * startRadius;
                            const startY = centerY + Math.sin(startAngle) * startRadius;

                            particles.push({
                                x: startX,
                                y: startY,
                                originX,
                                originY,
                                vx: 0,
                                vy: 0,
                                color,
                                angle: startAngle,
                                radius: startRadius,
                                speed: Math.random() * 2 + 1
                            });
                        }
                    }
                }

                particlesRef.current = particles;
                console.log(`Created ${particles.length} particles`);

                // Start fading out after 3 seconds
                setTimeout(() => {
                    fadingOut = true;
                }, 3000);

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

            time += 0.016; // ~60fps
            const particles = particlesRef.current;

            // Handle fade out
            if (fadingOut) {
                opacity -= 0.015;
                if (opacity <= 0) {
                    setStage('done');
                    return;
                }
            }

            const centerX = size.width / 2;
            const centerY = size.height / 2;

            particles.forEach(p => {
                // Spiral motion towards origin
                const dx = p.originX - p.x;
                const dy = p.originY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 5) {
                    // Vortex effect - spiral inward
                    const targetAngle = Math.atan2(p.originY - centerY, p.originX - centerX);
                    const currentAngle = Math.atan2(p.y - centerY, p.x - centerX);

                    // Spiral motion
                    p.angle -= 0.05 * p.speed;
                    p.radius = Math.max(p.radius - p.speed * 2, dist);

                    // Move in spiral
                    const spiralX = centerX + Math.cos(p.angle) * p.radius;
                    const spiralY = centerY + Math.sin(p.angle) * p.radius;

                    // Blend spiral with direct movement
                    p.vx += (spiralX - p.x) * 0.02;
                    p.vy += (spiralY - p.y) * 0.02;
                    p.vx += dx * 0.008;
                    p.vy += dy * 0.008;
                } else {
                    // Settled - small spring motion
                    p.vx += dx * 0.01;
                    p.vy += dy * 0.01;
                }

                p.vx *= 0.92;
                p.vy *= 0.92;

                p.x += p.vx;
                p.y += p.vy;

                // Draw particle
                ctx.globalAlpha = opacity;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
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
                        transition={{ duration: 2, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <motion.h1
                            initial={{
                                backgroundImage: 'linear-gradient(90deg, #000 0%, #000 100%)'
                            }}
                            animate={{
                                backgroundImage: [
                                    'linear-gradient(90deg, #000 0%, #000 100%)',
                                    'linear-gradient(90deg, #FF0000 0%, #FF6B35 50%, #FF0000 100%)',
                                ]
                            }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="text-9xl font-black tracking-tighter bg-clip-text text-transparent"
                            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                        >
                            REDCORE
                        </motion.h1>
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
