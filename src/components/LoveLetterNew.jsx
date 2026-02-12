import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Lock, Fingerprint, Heart, Unlock } from 'lucide-react';
import './LoveLetterNew.css';

export default function LoveLetterNew({ girlfriendName = "Sriya" }) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [showContent, setShowContent] = useState(false);

    // Biometric Scan Logic
    const handleScanStart = () => {
        if (isUnlocked) return;
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            setScanProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsUnlocked(true);
                setTimeout(() => setShowContent(true), 800);
            }
        }, 30);
        window.scanInterval = interval;
    };

    const handleScanEnd = () => {
        if (isUnlocked) return;
        if (window.scanInterval) clearInterval(window.scanInterval);
        setScanProgress(0);
    };

    return (
        <section ref={containerRef} className="love-letter-section">
            <AnimatePresence mode="wait">
                {!showContent ? (
                    /* --- LOCKED STATE: Biometric Scanner --- */
                    <motion.div
                        key="locked"
                        className="vault-container"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        exit={{ scale: 1.5, opacity: 0, filter: 'blur(20px)' }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="vault-glass-panel">
                            <div className="vault-header">
                                <Lock className="vault-icon" size={24} />
                                <h3>SECURE ARCHIVE DETECTED</h3>
                                <p>Biometric Authentication Required</p>
                            </div>

                            <div
                                className="scanner-area"
                                onMouseDown={handleScanStart}
                                onMouseUp={handleScanEnd}
                                onMouseLeave={handleScanEnd}
                                onTouchStart={handleScanStart}
                                onTouchEnd={handleScanEnd}
                            >
                                <div className="fingerprint-ring">
                                    <svg viewBox="0 0 100 100" className="progress-ring">
                                        <circle cx="50" cy="50" r="45" pathLength="100" className="bg" />
                                        <motion.circle
                                            cx="50" cy="50" r="45"
                                            pathLength="100"
                                            className="fg"
                                            style={{ pathLength: scanProgress }}
                                        />
                                    </svg>
                                    <Fingerprint
                                        size={60}
                                        className={`fingerprint-icon ${scanProgress > 0 ? 'scanning' : ''}`}
                                        color={isUnlocked ? '#10b981' : '#f43f5e'}
                                    />
                                </div>
                                <p className="scanner-instruction">
                                    {isUnlocked ? "ACCESS GRANTED" : "HOLD TO SCAN"}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* --- UNLOCKED STATE: Holographic Message --- */
                    <motion.div
                        key="unlocked"
                        className="hologram-container"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="hologram-projection">
                            <div className="hologram-header">
                                <Unlock size={20} color="#10b981" />
                                <span>FILE: LOVE_V2026.enc</span>
                                <div className="hologram-line"></div>
                            </div>

                            <div className="scrolling-message-content">
                                <h2>My Dearest {girlfriendName},</h2>
                                <p>
                                    Since January 9th, 2019, my world has been rewritten.
                                    Looking back at all our polaroids—from the quiet steps of <strong>Hanuman Mandir</strong> to the sunset views at <strong>Sajjangarh</strong>—I realize one thing:
                                </p>
                                <p className="highlight-text">
                                    You are my favorite adventure.
                                </p>
                                <p>
                                    Whether we are navigating the busy streets of Delhi or just sipping coffee in a treehouse,
                                    every moment becomes a core memory because you are there.
                                    You are my partner in crime, my "Sweety", and my home.
                                </p>
                                <p>
                                    Here's to a lifetime of late-night drives, endless laughter, and a love that grows stronger every single day.
                                </p>
                                <div className="signature-block">
                                    <p>Forever Yours,</p>
                                    <h3>Sahil</h3>
                                </div>
                            </div>

                            <div className="hologram-footer">
                                <Heart size={16} fill="#f43f5e" />
                                <span>END OF FILE</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
