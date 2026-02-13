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
import laxminarayanTemple from '../assets/photos/laxminaryan-temple-therubali-rayagada.jpeg';
import rayagadaViewpoint from '../assets/photos/rayagada-viewpoint-bike-rides.jpeg';
import delhiCyberhub from '../assets/photos/delhi-cyberhub-gurgaon.jpeg';
import delhiImage from '../assets/photos/delhi-image.jpg';
import udaipurPalace from '../assets/photos/udaipur_palace.png';
import lakePichola from '../assets/photos/lake-pichola-udaipur.jpeg';
import ambraiGhat from '../assets/photos/ambrai-ghat-night-vibes.jpeg';
import sajjangarh from '../assets/photos/sajjangarh_palace.png';
import sajjangarhZoo from '../assets/photos/sajjangarh-zoo.jpeg';
import fatehSagar from '../assets/photos/fateh_sagar_lake.png';
import karniMata from '../assets/photos/karni-mata-temple.jpeg';
import promenadeMovie from '../assets/photos/movie-time-promanade-mall.jpeg';
import droppingBack from '../assets/photos/dropping-you-back.jpeg';
import collegeLife from '../assets/photos/fun-admist-chaotic-college-life.jpeg';
import videoCall from '../assets/photos/video-call.jpeg';
import kindergartenMeet from '../assets/photos/first-meet-in-lower-kindergarden.jpeg';
import commissioningCeremony from '../assets/photos/proud-moment-of-you-lieutanent-commsioning-ceremony.jpeg';

