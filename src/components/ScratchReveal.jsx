import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ScratchReveal.css';
import introPic from '../assets/photos/intro_pic.jpeg';

const ScratchReveal = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isScratched, setIsScratched] = useState(false);
    const [emojis, setEmojis] = useState([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const container = containerRef.current;

        // Set canvas size to match container
        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;

            // Fill with "dusty window" / scratch layer
            ctx.fillStyle = '#b4b4b4'; // Dusty grey
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add some texture/pattern to the scratch layer
            ctx.strokeStyle = '#999';
            ctx.lineWidth = 1;
            for (let i = 0; i < 500; i += 20) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i + 50);
                ctx.stroke();
            }

            // Re-fill with text overlay
            ctx.font = '24px Playfair Display';
            ctx.fillStyle = '#666';
            ctx.textAlign = 'center';
            ctx.fillText('Scratch to see a secret...', canvas.width / 2, canvas.height / 2);
        };

        resizeCanvas();

        let isDrawing = false;

        const scratch = (e) => {
            if (!isDrawing || isScratched) return;

            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const y = (e.clientY || e.touches[0].clientY) - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 35, 0, Math.PI * 2);
            ctx.fill();

            checkScratchPercentage();
        };

        const checkScratchPercentage = () => {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let transparentPixels = 0;

            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) transparentPixels++;
            }

            const percentage = (transparentPixels / (pixels.length / 4)) * 100;
            if (percentage > 50 && !isScratched) {
                setIsScratched(true);
                triggerEmojiBurst();
            }
        };

        const triggerEmojiBurst = () => {
            const newEmojis = Array.from({ length: 20 }).map((_, i) => ({
                id: i,
                x: Math.random() * 80 + 10,
                y: Math.random() * 80 + 10,
                type: ['😂', '😆', '🤣', '🔥'][Math.floor(Math.random() * 4)],
                delay: Math.random() * 0.5
            }));
            setEmojis(newEmojis);

            // Auto-hide emojis after 3 seconds
            setTimeout(() => setEmojis([]), 3000);
        };

        const startDrawing = () => isDrawing = true;
        const stopDrawing = () => isDrawing = false;

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('touchstart', startDrawing);
        window.addEventListener('mouseup', stopDrawing);
        window.addEventListener('touchend', stopDrawing);
        canvas.addEventListener('mousemove', scratch);
        canvas.addEventListener('touchmove', scratch);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('touchstart', startDrawing);
            window.removeEventListener('mouseup', stopDrawing);
            window.removeEventListener('touchend', stopDrawing);
            canvas.removeEventListener('mousemove', scratch);
            canvas.removeEventListener('touchmove', scratch);
        };
    }, [isScratched]);

    return (
        <div className="scratch-reveal-section">
            <h2 className="scratch-title">A Window to Us</h2>
            <div className="scratch-container" ref={containerRef}>
                <div className="reveal-content">
                    <div className="hidden-text-container">
                        <p className="joke-text">"Nanu, Mama mane padile, tame bohut mana pada!"</p>
                        <div className="joke-decoration">😂🤫</div>
                    </div>
                </div>
                <canvas ref={canvasRef} className={`scratch-canvas ${isScratched ? 'fade-out' : ''}`} />

                <AnimatePresence>
                    {emojis.map((emoji) => (
                        <motion.div
                            key={emoji.id}
                            className="evaporating-emoji"
                            initial={{ opacity: 1, y: `${emoji.y}%`, x: `${emoji.x}%`, scale: 0 }}
                            animate={{ opacity: 0, y: `${emoji.y - 40}%`, scale: 2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2.5, delay: emoji.delay, ease: "easeOut" }}
                        >
                            {emoji.type}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ScratchReveal;
