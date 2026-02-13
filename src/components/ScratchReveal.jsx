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
        const container = containerRef.current;

        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');

        const initCanvas = () => {
            canvas.width = container.offsetWidth || 300; // Fallback width
            canvas.height = container.offsetHeight || 300; // Fallback height

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

        let isDrawing = false;

        const startDrawing = (e) => {
            isDrawing = true;
            // Capture pointer to track movement even if it leaves the element
            e.currentTarget.setPointerCapture(e.pointerId);
        };

        const stopDrawing = (e) => {
            isDrawing = false;
            // Release pointer capture
            if (e.currentTarget) {
                e.currentTarget.releasePointerCapture(e.pointerId);
            }
        };

        const scratch = (e) => {
            if (!isDrawing || isScratched) return;

            const rect = canvas.getBoundingClientRect();
            // Pointer events give us clientX/Y directly for both mouse and touch
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

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
            const totalPixels = pixels.length / 4;

            // Optimization: Check every 10th pixel to improve performance
            for (let i = 3; i < pixels.length; i += 40) {
                if (pixels[i] === 0) transparentPixels++;
            }

            // Adjust percentage calculation based on sampled pixels
            const percentage = (transparentPixels / (totalPixels / 10)) * 100;

            // Lower threshold to 30% for easier revealing
            if (percentage > 30 && !isScratched) {
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

        // Pointer Events Listeners (covers Mouse and Touch)
        canvas.addEventListener('pointerdown', startDrawing);
        canvas.addEventListener('pointerup', stopDrawing);
        canvas.addEventListener('pointerleave', stopDrawing);
        canvas.addEventListener('pointermove', scratch);

        return () => {
            window.removeEventListener('resize', initCanvas);
            clearTimeout(timer);

            canvas.removeEventListener('pointerdown', startDrawing);
            canvas.removeEventListener('pointerup', stopDrawing);
            canvas.removeEventListener('pointerleave', stopDrawing);
            canvas.removeEventListener('pointermove', scratch);
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
                <canvas
                    ref={canvasRef}
                    className={`scratch-canvas ${isScratched ? 'fade-out' : ''}`}
                    style={{ touchAction: 'none' }} // Critical for preventing scroll on touch
                />

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
