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

        const initCanvas = () => {
            if (!container || !canvas) return;

            canvas.width = container.offsetWidth || 300; // Fallback width
            canvas.height = container.offsetHeight || 300; // Fallback height

            const ctx = canvas.getContext('2d');

            // Gradient Cover for nicer look
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#e5e7eb'); // Gray-200
            gradient.addColorStop(0.5, '#d1d5db'); // Gray-300
            gradient.addColorStop(1, '#9ca3af'); // Gray-400

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add scratch instructions
            ctx.font = 'bold 20px serif'; // Use simple font to avoid loading issues
            ctx.fillStyle = '#4b5563'; // Gray-600
            ctx.textAlign = 'center';
            ctx.fillText('Scratch to Reveal!', canvas.width / 2, canvas.height / 2);
        };

        // Small delay to ensure container has size
        const timer = setTimeout(initCanvas, 100);

        window.addEventListener('resize', initCanvas);

        return () => {
            window.removeEventListener('resize', initCanvas);
            clearTimeout(timer);
        };

        let isDrawing = false;

        const startDrawing = (e) => {
            if (e.type === 'touchstart') e.preventDefault(); // Prevent scroll start
            isDrawing = true;
        };
        const stopDrawing = () => isDrawing = false;

        const scratch = (e) => {
            if (!isDrawing || isScratched) return;
            if (e.type === 'touchmove') e.preventDefault(); // Prevent scrolling while scratching

            const rect = canvas.getBoundingClientRect();
            // Handle both mouse and touch events
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            if (!clientX || !clientY) return;

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 35, 0, Math.PI * 2);
            ctx.fill();

            checkScratchPercentage();
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        window.addEventListener('mouseup', stopDrawing);
        window.addEventListener('touchend', stopDrawing);
        canvas.addEventListener('mousemove', scratch);
        canvas.addEventListener('touchmove', scratch, { passive: false });

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
            <h2 className="scratch-title">A Little Secret...</h2>
            <div className="scratch-container" ref={containerRef}>
                <div className="reveal-content">
                    <div className="hidden-text-container">
                        <p className="joke-text">"Nanu, Mama mane padile, tame bohut mana pada!"</p>
                    </div>
                </div>
                <canvas ref={canvasRef} className={`scratch-canvas ${isScratched ? 'fade-out' : ''}`} />

                <AnimatePresence>
                    {emojis.map((emoji) => (
                        <motion.div
                            key={emoji.id}
                            className="evaporating-emoji"
                            style={{ zIndex: 50 }} // Ensure on top of everything
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
