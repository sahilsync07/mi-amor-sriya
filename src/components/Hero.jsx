import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import './Hero.css';

export default function Hero({ girlfriendName = "My Love" }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.5
            }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    const heartVariants = {
        initial: { scale: 0, rotate: -180 },
        animate: {
            scale: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2
            }
        },
        hover: {
            scale: 1.2,
            rotate: [0, -10, 10, -10, 0],
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="hero-section">
            <motion.div
                className="hero-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="hero-icon">
                    <motion.div
                        variants={heartVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <Heart className="heart-icon glow" size={80} fill="currentColor" />
                    </motion.div>
                </motion.div>

                <motion.h1 variants={itemVariants} className="hero-title">
                    Happy Valentine's
                    <br />
                    Day
                </motion.h1>

                <motion.div variants={itemVariants} className="hero-subtitle glass">
                    <p>To {girlfriendName}</p>
                </motion.div>

                <motion.p variants={itemVariants} className="hero-tagline">
                    My heart beats only for you
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="scroll-indicator"
                    animate={{
                        y: [0, 15, 0],
                        opacity: [1, 0.5, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    <div className="scroll-arrow">↓</div>
                    <span>Scroll to explore</span>
                </motion.div>
            </motion.div>
        </section>
    );
}
