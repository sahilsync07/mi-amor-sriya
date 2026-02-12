import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
    const [hearts, setHearts] = useState([]);

    const createHeart = () => {
        const id = Math.random();
        const left = Math.random() * 100;
        const duration = 3 + Math.random() * 2;
        const size = 20 + Math.random() * 30;

        return { id, left, duration, size };
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setHearts(prev => {
                const newHearts = [...prev, createHeart()];
                // Keep only last 10 hearts
                return newHearts.slice(-10);
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="footer-section">
            <div className="floating-hearts-container">
                {hearts.map(heart => (
                    <motion.div
                        key={heart.id}
                        className="floating-heart"
                        style={{
                            left: `${heart.left}%`,
                            fontSize: `${heart.size}px`
                        }}
                        initial={{ bottom: -50, opacity: 0 }}
                        animate={{
                            bottom: '120%',
                            opacity: [0, 1, 1, 0],
                            x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20]
                        }}
                        transition={{
                            duration: heart.duration,
                            ease: 'easeOut'
                        }}
                        onAnimationComplete={() => {
                            setHearts(prev => prev.filter(h => h.id !== heart.id));
                        }}
                    >
                        ♥
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="footer-content"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="footer-sparkles"
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    <Sparkles size={40} className="sparkle-icon" />
                </motion.div>

                <h3 className="footer-heading">
                    Made with Love
                </h3>

                <p className="footer-text">
                    Happy Valentine's Day 2026
                </p>

                <motion.div
                    className="footer-heart"
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    <Heart size={30} fill="currentColor" />
                </motion.div>

                <p className="footer-date">
                    February 14, 2026
                </p>
            </motion.div>
        </footer>
    );
}
