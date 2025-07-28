import React, { useEffect, useRef } from 'react';

const ThreeBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Ajustement responsive
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Configuration des étoiles
        const stars = [];
        const starCount = Math.min(1000, window.innerWidth * window.innerHeight / 300);
        const colors = ['#ffffff', '#9bb0ff', '#aabfff', '#cad7ff', '#f8f7ff', '#d4eaff'];

        // Création des étoiles
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2.5,
                speed: Math.random() * 0.05,
                opacity: Math.random() * 0.8 + 0.2,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        // Fonction d'animation
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Fond dégradé spatial
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width * 0.8
            );
            gradient.addColorStop(0, 'rgba(5, 5, 15, 0.8)');
            gradient.addColorStop(1, 'rgba(0, 0, 10, 0.9)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Dessin des étoiles
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${hexToRgb(star.color)}, ${star.opacity})`;
                ctx.fill();

                // Mouvement parallaxe
                star.x -= star.speed;
                if (star.x < 0) {
                    star.x = canvas.width;
                    star.y = Math.random() * canvas.height;
                }
            });

            // Effet de poussière galactique
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const centerX = canvas.width * (0.2 + Math.random() * 0.6);
                const centerY = canvas.height * (0.2 + Math.random() * 0.6);
                const radius = 50 + Math.random() * 200;
                const gradient = ctx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, radius
                );
                gradient.addColorStop(0, `rgba(100, 120, 255, ${0.02 + Math.random() * 0.03})`);
                gradient.addColorStop(1, 'rgba(5, 5, 15, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Fonction utilitaire pour convertir les couleurs
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default ThreeBackground;