import { useState, useEffect } from 'react';
import './TimeCounter.css';

const TimeCounter = () => {
    const startDate = new Date('2004-01-01T00:00:00'); // Approx LKG start
    const [timeLeft, setTimeLeft] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = now.getTime() - startDate.getTime();

            const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
            const remainingAfterYears = difference % (1000 * 60 * 60 * 24 * 365.25);

            const months = Math.floor(remainingAfterYears / (1000 * 60 * 60 * 24 * 30.44));
            const remainingAfterMonths = remainingAfterYears % (1000 * 60 * 60 * 24 * 30.44);

            const days = Math.floor(remainingAfterMonths / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ years, months, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="time-counter-container">
            <h2 className="counter-title">Time Since LKG</h2>
            <div className="counter-grid">
                <div className="counter-item">
                    <span className="counter-value">{timeLeft.years}</span>
                    <span className="counter-label">Years</span>
                </div>
                <div className="counter-item">
                    <span className="counter-value">{timeLeft.months}</span>
                    <span className="counter-label">Months</span>
                </div>
                <div className="counter-item">
                    <span className="counter-value">{timeLeft.days}</span>
                    <span className="counter-label">Days</span>
                </div>
                <div className="counter-item">
                    <span className="counter-value">{timeLeft.hours}</span>
                    <span className="counter-label">Hours</span>
                </div>
                <div className="counter-item">
                    <span className="counter-value">{timeLeft.minutes}</span>
                    <span className="counter-label">Mins</span>
                </div>
                <div className="counter-item">
                    <span className="counter-value">{timeLeft.seconds}</span>
                    <span className="counter-label">Secs</span>
                </div>
            </div>
            <p className="counter-footer">...and counting every beautiful second</p>
        </div>
    );
};

export default TimeCounter;
