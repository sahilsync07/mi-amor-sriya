import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import './FloatingReasons.css';

const reasons = [
    { id: 1, text: "Pure Heart", icon: "💎" },
    { id: 2, text: "Incredible Kindness", icon: "🌸" },
    { id: 3, text: "Always Friendly", icon: "✨" },
    { id: 4, text: "Empathetic Support", icon: "🤝" },
    { id: 5, text: "Exceptional at Work", icon: "🏆" },
    { id: 6, text: "My Smarty", icon: "🧠" },
    { id: 7, text: "Natural Beauty", icon: "🦋" },
    { id: 8, text: "Cleanest Soul", icon: "☁️" }
];

const FloatingReasons = () => {
    const [activeReason, setActiveReason] = useState(null);

    return (
        <div className="floating-reasons-container">
            <h2 className="reasons-title">Infinite Reasons to Love You</h2>
            <p className="reasons-subtitle">Tap the falling hearts to catch a reason!</p>

            <div className="hearts-area">
                {reasons.map((reason, index) => (
                    <motion.div
                        key={reason.id}
                        className="floating-heart"
                        initial={{
                            y: -100,
                            x: `${Math.random() * 90 + 5}%`,
                            scale: 0.8,
                            opacity: 0
                        }}
                        animate={{
                            y: '110vh',
                            x: [`${Math.random() * 90 + 5}%`, `${Math.random() * 90 + 5}%`],
                            rotate: [0, 360],
                            opacity: 1
                        }}
                        transition={{
                            duration: 8 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 1.5,
                            repeatDelay: Math.random() * 2
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
                            <button className="close-reason" onClick={() => setActiveReason(null)}>Keep Catching</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingReasons;
