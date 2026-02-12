import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import './FallingHearts.css';

const reasons = [
    { id: 1, text: "Pure Heart", icon: "💎" },
    { id: 2, text: "Incredible Kindness", icon: "🌸" },
    { id: 3, text: "Always Friendly", icon: "✨" },
    { id: 4, text: "Empathetic Support", icon: "🤝" },
    { id: 5, text: "Professional Excellence", icon: "🏆" },
    { id: 6, text: "My Smarty", icon: "🧠" },
    { id: 7, text: "Natural Beauty", icon: "🦋" },
    { id: 8, text: "Cleanest Soul", icon: "☁️" },
    { id: 9, text: "Your Smile", icon: "💖" },
    { id: 10, text: "Your Laughter", icon: "🎵" }
];

const FallingHearts = () => {
    const [activeReason, setActiveReason] = useState(null);
    const [hearts, setHearts] = useState([]);

    // Generate random hearts for the rain effect
    useEffect(() => {
        const generateHearts = () => {
            const newHearts = Array.from({ length: 15 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100, // Random horizontal position
                delay: Math.random() * 5,  // Random delay
                duration: 5 + Math.random() * 5, // Random fall speed
                scale: 0.5 + Math.random() * 0.5, // Random size
                reason: reasons[i % reasons.length] // Assign a reason cyclically
            }));
            setHearts(newHearts);
        };

        generateHearts();
    }, []);

    return (
        <div className="falling-hearts-container">
            <h2 className="falling-title">Infinite Reasons to Love You</h2>
            <p className="falling-subtitle">Tap the falling hearts to catch a reason!</p>

            <div className="rain-area">
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="falling-heart"
                        style={{
                            left: `${heart.left}%`,
                            scale: heart.scale
                        }}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{
                            y: '100vh',
                            opacity: [0, 1, 1, 0],
                            rotate: [0, 45, -45, 0]
                        }}
                        transition={{
                            duration: heart.duration,
                            repeat: Infinity,
                            delay: heart.delay,
                            ease: "linear"
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveReason(heart.reason);
                        }}
                    >
                        <Heart size={32} fill="#ec4899" color="#ec4899" />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {activeReason && (
                    <motion.div
                        className="reason-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveReason(null)}
                    >
                        <motion.div
                            className="reason-card"
                            initial={{ scale: 0.5, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="reason-emoji">{activeReason.icon}</span>
                            <p className="reason-text">{activeReason.text}</p>
                            <button className="close-reason" onClick={() => setActiveReason(null)}>
                                Catch Another 💖
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FallingHearts;
