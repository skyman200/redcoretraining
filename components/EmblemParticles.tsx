'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    color: string;
    size: number;
    vx: number;
    vy: number;
    ease: number;
}

interface EmblemParticlesProps {
    className?: string;
}

export default function EmblemParticles({ className = '' }: EmblemParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = 0;
        let mouseY = 0;
        let isMouseOver = false;

        // Load image
        const image = new Image();
        image.src = '/logo-mark.jpg';
        image.onload = () => {
            initParticles();
            setIsLoaded(true);
            animate();
        };

        const initParticles = () => {
            particles = [];
            const width = canvas.width;
            const height = canvas.height;

            // Draw image to offscreen canvas to read pixel data
            const offscreen = document.createElement('canvas');
            offscreen.width = width;
            offscreen.height = height;
            const offCtx = offscreen.getContext('2d');
            if (!offCtx) return;

            // Calculate aspect ratio to fit image in canvas
            const scale = Math.min(width / image.width, height / image.height) * 0.6; // 60% of canvas size
            const w = image.width * scale;
            const h = image.height * scale;
            const x = (width - w) / 2;
            const y = (height - h) / 2;

            offCtx.drawImage(image, x, y, w, h);

            const imageData = offCtx.getImageData(0, 0, width, height).data;

            // Create particles from pixel data
            // Skip pixels for performance (density)
            const density = 4;

            for (let py = 0; py < height; py += density) {
                for (let px = 0; px < width; px += density) {
                    const index = (py * width + px) * 4;
                    const r = imageData[index];
                    const g = imageData[index + 1];
                    const b = imageData[index + 2];
                    const a = imageData[index + 3];

                    // If pixel is not white (it's part of the logo)
                    // Adjust threshold as needed based on the actual image
                    if (a > 128 && (r < 240 || g < 240 || b < 240)) {
                        particles.push({
                            x: Math.random() * width, // Start at random position
                            y: Math.random() * height,
                            originX: px,
                            originY: py,
                            color: `rgb(${r}, ${g}, ${b})`,
                            size: Math.random() * 1.5 + 0.5,
                            vx: 0,
                            vy: 0,
                            ease: Math.random() * 0.05 + 0.02 // Random easing for organic movement
                        });
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Calculate distance to origin
                const dx = p.originX - p.x;
                const dy = p.originY - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Mouse interaction
                let forceX = 0;
                let forceY = 0;

                if (isMouseOver) {
                    const mdx = mouseX - p.x;
                    const mdy = mouseY - p.y;
                    const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);
                    const repulsionRadius = 80;

                    if (mouseDistance < repulsionRadius) {
                        const force = (repulsionRadius - mouseDistance) / repulsionRadius;
                        const angle = Math.atan2(mdy, mdx);
                        forceX = -Math.cos(angle) * force * 5; // Repulsion strength
                        forceY = -Math.sin(angle) * force * 5;
                    }
                }

                // Physics update
                p.vx += forceX;
                p.vy += forceY;

                // Move towards origin
                p.x += (p.originX - p.x) * p.ease + p.vx * 0.1;
                p.y += (p.originY - p.y) * p.ease + p.vy * 0.1;

                // Damping
                p.vx *= 0.9;
                p.vy *= 0.9;

                // Draw particle
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                if (isLoaded) initParticles();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isMouseOver = true;
        };

        const handleMouseLeave = () => {
            isMouseOver = false;
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Initial resize
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isLoaded]);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full ${className}`}
        />
    );
}
