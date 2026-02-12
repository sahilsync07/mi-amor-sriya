import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import './FooterNew.css';

export default function FooterNew() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });

    const handleBigLove = (e) => {
        // Massive Particle Explosion centered on button
        const rect = e.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Create a custom explosion using DOM elements or canvas-confetti if installed
        // Since we don't have canvas-confetti installed, we'll use a visual trick
        // Actually, we can just create a lot of floating hearts

        // Let's launch a "fireworks" effect manually
        createFirework(e.clientX, e.clientY);

        // Haptic feedback if available
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    };

    const createFirework = (x, y) => {
        const colors = ['#f43f5e', '#ec4899', '#a855f7', '#ffffff'];
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'burst-particle';
            particle.innerHTML = '♥';
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.fontSize = Math.random() * 20 + 10 + 'px';
            particle.style.color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            document.body.appendChild(particle);

            // Animate
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 200 + 50;

            const destX = Math.cos(angle) * velocity;
            const destY = Math.sin(angle) * velocity;

            particle.animate([
                { transform: `translate(0, 0) scale(0)`, opacity: 1 },
                { transform: `translate(${destX}px, ${destY}px) scale(1)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                fill: 'forwards'
            });

            setTimeout(() => particle.remove(), 1500);
        }
    };

    return (
        <footer ref={containerRef} className="footer-new">
            <motion.div
                className="footer-content-new"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
            >
                <div className="outro-text">For us, always</div>

                <h2 className="cinema-title">Happy Valentine's Day</h2>
                <p className="cinema-subtitle">I love you, Sriya.</p>

                <div className="final-cta-container">
                    <motion.button
                        className="love-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBigLove}
                    >
                        Send Big Love ♥
                    </motion.button>
                </div>
            </motion.div>
        </footer>
    );
}
