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

// Single strong pink color from the theme
const themeColor = '#ec4899'; // Pink 500

const ChaosChar = ({ char, fontFamily }) => {
    const [style, setStyle] = useState({
        transform: 'rotate(0deg) scale(1)',
        fontWeight: 400
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStyle({
                transform: `rotate(${Math.random() * 8 - 4}deg) scale(${0.95 + Math.random() * 0.1})`,
                fontWeight: Math.random() > 0.5 ? 700 : 400
            });
        }, 200 + Math.random() * 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.span
            style={{
                display: 'inline-block',
                fontFamily: `"${fontFamily}", sans-serif`,
                color: themeColor,
                transform: style.transform,
                fontWeight: style.fontWeight,
                transition: 'transform 0.2s ease-out', // Only transition transform, not everything
                minWidth: char === ' ' ? '0.5em' : '0.4em',
                textAlign: 'center',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                backfaceVisibility: 'hidden', // Forces clean rendering on some browsers
            }}
        >
            {char}
        </motion.span>
    );
};

export default function ChaosText({ text }) {
    const [currentFont, setCurrentFont] = useState(fonts[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
            setCurrentFont(randomFont);
        }, 400); // Change font every 400ms (all letters together)

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {text.split('').map((char, index) => (
                <ChaosChar key={index} char={char} fontFamily={currentFont} />
            ))}
        </div>
    );
}
