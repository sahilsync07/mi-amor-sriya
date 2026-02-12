import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './MarqueeBanner.css';

export default function MarqueeBanner() {
    const marqueeRef = useRef(null);

    const messages = [
        "I Love You Sweety",
        "Since Jan 9, 2019",
        "Forever Together",
        "My Sriya",
        "You & Me",
        "6 Years Strong",
        "Endless Adventures",
        "My Everything"
    ];

    // Duplicate messages for seamless loop
    const displayMessages = [...messages, ...messages, ...messages];

    return (
        <div className="marquee-section">
            <div className="marquee-container">
                <motion.div
                    ref={marqueeRef}
                    className="marquee-content"
                    animate={{
                        x: [0, -33.33 * messages.length + '%']
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {displayMessages.map((message, index) => (
                        <div key={index} className="marquee-item">
                            <span className="marquee-text">{message}</span>
                            <span className="marquee-heart">♥</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
