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
    distance: number;
    speed: number;
    settled: boolean;
}

export default function FacadeAnimation() {
    const [stage, setStage] = useState<'text' | 'particles' | 'done'>('text');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const [isExploding, setIsExploding] = useState(false);

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
        let frameCount = 0;

        const colors = [
            '#FF0000', '#FF1744', '#F44336', '#E91E63', '#FF3366',
            '#FF6B35', '#FF8C42', '#FF5722', '#FFB649'
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

                const logoSize = Math.min(width, height) * 1.6;
                offCanvas.width = logoSize;
                offCanvas.height = logoSize;

                offCtx.drawImage(img, 0, 0, logoSize, logoSize);
                const imageData = offCtx.getImageData(0, 0, logoSize, logoSize);
                const data = imageData.data;

                const particles: Particle[] = [];
                const targetParticles = 50000;
                const totalPixels = logoSize * logoSize;
                const estimatedDarkPixels = totalPixels * 0.3;
                const density = Math.sqrt(estimatedDarkPixels / targetParticles);

                for (let y = 0; y < logoSize; y += density) {
                    for (let x = 0; x < logoSize; x += density) {
                        const index = (Math.floor(y) * logoSize + Math.floor(x)) * 4;
                        const alpha = data[index + 3];
                        const brightness = (data[index] + data[index + 1] + data[index + 2]) / 3;

                        if (alpha > 50 && brightness < 200) {
                            const originX = (width - logoSize) / 2 + x;
                            const originY = (height - logoSize) / 2 + y;

                            const dx = originX - centerX;
                            const dy = originY - centerY;
                            const angle = Math.atan2(dy, dx);
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            const colorIndex = Math.floor(((angle + Math.PI) / (Math.PI * 2)) * colors.length);
                            const color = colors[colorIndex % colors.length];

                            // Start far away in spiral pattern
                            const startAngle = angle + Math.PI * 4;
                            const startDist = distance + 800;
                            const startX = centerX + Math.cos(startAngle) * startDist;
                            const startY = centerY + Math.sin(startAngle) * startDist;

                            particles.push({
                                x: startX,
                                y: startY,
                                originX,
                                originY,
                                vx: 0,
                                vy: 0,
                                color,
                                angle: startAngle,
                                distance: startDist,
                                speed: Math.random() * 1.5 + 0.5,
                                settled: false
                            });
                        }
                    }
                }

                particlesRef.current = particles;
                console.log(`Created ${particles.length} particles`);

                // Start explosion after 2.5 seconds
                setTimeout(() => {
                    setIsExploding(true);
                    setTimeout(() => {
                        setStage('done');
                    }, 800);
                }, 2500);

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

            frameCount++;
            const particles = particlesRef.current;
            const centerX = size.width / 2;
            const centerY = size.height / 2;

            particles.forEach(p => {
                if (isExploding) {
                    // EXPLOSION EFFECT
                    const dx = p.x - centerX;
                    const dy = p.y - centerY;
                    const angle = Math.atan2(dy, dx);
                    const force = 15;

                    p.vx = Math.cos(angle) * force;
                    p.vy = Math.sin(angle) * force;

                    p.x += p.vx;
                    p.y += p.vy;

                    // Fade out
                    ctx.globalAlpha = Math.max(0, 1 - frameCount / 50);
                } else {
                    // SPIRAL CONVERGENCE
                    const dx = p.originX - p.x;
                    const dy = p.originY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 2) {
                        // Still converging - spiral motion
                        const centerDx = p.originX - centerX;
                        const centerDy = p.originY - centerY;

                        // Reduce angle (spiral inward)
                        p.angle -= 0.08 * p.speed;
                        p.distance = Math.max(p.distance - p.speed * 3, dist);

                        // Calculate spiral position
                        const spiralX = centerX + Math.cos(p.angle) * p.distance;
                        const spiralY = centerY + Math.sin(p.angle) * p.distance;

                        // Move towards spiral position AND origin
                        p.vx += (spiralX - p.x) * 0.03;
                        p.vy += (spiralY - p.y) * 0.03;
                        p.vx += dx * 0.02;
                        p.vy += dy * 0.02;
                    } else {
                        // Settled at origin
                        p.settled = true;
                        p.vx += dx * 0.05;
                        p.vy += dy * 0.05;
                    }

                    p.vx *= 0.88;
                    p.vy *= 0.88;

                    p.x += p.vx;
                    p.y += p.vy;

                    ctx.globalAlpha = 1;
                }

                // Draw particle
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
    }, [stage, isExploding]);

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
                        <h1
                            className="text-9xl font-black tracking-tighter"
                            style={{
                                background: 'radial-gradient(ellipse at center, #DC143C 0%, #FF6B6B 30%, #FFB3B3 60%, rgba(255,179,179,0.3) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
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
