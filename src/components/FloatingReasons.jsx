import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import './FloatingReasons.css';

const reasons = [
    { id: 1, text: "Pure Heart", icon: "💎" },
    { id: 2, text: "Incredible Kindess", icon: "🌸" },
    { id: 3, text: "Always Friendly", icon: "✨" },
    { id: 4, text: "Empathetic Support when I'm sad", icon: "🤝" },
    { id: 5, text: "Exceptional at Work", icon: "🏆" },
    { id: 6, text: "My Smarty", icon: "🧠" },
    { id: 7, text: "Natural Beauty", icon: "🦋" },
    { id: 8, text: "Cleanest Soul", icon: "☁️" }
];

const FloatingReasons = () => {
    const [activeReason, setActiveReason] = useState(null);

    return (
        <div className="floating-reasons-container">
            <h2 className="reasons-title">Catch My Love</h2>
            <p className="reasons-subtitle">Tap the hearts to see why you're special</p>

            <div className="hearts-area">
                {reasons.map((reason, index) => (
                    <motion.div
                        key={reason.id}
                        className="floating-heart"
                        initial={{
                            y: '110vh',
                            x: `${10 + (index * 12)}%`,
                            scale: 0.8
                        }}
                        animate={{
                            y: '-20vh',
                            x: `${10 + (index * 12) + (Math.sin(index) * 5)}%`,
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            duration: 10 + (index * 2),
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 1.5
                        }}
                        onClick={() => setActiveReason(reason)}
                    >
                        <Heart size={40} fill="#f43f5e" color="#f43f5e" />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {activeReason && (
                    <motion.div
                        className="reason-overlay"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={() => setActiveReason(null)}
                    >
                        <div className="reason-card">
                            <span className="reason-emoji">{activeReason.icon}</span>
                            <p className="reason-text">{activeReason.text}</p>
                            <button className="close-reason">Keep Catching</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingReasons;
