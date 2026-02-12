import { useRef, useLayoutEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Star, Camera, Gift, Coffee, MapPin, TreePine, Moon } from 'lucide-react';
import './Timeline.css';

// Import all photos from the assets/photos directory
import introPic from '../assets/photos/intro_pic.jpeg'; // Intro is handled in IntroSection, but good to have handy
import hanumanMandir from '../assets/photos/hanuman_mandir_near_temple.png';
import hanumanStairs from '../assets/photos/hanuman_madnir_behind_stairs.png';
import hanumanNight from '../assets/photos/night_hanuman_temple.png';
import forestScooty from '../assets/photos/forest_park_Area_on_scooty.png';
import forestCoffee from '../assets/photos/forest_park_tree_house_coffee_table.png';
import jhulaBridge from '../assets/photos/jhula_bridge.png';
import delhiImage from '../assets/photos/delhi-image.jpg';
import udaipurPalace from '../assets/photos/udaipur_palace.png';
import sajjangarh from '../assets/photos/sajjangarh_palace.png';
import sajjangarhZoo from '../assets/photos/sajjangarh_zoo.png';
import fatehSagar from '../assets/photos/fateh_sagar_lake.png';
import image1 from '../assets/photos/image-1.jpg'; // Assuming this is Taurus/general

const memories = [
    {
        id: 1,
        date: "Devotion",
        title: 'Hanuman Mandir Moments',
        description: 'Peaceful days near the temple, climbing those stairs with you.',
        icon: Heart,
        image: hanumanMandir,
        rotate: -3
    },
    {
        id: 2,
        date: "Serenity",
        title: 'Night Prayers',
        description: 'The temple lights at night, quiet moments of gratitude.',
        icon: Moon,
        image: hanumanNight,
        rotate: 2
    },
    {
        id: 3,
        date: "Adventure",
        title: 'Forest Park Scooty Rides',
        description: 'Wind in our faces, exploring the green paths together.',
        icon: TreePine, // Using generic icon if TreePine implies forest
        image: forestScooty,
        rotate: -4
    },
    {
        id: 4,
        date: "Coffee Dates",
        title: 'Tree House Conversations',
        description: 'Sipping coffee at the tree house, lost in our own world.',
        icon: Coffee,
        image: forestCoffee,
        rotate: 3
    },
    {
        id: 5,
        date: "Crossing",
        title: 'Jhula Bridge Walk',
        description: 'Walking hand in hand across the suspension bridge.',
        icon: MapPin,
        image: jhulaBridge,
        rotate: -2
    },
    {
        id: 6,
        date: "City Lights",
        title: 'Delhi Auto Adventures',
        description: 'Navigating the busy streets of Nangloi, endless laughter.',
        icon: Star,
        image: delhiImage,
        rotate: 4
    },
    {
        id: 7,
        date: "Royalty",
        title: 'Udaipur City Palace',
        description: 'Walking through history, feeling like royalty with you.',
        icon: Camera,
        image: udaipurPalace,
        rotate: -3
    },
    {
        id: 8,
        date: "Sunset",
        title: 'Sajjangarh Fort Views',
        description: 'Watching the sun dip below the horizon from the Monsoon Palace.',
        icon: MapPin,
        image: sajjangarh,
        rotate: 2
    },
    {
        id: 9,
        date: "Lakeside",
        title: 'Fateh Sagar Breeze',
        description: 'The calm waters of Fateh Sagar, reflecting our love.',
        icon: Heart,
        image: fatehSagar,
        rotate: -2
    },
    {
        id: 10,
        date: "Together",
        title: 'Everyday Joy',
        description: 'Just being together makes every moment special.',
        icon: Gift,
        image: image1,
        rotate: 3
    }
];

export default function Timeline() {
    const containerRef = useRef(null);
    const [pathHeight, setPathHeight] = useState(1000);

    // Calculate path height ensuring it covers all items
    useLayoutEffect(() => {
        if (containerRef.current) {
            setPathHeight(containerRef.current.offsetHeight);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 20%", "end 80%"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 40,
        restDelta: 0.001
    });

    // Dynamic path generation
    const generatePath = () => {
        const itemSpacing = 550; // Tuned for better alignment
        const startY = 0;
        let d = `M 50 ${startY}`;

        memories.forEach((_, i) => {
            const currentY = i * itemSpacing;
            const midY = currentY + (itemSpacing / 2);
            const targetY = (i + 1) * itemSpacing;
            const side = i % 2 === 0 ? 90 : 10;
            d += ` Q ${side} ${midY} 50 ${targetY}`;
        });
        return d;
    };

    const pathData = generatePath();
    const butterflyProgress = useTransform(pathLength, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="timeline-section">
            <h2 className="timeline-title">Our Beautiful Journey</h2>

            <div className="timeline-container">
                {/* SVG Path - Winding curve */}
                <svg
                    className="timeline-svg"
                    viewBox={`0 0 100 ${memories.length * 550}`}
                    preserveAspectRatio="none"
                    style={{ height: `${memories.length * 550}px` }}
                >
                    {/* Background path (faint) */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="rgba(255, 182, 193, 0.3)"
                        strokeWidth="3"
                    />

                    {/* Animated path filling up */}
                    <motion.path
                        d={pathData}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        style={{ pathLength }}
                    />

                    {/* Flying Butterfly */}
                    <motion.g
                        style={{
                            offsetPath: `path("${pathData}")`,
                            offsetDistance: butterflyProgress,
                            offsetRotate: 'auto'
                        }}
                    >
                        <motion.g
                            animate={{ scaleX: [1, 0.4, 1] }}
                            transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <text
                                x="-15"
                                y="10"
                                fontSize="30"
                                style={{
                                    filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))',
                                    userSelect: 'none'
                                }}
                            >
                                🦋
                            </text>
                        </motion.g>
                    </motion.g>

                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f43f5e" />
                            <stop offset="50%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="timeline-items">
                    {memories.map((memory, index) => (
                        <TimelineCard
                            key={memory.id}
                            memory={memory}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TimelineCard({ memory, index }) {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            className={`timeline-row ${isLeft ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="timeline-date-marker">
                <span className="date-badge">{memory.date}</span>
            </div>

            <div
                className="polaroid-card"
                style={{ transform: `rotate(${memory.rotate}deg)` }}
            >
                <div className="polaroid-inner">
                    <div className="polaroid-img-container">
                        <img
                            src={memory.image}
                            alt={memory.title}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.classList.add('fallback');
                            }}
                        />
                        <div className="shine-overlay"></div>
                    </div>
                    <div className="polaroid-caption">
                        <h3>{memory.title}</h3>
                        <p>{memory.description}</p>
                        <memory.icon className="memory-icon-small" size={16} color="#fb7185" />
                    </div>
                </div>
                {/* Pin or Tape */}
                <div className="pin-decoration"></div>
            </div>
        </motion.div>
    );
}
