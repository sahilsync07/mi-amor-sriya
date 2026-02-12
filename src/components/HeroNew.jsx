import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import './HeroNew.css';
import introPic from '../assets/photos/intro_pic.jpeg';
import ChaosText from './ChaosText';

export default function HeroNew({ girlfriendName = "Sriya" }) {
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load animation trigger
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax for image
    const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Fade out text

    return (
        <section className="hero-new" ref={containerRef}>
            {/* 1. Full Screen Hero Image with Ken Burns Effect */}
            <div className="hero-image-container">
                <motion.div
                    className="hero-image-wrapper"
                    style={{ y: y1 }}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                >
                    <img src={introPic} alt="Us" className="hero-bg-img" />
                    <div className="hero-vignette"></div>
                </motion.div>
            </div>

            {/* 2. Content at the Bottom (Lower Part) */}
            <motion.div
                className="hero-content-bottom"
                style={{ opacity }}
            >
                <div className="content-wrapper-bottom">
                    {/* Small Greeting - Slow Fade In */}
                    <motion.p
                        className="hero-greeting"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                    >
                        Welcome to our world
                    </motion.p>

                    {/* Main Name - Elegant Reveal */}
                    <motion.h1
                        className="hero-main-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
                    >
                        <ChaosText text={girlfriendName} />
                    </motion.h1>

                    {/* Divider Line */}
                    <motion.div
                        className="hero-divider"
                        initial={{ width: 0 }}
                        animate={{ width: '100px' }}
                        transition={{ delay: 2.5, duration: 1 }}
                    />

                    {/* Date/Subtitle */}
                    <motion.p
                        className="hero-date"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 3, duration: 1 }}
                    >
                        Since January 9, 2019
                    </motion.p>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="hero-scroll-trigger"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5, duration: 1 }}
                >
                    <div className="mouse"></div>
                </motion.div>
            </motion.div>
        </section>
    );
}
