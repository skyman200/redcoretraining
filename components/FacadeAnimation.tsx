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
    // t is 0 to 1
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

    // Start particle phase after 2 seconds
    useEffect(() => {
        // Check if animation has been shown this session
        const hasShown = sessionStorage.getItem('facadeShown');

        if (hasShown) {
            setStage('done');
            return;
        }

        const timer = setTimeout(() => {
            setStage('particles');
            sessionStorage.setItem('facadeShown', 'true');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (stage !== 'particles') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Setup canvas with correct DPR
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

        // --- Particle Generation Logic ---
        const generateParticlesFromCanvas = (sourceCanvas: HTMLCanvasElement, size: number) => {
            const tempCtx = sourceCanvas.getContext('2d');
            if (!tempCtx) return [];

            // Try to get pixel data. This might fail if the image is tainted (CORS).
            let pixels: Uint8ClampedArray;
            try {
                const imageData = tempCtx.getImageData(0, 0, size, size);
                pixels = imageData.data;
            } catch (e) {
                console.error("Failed to get image data (likely CORS). Using fallback generator.", e);
                // Fallback: Clear and draw text instead
                tempCtx.clearRect(0, 0, size, size);
                tempCtx.fillStyle = '#000000';
                tempCtx.font = `900 ${size * 0.6}px serif`;
                tempCtx.textAlign = 'center';
                tempCtx.textBaseline = 'middle';
                tempCtx.fillText('R', size / 2, size / 2); // Fallback to 'R' logo shape

                const imageData = tempCtx.getImageData(0, 0, size, size);
                pixels = imageData.data;
            }

            const step = 4; // Check every 4th pixel on the high-res 800x800 canvas
            let count = 0;
            const particleList: Particle[] = [];

            // Center of the source canvas
            const sourceCenter = size / 2;

            for (let y = 0; y < size && count < 20000; y += step) {
                for (let x = 0; x < size && count < 20000; x += step) {
                    const i = (y * size + x) * 4;
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const brightness = (r + g + b) / 3;

                    // If dark pixel (text)
                    if (brightness < 128) {
                        // Calculate position relative to screen center
                        // We initially map it to the center of the screen based on source size
                        // The loadSource function will rescale this later, but we need valid initial coords
                        const targetX = centerX - sourceCenter + x;
                        const targetY = centerY - sourceCenter + y;

                        const dx = targetX - centerX;
                        const dy = targetY - centerY;
                        const angle = Math.atan2(dy, dx);
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        // Gemini Gradient based on X position in the letter
                        const gradientPos = x / size;
                        const color = getGradientColor(gradientPos);

                        particleList.push({
                            x: 0, // Will be reset in loadSource
                            y: 0,
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

        // --- Source Loading ---
        const loadSource = () => {
            const tempCanvas = document.createElement('canvas');
            // Use a fixed, large size for the source to ensure high resolution
            const sourceSize = 800;
            tempCanvas.width = sourceSize;
            tempCanvas.height = sourceSize;
            const tCtx = tempCanvas.getContext('2d');

            if (!tCtx) return;

            // Draw 'R' text directly with high precision
            tCtx.fillStyle = '#FFFFFF'; // White background
            tCtx.fillRect(0, 0, sourceSize, sourceSize);

            tCtx.fillStyle = '#000000'; // Black text
            // Use Arial Black for a thick, solid shape that generates good particles
            tCtx.font = `900 ${sourceSize * 0.7}px "Arial Black", "Helvetica Neue", sans-serif`;
            tCtx.textAlign = 'center';
            tCtx.textBaseline = 'middle';
            tCtx.fillText('R', sourceSize / 2, sourceSize / 2);

            const generated = generateParticlesFromCanvas(tempCanvas, sourceSize);

            // Adjust particle positions to match current screen size
            const logoSize = Math.min(width, height) * 0.6;
            const scale = logoSize / sourceSize;

            const scaledParticles = generated.map(p => ({
                ...p,
                targetX: (p.targetX - (width - sourceSize) / 2) * scale + (width - logoSize) / 2,
                targetY: (p.targetY - (height - sourceSize) / 2) * scale + (height - logoSize) / 2,
                // Recalculate start positions based on new targets if needed, 
                // but the original logic uses targetX/Y for spiral, so we just need to update targets.
                // Actually, generateParticlesFromCanvas uses 'width' and 'height' from closure to center things.
                // Let's refactor generateParticlesFromCanvas to be simpler or just map here.
            }));

            // Re-center logic:
            // The generateParticlesFromCanvas created particles centered on the screen based on 'sourceSize'.
            // We need to scale them to 'logoSize'.

            const finalParticles = generated.map(p => {
                // p.targetX is currently centered for a screen of 'width'x'height' but using 'sourceSize' box.
                // We want to scale the relative position from center.
                const relX = p.targetX - centerX;
                const relY = p.targetY - centerY;

                const scaledRelX = relX * scale;
                const scaledRelY = relY * scale;

                return {
                    ...p,
                    targetX: centerX + scaledRelX,
                    targetY: centerY + scaledRelY,
                    // Reset start position to be far out
                    x: centerX + Math.cos(Math.atan2(relY, relX) + Math.PI * 5) * (Math.sqrt(relX * relX + relY * relY) + Math.max(width, height)),
                    y: centerY + Math.sin(Math.atan2(relY, relX) + Math.PI * 5) * (Math.sqrt(relX * relX + relY * relY) + Math.max(width, height))
                };
            });

            particles = finalParticles;
            console.log(`Animation starting with ${particles.length} particles.`);

            // Explosion timer
            setTimeout(() => {
                exploding = true;
                setTimeout(() => setStage('done'), 1500);
            }, 2000); // Hold for 2 seconds

            animate();
        };

        function animate() {
            if (!ctx) return;
            // Use white trail or clear rect
            ctx!.clearRect(0, 0, width, height);

            if (exploding) {
                explosionFrame++;
                const opacity = Math.max(0, 1 - explosionFrame / 60);

                particles.forEach(p => {
                    // Explode outward logic
                    const dx = p.x - centerX;
                    const dy = p.y - centerY;
                    const angle = Math.atan2(dy, dx);

                    // Add some noise to explosion
                    p.vx = Math.cos(angle) * 15 + (Math.random() - 0.5) * 5;
                    p.vy = Math.sin(angle) * 15 + (Math.random() - 0.5) * 5;

                    p.x += p.vx;
                    p.y += p.vy;

                    ctx!.globalAlpha = opacity;
                    ctx!.fillStyle = p.color;
                    ctx!.fillRect(p.x, p.y, 1.5, 1.5);
                });

                if (opacity > 0) {
                    animationId = requestAnimationFrame(animate);
                }
            } else {
                // Spiral Convergence Logic
                let arrivedCount = 0;

                particles.forEach(p => {
                    const dx = p.targetX - p.x;
                    const dy = p.targetY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 2) {
                        const currentAngle = Math.atan2(p.y - centerY, p.x - centerX);
                        const currentDist = Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2));
                        const targetDist = Math.sqrt(Math.pow(p.targetX - centerX, 2) + Math.pow(p.targetY - centerY, 2));

                        // Spiral inwards
                        const newAngle = currentAngle - 0.08; // Rotation speed
                        // Smoothly approach target distance
                        const newDist = currentDist - (currentDist - targetDist) * 0.05 - 2;

                        const spiralX = centerX + Math.cos(newAngle) * Math.max(newDist, targetDist);
                        const spiralY = centerY + Math.sin(newAngle) * Math.max(newDist, targetDist);

                        // Lerp towards spiral path + pull to target
                        p.x += (spiralX - p.x) * 0.3;
                        p.y += (spiralY - p.y) * 0.3;

                        // Final snap pull
                        p.x += (p.targetX - p.x) * 0.05;
                        p.y += (p.targetY - p.y) * 0.05;
                    } else {
                        p.x = p.targetX;
                        p.y = p.targetY;
                        arrivedCount++;
                    }

                    ctx!.globalAlpha = 1;
                    ctx!.fillStyle = p.color;
                    // Increased particle size for better visibility
                    ctx!.fillRect(p.x, p.y, 3, 3);
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