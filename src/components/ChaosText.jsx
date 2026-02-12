import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fonts = [
    'Abril Fatface',
    'Bangers',
    'Dancing Script',
    'Fredericka the Great',
    'Monoton',
    'Permanent Marker',
    'Press Start 2P',
    'Righteous',
    'Rubik Glitch',
    'Sacramento'
];

const colors = [
    '#ffffff', // White
    '#f43f5e', // Rose 500
    '#ec4899', // Pink 500
    '#d946ef', // Fuchsia 500
    '#a855f7', // Purple 500
    '#fb7185', // Rose 400
];

const ChaosChar = ({ char }) => {
    const [style, setStyle] = useState({
        fontFamily: fonts[0],
        color: colors[0],
        transform: 'rotate(0deg) scale(1)',
        fontWeight: 400
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStyle({
                fontFamily: `"${fonts[Math.floor(Math.random() * fonts.length)]}", sans-serif`,
                color: colors[Math.floor(Math.random() * colors.length)],
                transform: `rotate(${Math.random() * 10 - 5}deg) scale(${0.95 + Math.random() * 0.1})`, // Reduced scale variance
                fontWeight: Math.random() > 0.5 ? 700 : 400
            });
        }, 250 + Math.random() * 200); // Slower interval: 250-450ms

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.span
            style={{
                display: 'inline-block',
                fontFamily: style.fontFamily,
                color: style.color,
                transform: style.transform,
                fontWeight: style.fontWeight,
                transition: 'all 0.2s ease',
                minWidth: char === ' ' ? '0.5em' : 'auto'
            }}
        >
            {char}
        </motion.span>
    );
};

export default function ChaosText({ text }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {text.split('').map((char, index) => (
                <ChaosChar key={index} char={char} />
            ))}
        </div>
    );
}
