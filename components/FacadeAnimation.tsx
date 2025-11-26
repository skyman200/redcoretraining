'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Gemini Gradient Utils ---
const GRADIENT_COLORS = [
    { r: 76, g: 29, b: 149 },   // Deep Purple
    { r: 220, g: 20, b: 60 },   // Crimson
    { r: 255, g: 69, b: 0 },    // Orange Red
    { r: 255, g: 165, b: 0 },   // Orange
    { r: 255, g: 215, b: 0 }    // Gold
];

function getGradientColor(t: number): string {
    const scaled = t * (GRADIENT_COLORS.length - 1);
    const idx = Math.floor(scaled);
    const nextIdx = Math.min(idx + 1, GRADIENT_COLORS.length - 1);
    const progress = scaled - idx;

    const c1 = GRADIENT_COLORS[idx];
    const c2 = GRADIENT_COLORS[nextIdx];

    const r = Math.round(c1.r + (c2.r - c1.r) * progress);
    const g = Math.round(c1.g + (c2.g - c1.g) * progress);
    const b = Math.round(c1.b + (c2.b - c1.b) * progress);

    return `rgb(${r},${g},${b})`;
}

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
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setStage('particles'), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (stage !== 'particles') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

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

        const generateParticlesFromCanvas = (sourceCanvas: HTMLCanvasElement, size: number) => {
            const tempCtx = sourceCanvas.getContext('2d');
            if (!tempCtx) return [];

            let pixels: Uint8ClampedArray;
            try {
                const imageData = tempCtx.getImageData(0, 0, size, size);
                pixels = imageData.data;
            } catch (e) {
                console.error("Failed to get image data, using fallback.", e);
                tempCtx.clearRect(0, 0, size, size);
                tempCtx.fillStyle = '#000000';
                tempCtx.font = `900 ${size * 0.6}px serif`;
                tempCtx.textAlign = 'center';
                tempCtx.textBaseline = 'middle';
                tempCtx.fillText('R', size / 2, size / 2);

                const imageData = tempCtx.getImageData(0, 0, size, size);
                pixels = imageData.data;
            }

            const step = 1;
            let count = 0;
            const particleList: Particle[] = [];

            for (let y = 0; y < size && count < 80000; y += step) {
                for (let x = 0; x < size && count < 80000; x += step) {
                    const i = (y * size + x) * 4;
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const a = pixels[i + 3];
                    const brightness = (r + g + b) / 3;

                    if (a > 128 && brightness < 200) {
                        const targetX = (width - size) / 2 + x;
                        const targetY = (height - size) / 2 + y;

                        const dx = targetX - centerX;
                        const dy = targetY - centerY;
                        const angle = Math.atan2(dy, dx);
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        const gradientPos = x / size;
                        const color = getGradientColor(gradientPos);

                        const startAngle = angle + Math.PI * 5;
                        const startDist = dist + Math.max(width, height);

                        particleList.push({
                            x: centerX + Math.cos(startAngle) * startDist,
                            y: centerY + Math.sin(startAngle) * startDist,
                            targetX,
                            targetY,
                            vx: 0,
                            vy: 0,
                            color: color
                        });

                        count++;
                    }
                }
            }
            return particleList;
        };

        const loadSource = () => {
            const tempCanvas = document.createElement('canvas');
            const logoSize = Math.min(width, height) * 0.6;
            tempCanvas.width = logoSize;
            tempCanvas.height = logoSize;
            const tCtx = tempCanvas.getContext('2d');

            if (!tCtx) return;

            const img = new Image();

            const start = (generatedParticles: Particle[]) => {
                particles = generatedParticles;
                console.log(`Animation starting with ${particles.length} particles.`);

                setTimeout(() => {
                    exploding = true;
                    setTimeout(() => setStage('done'), 1500);
                }, 5000);

                animate();
            };

            img.onload = () => {
                tCtx.fillStyle = '#FFFFFF';
                tCtx.fillRect(0, 0, logoSize, logoSize);

                const scale = Math.min(logoSize / img.width, logoSize / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                tCtx.drawImage(img, (logoSize - w) / 2, (logoSize - h) / 2, w, h);

                const generated = generateParticlesFromCanvas(tempCanvas, logoSize);
                start(generated);
            };

            img.onerror = () => {
                console.warn("Image load failed, using fallback text.");
                tCtx.fillStyle = '#FFFFFF';
                tCtx.fillRect(0, 0, logoSize, logoSize);
                tCtx.fillStyle = '#000000';
                tCtx.font = `italic 900 ${logoSize * 0.8}px serif`;
                tCtx.textAlign = 'center';
                tCtx.textBaseline = 'middle';
                tCtx.fillText('R', logoSize / 2, logoSize / 2);

                const generated = generateParticlesFromCanvas(tempCanvas, logoSize);
                start(generated);
            };

            img.src = '/logo-mark.jpg';
        };

        function animate() {
            ctx.clearRect(0, 0, width, height);

            if (exploding) {
                explosionFrame++;
                const opacity = Math.max(0, 1 - explosionFrame / 60);

                particles.forEach(p => {
                    const dx = p.x - centerX;
                    const dy = p.y - centerY;
                    const angle = Math.atan2(dy, dx);

                    p.vx = Math.cos(angle) * 15 + (Math.random() - 0.5) * 5;
                    p.vy = Math.sin(angle) * 15 + (Math.random() - 0.5) * 5;

                    p.x += p.vx;
                    p.y += p.vy;

                    ctx.globalAlpha = opacity;
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, 0.3, 0.3);
                });

                if (opacity > 0) {
                    animationId = requestAnimationFrame(animate);
                }
            } else {
                particles.forEach(p => {
                    const dx = p.targetX - p.x;
                    const dy = p.targetY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 2) {
                        const currentAngle = Math.atan2(p.y - centerY, p.x - centerX);
                        const currentDist = Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2));
                        const targetDist = Math.sqrt(Math.pow(p.targetX - centerX, 2) + Math.pow(p.targetY - centerY, 2));

                        const newAngle = currentAngle - 0.08;
                        const newDist = currentDist - (currentDist - targetDist) * 0.05 - 2;

                        const spiralX = centerX + Math.cos(newAngle) * Math.max(newDist, targetDist);
                        const spiralY = centerY + Math.sin(newAngle) * Math.max(newDist, targetDist);

                        p.x += (spiralX - p.x) * 0.3;
                        p.y += (spiralY - p.y) * 0.3;

                        p.x += (p.targetX - p.x) * 0.05;
                        p.y += (p.targetY - p.y) * 0.05;
                    } else {
                        p.x = p.targetX;
                        p.y = p.targetY;
                    }

                    ctx.globalAlpha = 1;
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, 0.25, 0.25);
                });

                animationId = requestAnimationFrame(animate);
            }
        }

        loadSource();

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
                                background: 'linear-gradient(to right, rgb(76,29,149), rgb(220,20,60), rgb(255,69,0), rgb(255,165,0), rgb(255,215,0))',
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
                <canvas ref={canvasRef} className="w-full h-full block" />
            )}
        </div>
    );
}
