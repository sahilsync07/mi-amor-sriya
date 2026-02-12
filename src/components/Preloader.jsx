import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Preloader.css';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => onComplete(), 800);
                    }, 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.2,
                        filter: 'blur(20px)'
                    }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    {/* Animated gradient background */}
                    <div className="preloader-bg" />

                    {/* Beating heart animation */}
                    <motion.div
                        className="heart-container"
                        animate={{
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        <svg viewBox="0 0 100 100" className="heart-svg">
                            <motion.path
                                d="M50,85 C50,85 15,60 15,40 C15,25 25,20 32,20 C40,20 45,25 50,35 C55,25 60,20 68,20 C75,20 85,25 85,40 C85,60 50,85 50,85 Z"
                                fill="url(#heartGradient)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 2,
                                    ease: 'easeInOut'
                                }}
                            />
                            <defs>
                                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f43f5e" />
                                    <stop offset="50%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Pulse rings */}
                        <motion.div
                            className="pulse-ring"
                            animate={{
                                scale: [1, 2.5],
                                opacity: [0.6, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut'
                            }}
                        />
                        <motion.div
                            className="pulse-ring"
                            animate={{
                                scale: [1, 2.5],
                                opacity: [0.6, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeOut',
                                delay: 0.5
                            }}
                        />
                    </motion.div>

                    {/* Loading text */}
                    <motion.div
                        className="loading-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2>Loading Love...</h2>
                        <div className="progress-bar">
                            <motion.div
                                className="progress-fill"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                        </div>
                        <p className="progress-percent">{Math.floor(Math.min(progress, 100))}%</p>
                    </motion.div>

                    {/* Floating particles */}
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: 'easeInOut'
                            }}
                        >
                            ♥
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