const memories = [
    {
        id: 1,
        date: "The Beginning",
        title: 'Lower Kindergarten',
        description: 'Where it all started—our very first meeting as kids in LKG.',
        icon: Heart,
        image: kindergartenMeet,
        rotate: -2
    },
    {
        id: 2,
        date: "College Days",
        title: 'Fun Admist Chaos',
        description: 'SCB Cuttack to VIT Vellore—miles apart but forever together through photos and dreams.',
        icon: Heart,
        image: collegeLife,
        rotate: 3
    },
    {
        id: 3,
        date: "Long Distance",
        title: 'Screen-to-Screen',
        description: 'Before we ever met in person, we had a world of fun through our video calls.',
        icon: Heart,
        image: videoCall,
        rotate: -2
    },
    {
        id: 4,
        date: "Devotion",
        title: 'Hanuman Mandir Moments',
        description: 'Peaceful days near the temple, climbing those stairs with you.',
        icon: Heart,
        image: hanumanMandir,
        rotate: -3
    },
    {
        id: 5,
        date: "Serenity",
        title: 'Night Prayers',
        description: 'The temple lights at night, quiet moments of gratitude.',
        icon: Moon,
        image: hanumanNight,
        rotate: 2
    },
    {
        id: 6,
        date: "Adventure",
        title: 'Forest Park Scooty Rides',
        description: 'Wind in our faces, exploring the green paths together.',
        icon: TreePine,
        image: forestScooty,
        rotate: -4
    },
    {
        id: 7,
        date: "Coffee Dates",
        title: 'Tree House Conversations',
        description: 'Sipping coffee at the tree house, lost in our own world.',
        icon: Coffee,
        image: forestCoffee,
        rotate: 3
    },
    {
        id: 8,
        date: "Crossing",
        title: 'Jhula Bridge Walk',
        description: 'Walking hand in hand across the suspension bridge.',
        icon: MapPin,
        image: jhulaBridge,
        rotate: -2
    },
    {
        id: 9,
        date: "Divine",
        title: 'Laxminarayan Temple',
        description: 'Exploring the spiritual beauty of Therubali together.',
        icon: Heart,
        image: laxminarayanTemple,
        rotate: 3
    },
    {
        id: 10,
        date: "Freedom",
        title: 'Rayagada Viewpoint',
        description: 'Bike rides to the top, where the whole world felt ours.',
        icon: TreePine,
        image: rayagadaViewpoint,
        rotate: -2
    },
    {
        id: 11,
        date: "Proud Moment",
        title: 'Lieutenant Commissioning',
        description: 'A day of immense pride as you were commissioned as a Lieutenant. The start of an honorable journey.',
        icon: Star,
        image: commissioningCeremony,
        rotate: -3
    },
    {
        id: 12,
        date: "Farewell Delhi",
        title: 'Final Moments',
        description: 'Leaving the city permanently to build my career, carrying our precious memories with me.',
        icon: Star,
        image: delhiImage,
        rotate: 4
    },
    {
        id: 13,
        date: "Modern",
        title: 'Cyberhub Gurgaon',
        description: 'Vibrant nights and futuristic vibes in the heart of the city.',
        icon: Star,
        image: delhiCyberhub,
        rotate: -3
    },
    {
        id: 14,
        date: "Royalty",
        title: 'Udaipur City Palace',
        description: 'Walking through history, feeling like royalty with you.',
        icon: Camera,
        image: udaipurPalace,
        rotate: -3
    },
    {
        id: 15,
        date: "Romance",
        title: 'Lake Pichola',
        description: 'A magical boat ride as the sun sets over the water.',
        icon: Heart,
        image: lakePichola,
        rotate: 2
    },
    {
        id: 16,
        date: "Night Vibes",
        title: 'Ambrai Ghat',
        description: 'The golden glow of the palace reflecting in the lake at night.',
        icon: Moon,
        image: ambraiGhat,
        rotate: -3
    },
    {
        id: 17,
        date: "Wildlife",
        title: 'Sajjangarh Zoo',
        description: 'A walk through the wild, seeing the animals and enjoying the nature.',
        icon: TreePine,
        image: sajjangarhZoo,
        rotate: 3
    },
    {
        id: 18,
        date: "Sunset",
        title: 'Sajjangarh Fort Views',
        description: 'Watching the sun dip below the horizon from the Monsoon Palace.',
        icon: MapPin,
        image: sajjangarh,
        rotate: 2
    },
    {
        id: 19,
        date: "Lakeside",
        title: 'Fateh Sagar Breeze',
        description: 'The calm waters of Fateh Sagar, reflecting our love.',
        icon: Heart,
        image: fatehSagar,
        rotate: -2
    },
    {
        id: 20,
        date: "Spiritual",
        title: 'Karni Mata Temple',
        description: 'Seeking blessings together at the beautiful hilltop temple.',
        icon: Camera,
        image: karniMata,
        rotate: 3
    },
    {
        id: 21,
        date: "Bittersweet",
        title: 'Dropping You Back',
        description: 'After a full day of fun, the chaotic evening at MNS officers mess where you didn\'t want to leave.',
        icon: Moon,
        image: droppingBack,
        rotate: -2
    },
    {
        id: 22,
        date: "Movie Night",
        title: 'Promenade Mall',
        description: 'Cozy moments and movie magic at the Promenade Mall.',
        icon: Camera,
        image: promenadeMovie,
        rotate: -3
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

    // Sync both path drawing and butterfly to exactly 0-95%
    // This ensures the line doesn't "outrun" the butterfly
    const drawProgress = useTransform(pathLength, [0, 1], [0, 0.95]);
    const butterflyProgress = useTransform(pathLength, [0, 1], ["0%", "95%"]);

    return (
        <section ref={containerRef} className="timeline-section" style={{ position: 'relative' }}>
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
                        style={{ pathLength: drawProgress }}
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
                            // Flapping effect: Scale Y to look like wings opening/closing
                            animate={{ scaleY: [1, 0.4, 1] }}
                            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <text
                                x="-15"
                                y="10"
                                fontSize="30"
                                style={{
                                    filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))',
                                    userSelect: 'none',
                                    // Rotate 90deg to face forward along path
                                    transform: 'rotate(90deg)',
                                    display: 'inline-block',
                                    transformBox: 'fill-box',
                                    transformOrigin: 'center'
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
            viewport={{ once: true, amount: 0.25, margin: "0px" }}
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
