import { useRef, useLayoutEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Star, Camera, Gift, Coffee, MapPin, TreePine, Moon } from 'lucide-react';
import './Timeline.css';

// Import all photos from the assets/photos directory
import introPic from '../assets/photos/intro_pic.jpeg';
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
        date: "First Meeting",
        title: 'Hanuman Mandir',
        description: 'That first nervous, beautiful meeting near the temple. A moment etched in time.',
        icon: Heart,
        image: hanumanMandir,
        rotate: 2
    },
    {
        id: 5,
        date: "Quiet Moments",
        title: 'Temple Stairs',
        description: 'Sitting behind the temple, just talking and letting the world fade away.',
        icon: Moon,
        image: hanumanStairs,
        rotate: -1
    },
    {
        id: 6,
        date: "Night Vibes",
        title: 'Evening Blessings',
        description: 'The temple at night, glowing with peace and our shared smiles.',
        icon: Star,
        image: hanumanNight,
        rotate: 3
    },
    {
        id: 7,
        date: "Adventure",
        title: 'Forest Park Scooty',
        description: 'Wind in our hair, exploring the forest park roads together.',
        icon: MapPin,
        image: forestScooty,
        rotate: -2
    },
    {
        id: 8,
        date: "Coffee Dates",
        title: 'Tree House Café',
        description: 'Sipping coffee, sharing stories, and laughing at the Tree House.',
        icon: Coffee,
        image: forestCoffee,
        rotate: 1
    },
    {
        id: 9,
        date: "Walks",
        title: 'Jhula Bridge',
        description: 'Walking across the bridge, hand in hand, over the flowing water.',
        icon: MapPin,
        image: jhulaBridge,
        rotate: -3
    },
    {
        id: 10,
        date: "Blessings",
        title: 'Laxminarayan Temple',
        description: 'Seeking blessings together at Therubali Rayagada.',
        icon: Star,
        image: laxminarayanTemple,
        rotate: 2
    },
    {
        id: 11,
        date: "Freedom",
        title: 'Rayagada Viewpoint',
        description: 'Bike rides to the top, where the whole world felt ours.',
        icon: TreePine,
        image: rayagadaViewpoint,
        rotate: -2
    },
    {
        id: 12,
        date: "Celebration",
        title: 'Delhi Cyberhub',
        description: 'Lights, music, and the vibrant energy of Gurgaon.',
        icon: Gift,
        image: delhiCyberhub,
        rotate: 3
    },
    {
        id: 13,
        date: "City Lights",
        title: 'Exploring Delhi',
        description: 'Wandering through the streets of Delhi, creating memories in every corner.',
        icon: MapPin,
        image: delhiImage,
        rotate: -1
    },
    {
        id: 14,
        date: "Royalty",
        title: 'Udaipur City Palace',
        description: 'Feeling like royalty amidst the grandeur of Udaipur.',
        icon: Star,
        image: udaipurPalace,
        rotate: 2
    },
    {
        id: 15,
        date: "Serenity",
        title: 'Lake Pichola',
        description: 'The calm waters reflecting the beauty of our time together.',
        icon: Moon,
        image: lakePichola,
        rotate: -2
    },
    {
        id: 16,
        date: "Magic",
        title: 'Ambrai Ghat',
        description: 'The City Palace lit up at night, creating a magical backdrop for us.',
        icon: Star,
        image: ambraiGhat,
        rotate: 3
    },
    {
        id: 17,
        date: "Heights",
        title: 'Sajjangarh Palace',
        description: 'On top of the world at the Monsoon Palace.',
        icon: MapPin,
        image: sajjangarh,
        rotate: -3
    },
    {
        id: 18,
        date: "Wild Side",
        title: 'Sajjangarh Zoo',
        description: 'A fun day out exploring the wildlife together.',
        icon: MapPin,
        image: sajjangarhZoo,
        rotate: 1
    },
    {
        id: 19,
        date: "Lakeside",
        title: 'Fateh Sagar Lake',
        description: 'Relaxing by the lake, watching the ripples and the sunset.',
        icon: Moon,
        image: fatehSagar,
        rotate: -2
    },
    {
        id: 20,
        date: "Devotion",
        title: 'Karni Mata Temple',
        description: 'A spiritual visit, finding peace and togetherness.',
        icon: Star,
        image: karniMata,
        rotate: 2
    },
    {
        id: 21,
        date: "Movie Date",
        title: 'Promenade Mall',
        description: 'Catching a movie and enjoying the mall vibes.',
        icon: Camera,
        image: promenadeMovie,
        rotate: -1
    },
    {
        id: 22,
        date: "Proud Moment",
        title: 'Lieutenant Commissioning',
        description: 'A day of immense pride as you were commissioned as a Lieutenant. The start of an honorable journey.',
        icon: Star,
        image: commissioningCeremony,
        rotate: -3
    },
    {
        id: 23,
        date: "Until Next Time",
        title: 'Dropping You Back',
        description: 'A bittersweet goodbye, but knowing we’d meet again soon.',
        icon: Heart,
        image: droppingBack,
        rotate: 1
    }
];

export default function Timeline() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Create a transformed motion value for the butterfly offset
    const butterflyProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const butterflyOffset = useTransform(butterflyProgress, [0, 1], ["2%", "98%"]);

    // We need a ref for the SVG path to get its length if needed, 
    // but for now we can just use a high enough viewBox height
    // or calculate it based on items. 
    // Let's estimate path height based on number of items * distance
    const pathHeight = memories.length * 400 + 200;

    // Generate curved path data
    // Reference: https://cubic-bezier.com/
    // A simple sine wave pattern down the center
    const generatePath = () => {
        let path = "M 50 0";
        for (let i = 0; i < memories.length; i++) {
            const y = (i + 1) * 400; // Vertical spacing
            const x = i % 2 === 0 ? 30 : 70; // Control points left/right
            // Cubic bezier curve: C x1 y1, x2 y2, x y
            // We want it to curve gently
            const prevY = i * 400;
            path += ` C 50 ${prevY + 200}, 50 ${y - 200}, 50 ${y}`;
        }
        path += ` L 50 ${pathHeight}`;
        return path;
    };

    const pathData = generatePath();

    return (
        <section className="timeline-section" ref={containerRef}>
            <div className="timeline-container">
                {/* Dashed Path SVG */}
                <svg
                    className="timeline-svg"
                    viewBox={`0 0 100 ${pathHeight}`}
                    preserveAspectRatio="none"
                >
                    <motion.path
                        d={pathData}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2" // Thicker line
                        strokeDasharray="5, 5" // Dashed line
                        style={{ pathLength }}
                    />

                    {/* Flying Butterfly */}
                    <motion.g
                        style={{
                            offsetPath: `path("${pathData}")`,
                            offsetDistance: butterflyOffset,
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
                                    userSelect: 'none',
                                    transform: 'rotate(90deg)',
                                    display: 'inline-block'
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
            viewport={{ once: true, amount: 0.3 }}
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
                            }}
                        />
                    </div>
                    <div className="polaroid-caption">
                        <h3>{memory.title}</h3>
                        <p>{memory.description}</p>
                    </div>
                    <div className="polaroid-icon">
                        <memory.icon size={20} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
