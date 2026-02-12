import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Gift, Camera } from 'lucide-react';
import { useRef } from 'react';
import './MemoryLane.css';

export default function MemoryLane() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

    // Placeholder memories - user can add photos later
    const memories = [
        {
            id: 1,
            title: 'Our First Date',
            description: 'The moment I knew you were special',
            icon: Camera
        },
        {
            id: 2,
            title: 'Unforgettable Moments',
            description: 'Every second with you is magical',
            icon: Sparkles
        },
        {
            id: 3,
            title: 'Our Journey',
            description: 'Together, creating beautiful memories',
            icon: Gift
        }
    ];

    return (
        <section ref={sectionRef} className="memory-lane-section section">
            <motion.div
                className="memory-container"
                style={{ opacity, scale }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="memory-title"
                >
                    Our Beautiful
                    <br />
                    Moments
                </motion.h2>

                <div className="memory-grid">
                    {memories.map((memory, index) => (
                        <motion.div
                            key={memory.id}
                            className="memory-card glass"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2,
                                type: 'spring',
                                stiffness: 100
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="memory-icon-wrapper">
                                <memory.icon className="memory-icon" size={40} />
                            </div>
                            <div className="memory-content">
                                <h3>{memory.title}</h3>
                                <p>{memory.description}</p>
                            </div>
                            <div className="memory-overlay"></div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="memory-note"
                >
                    Each memory with you is a treasure I hold close to my heart
                </motion.p>
            </motion.div>
        </section>
    );
}
