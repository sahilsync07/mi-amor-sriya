import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import './HeroNew.css';
import introPic from '../assets/photos/intro_pic.jpeg';

export default function HeroNew({ girlfriendName = "Sriya" }) {
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const nicknames = ["Sriya", "Sweety", "Gula", "Bebu", "Nanu"];

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % nicknames.length;
            const fullText = nicknames[i];

            setDisplayText(isDeleting
                ? fullText.substring(0, displayText.length - 1)
                : fullText.substring(0, displayText.length + 1)
            );

            setTypingSpeed(isDeleting ? 100 : 150);

            if (!isDeleting && displayText === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, loopNum, typingSpeed]);

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
                        transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
                    >
                        {displayText}<span className="typewriter-cursor">|</span>
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
                    transition={{ delay: 2, duration: 1 }}
                >
                    <div className="scroll-chest">
                        <Heart className="scroll-heart-icon" size={20} />
                        <div className="scroll-arrow"></div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
