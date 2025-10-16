import React, { useEffect, useRef } from 'react';

const BackgroundEffects: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        handleResize();

        class Particle {
            x: number; y: number; baseRadius: number; radius: number;
            speedX: number; speedY: number; color: string; life: number; remainingLife: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseRadius = Math.random() * 2 + 1;
                this.radius = this.baseRadius;
                this.speedY = Math.random() * 0.5 + 0.1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.color = `rgba(220, 38, 38, ${Math.random() * 0.5 + 0.2})`;
                this.life = Math.random() * 200 + 100;
                this.remainingLife = this.life;
            }

            update() {
                this.remainingLife--;
                this.y += this.speedY;
                this.x += this.speedX;

                const dx = this.x - mouse.current.x;
                const dy = this.y - mouse.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 100;
                const force = (maxDistance - distance) / maxDistance;
                
                if (distance < maxDistance) {
                    this.x += forceDirectionX * force * 2.5;
                    this.y += forceDirectionY * force * 2.5;
                    this.radius = this.baseRadius + force * 5;
                } else if (this.radius > this.baseRadius) {
                    this.radius -= 0.1;
                }
                
                if (this.y > canvas.height || this.remainingLife <= 0) {
                    this.y = -this.radius;
                    this.x = Math.random() * canvas.width;
                    this.remainingLife = this.life;
                    this.radius = this.baseRadius;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.remainingLife / this.life;
                ctx.fill();
            }
        }
        
        const particles: Particle[] = [];
        const numParticles = 150;
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        let animationFrameId: number;
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} id="bg-canvas"></canvas>;
};

export default BackgroundEffects;