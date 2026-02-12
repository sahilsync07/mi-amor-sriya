import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRef } from 'react';
import './IntroSection.css';
import introPic from '../assets/photos/intro_pic.jpeg';

export default function IntroSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <section ref={sectionRef} className="intro-section-immersive">
            <motion.div
                className="immersive-image-container"
                style={{ scale, opacity }}
            >
                <div className="image-wrapper">
                    <img src={introPic} alt="Us" className="immersive-img" />
                    <div className="vignette-overlay"></div>
                </div>
            </motion.div>

            <motion.div
                className="immersive-content"
                style={{ y }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Heart className="floating-heart" color="#fff" fill="#f43f5e" size={24} />
                <h2>My Favorite Love Story</h2>
                <div className="date-line">Since 2019</div>
            </motion.div>
        </section>
    );
}
