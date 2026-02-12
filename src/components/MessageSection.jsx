import { motion } from 'framer-motion';
import { MessageCircleHeart } from 'lucide-react';
import './MessageSection.css';

export default function MessageSection({ girlfriendName = "My Love" }) {
    return (
        <section className="message-section section">
            <motion.div
                className="message-container glass"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, type: 'spring' }}
            >
                <motion.div
                    className="message-icon-wrapper"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
                >
                    <MessageCircleHeart className="message-icon" size={50} />
                </motion.div>

                <motion.h2
                    className="message-heading"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    A Note for You
                </motion.h2>

                <motion.div
                    className="message-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <p>Dear {girlfriendName},</p>

                    <p>
                        Every moment with you feels like a dream come true. You bring light to my darkest days
                        and make every ordinary moment extraordinary.
                    </p>

                    <p>
                        Your smile is my favorite view, your laugh is my favorite sound, and your happiness
                        is my biggest priority.
                    </p>

                    <p>
                        Thank you for being you, for choosing me, and for making my life infinitely better
                        just by being in it.
                    </p>

                    <p className="message-signature">
                        Forever yours,<br />
                        <span className="signature-heart">♥</span>
                    </p>
                </motion.div>

                <motion.div
                    className="decorative-hearts"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <span className="deco-heart">♥</span>
                    <span className="deco-heart">♥</span>
                    <span className="deco-heart">♥</span>
                </motion.div>
            </motion.div>
        </section>
    );
}
