'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    vx: number;
    vy: number;
    color: string;
}

export default function FacadeAnimation() {
    const [stage, setStage] = useState<'text' | 'particles' | 'done'>('text');
    const canvasRef = useRef<HTMLHTMLCanvasElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setStage('particles'), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (stage !== 'particles') return;

        const canvas = canvasRef.current;
        if (!canvas) {
            console.error('Canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Context not found');
            return;
        }

        // Setup canvas
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.scale(dpr, dpr);

        const width = window.innerWidth;
        const height = window.innerHeight;
        const centerX = width / 2;
        const centerY = height / 2;

        let particles: Particle[] = [];
        let animationId: number;
        let exploding = false;
        let explosionFrame = 0;

        const colors = ['#FF0000', '#FF1744', '#F44336', '#E91E63', '#FF3366', '#FF6B35', '#FF8C42', '#FF5722', '#FFB649'];

        // Load image and create particles
        const img = new Image();
        img.onload = () => {
            console.log('Image loaded successfully');

            // Create temporary canvas for pixel analysis
            const tempCanvas = document.createElement('canvas');
            const logoSize = Math.min(width, height) * 1.2; // Big logo
            tempCanvas.width = logoSize;
            tempCanvas.height = logoSize;

            const tempCtx = tempCanvas.getContext('2d');
            if (!tempCtx) return;

            // Draw logo to temp canvas
            tempCtx.drawImage(img, 0, 0, logoSize, logoSize);

            // Get pixel data
            const imageData = tempCtx.getImageData(0, 0, logoSize, logoSize);
            const pixels = imageData.data;

            // Create particles from dark pixels
            const step = 1; // Check every pixel for maximum density
            let count = 0;

            for (let y = 0; y < logoSize && count < 50000; y += step) {
                for (let x = 0; x < logoSize && count < 50000; x += step) {
                    const i = (y * logoSize + x) * 4;
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const a = pixels[i + 3];

                    const brightness = (r + g + b) / 3;

                    // If pixel is dark (part of logo)
                    if (a > 100 && brightness < 150) {
                        const targetX = (width - logoSize) / 2 + x;
                        const targetY = (height - logoSize) / 2 + y;

                        // Calculate angle for color
                        const dx = targetX - centerX;
                        const dy = targetY - centerY;
                        const angle = Math.atan2(dy, dx);
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        // Assign color by angle
                        const colorIdx = Math.floor(((angle + Math.PI) / (Math.PI * 2)) * colors.length) % colors.length;

                        // Start position - spiral outward
                        const startAngle = angle + Math.PI * 3;
                        const startDist = dist + 600;

                        particles.push({
                            x: centerX + Math.cos(startAngle) * startDist,
                            y: centerY + Math.sin(startAngle) * startDist,
                            targetX,
                            targetY,
                            vx: 0,
                            vy: 0,
                            color: colors[colorIdx]
                        });

                        count++;
                    }
                }
            }

            console.log(`Created ${particles.length} particles from logo`);

            // Start explosion after 2.5 seconds
            setTimeout(() => {
                exploding = true;
                setTimeout(() => setStage('done'), 1000);
            }, 2500);

            // Start animation
            animate();
        };

        img.onerror = (e) => {
            console.error('Failed to load image:', e);
            setStage('done');
        };

        img.src = '/logo-mark.jpg';
        console.log('Loading image from /logo-mark.jpg');

        function animate() {
            ctx.clearRect(0, 0, width, height);

            if (exploding) {
                explosionFrame++;
                const opacity = Math.max(0, 1 - explosionFrame / 60);

                particles.forEach(p => {
                    // Explode outward from center
                    const dx = p.x - centerX;
                    const dy = p.y - centerY;
                    const angle = Math.atan2(dy, dx);

                    p.vx = Math.cos(angle) * 20;
                    p.vy = Math.sin(angle) * 20;

                    p.x += p.vx;
                    p.y += p.vy;

                    ctx.globalAlpha = opacity;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                });

                if (opacity > 0) {
                    animationId = requestAnimationFrame(animate);
                }
            } else {
                // Spiral convergence
                particles.forEach(p => {
                    const dx = p.targetX - p.x;
                    const dy = p.targetY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 1) {
                        // Calculate spiral position
                        const angle = Math.atan2(p.y - centerY, p.x - centerX);
                        const currentDist = Math.sqrt(
                            Math.pow(p.x - centerX, 2) +
                            Math.pow(p.y - centerY, 2)
                        );

                        const targetDist = Math.sqrt(
                            Math.pow(p.targetX - centerX, 2) +
                            Math.pow(p.targetY - centerY, 2)
                        );

                        // Spiral inward
                        const newAngle = angle - 0.1;
                        const newDist = Math.max(currentDist - 4, targetDist);

                        const spiralX = centerX + Math.cos(newAngle) * newDist;
                        const spiralY = centerY + Math.sin(newAngle) * newDist;

                        // Combine spiral and direct movement
                        p.vx += (spiralX - p.x) * 0.05;
                        p.vy += (spiralY - p.y) * 0.05;
                        p.vx += dx * 0.03;
                        p.vy += dy * 0.03;

                        p.vx *= 0.9;
                        p.vy *= 0.9;

                        p.x += p.vx;
                        p.y += p.vy;
                    }

                    ctx.globalAlpha = 1;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                });

                animationId = requestAnimationFrame(animate);
            }
        }

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [stage]);

    if (stage === 'done') return null;

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
                <canvas ref={canvasRef} className="w-full h-full" />
            )}
        </div>
    );
}
