import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Camera, Heart, Star, Gift } from 'lucide-react';
import './MemoryLaneNew.css';

function TiltCard({ children, index }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="memory-card-tilt"
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={handleMouseLeave}
            animate={{
                scale: isHovered ? 1.05 : 1,
            }}
            transition={{
                scale: { duration: 0.3 }
            }}
        >
            {children}
            <div
                className="card-shine"
                style={{
                    background: `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.2), transparent)`,
                }}
            />
        </motion.div>
    );
}

export default function MemoryLaneNew() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const memories = [
        {
            id: 1,
            title: 'Hanuman Mandir Road Rides',
            description: 'Wind in our hair, winding roads of Raigad, and you holding me tight',
            icon: Heart,
            color: '#f43f5e'
        },
        {
            id: 2,
            title: 'Nangloi Auto Adventures',
            description: 'Those bumpy rides through Delhi streets, your laughter echoing',
            icon: Star,
            color: '#fbbf24'
        },
        {
            id: 3,
            title: 'Udaipur Sunset Magic',
            description: 'Lake Pichola shimmering, Sajjangarh Fort watching over us',
            icon: Camera,
            color: '#ec4899'
        },
        {
            id: 4,
            title: 'Taurus Canteen Chronicles',
            description: 'Shopping together, stealing glances between the aisles',
            icon: Gift,
            color: '#a855f7'
        }
    ];

    return (
        <section ref={containerRef} className="memory-lane-new">
            {/* Clip-path reveal container */}
            <motion.div
                className="memory-reveal-container"
                initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
                animate={isInView ? {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                } : {}}
                transition={{
                    duration: 1.2,
                    ease: [0.76, 0, 0.24, 1]
                }}
            >
                <div className="memory-content-wrapper">
                    <motion.h2
                        className="memory-title-new"
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Our Story
                        <motion.span
                            className="title-underline"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        />
                    </motion.h2>

                    <div className="memory-grid-new">
                        {memories.map((memory, index) => (
                            <motion.div
                                key={memory.id}
                                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                                animate={isInView ? {
                                    opacity: 1,
                                    y: 0,
                                    rotateX: 0
                                } : {}}
                                transition={{
                                    delay: 0.7 + index * 0.15,
                                    duration: 0.8,
                                    type: 'spring',
                                    stiffness: 100
                                }}
                            >
                                <TiltCard index={index}>
                                    <div className="memory-card-inner glass">
                                        <div
                                            className="memory-icon-bg"
                                            style={{
                                                background: `linear-gradient(135deg, ${memory.color}40, ${memory.color}10)`
                                            }}
                                        >
                                            <memory.icon
                                                className="memory-icon-new"
                                                size={36}
                                                style={{ color: memory.color }}
                                            />
                                        </div>

                                        <div className="memory-text">
                                            <h3>{memory.title}</h3>
                                            <p>{memory.description}</p>
                                        </div>

                                        {/* Decorative corner */}
                                        <div className="card-corner" style={{ borderColor: memory.color }} />
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        className="memory-quote"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1.5, duration: 1 }}
                    >
                        "In your presence, every moment becomes a cherished memory"
                    </motion.p>
                </div>
            </motion.div>
        </section>
    );
}
