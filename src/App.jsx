import { Suspense, useState, useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import HeroNew from './components/HeroNew';
import IntroSection from './components/IntroSection';
import Timeline from './components/Timeline';
import MarqueeBanner from './components/MarqueeBanner';
import TimeCounter from './components/TimeCounter';
import FallingHearts from './components/FallingHearts';
import ScratchReveal from './components/ScratchReveal';
import LoveLetterNew from './components/LoveLetterNew';
import FooterNew from './components/FooterNew';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const girlfriendName = "Sriya"; // My beautiful Sweety ❤️

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroNew girlfriendName={girlfriendName} />
        {/* IntroSection removed - Merged into HeroNew */}
        <MarqueeBanner />
        <Timeline />

        {/* Gradients added via CSS in index.css (or inline for now) */}
        <div style={{ background: 'linear-gradient(to bottom, #fff, #fff1f2)' }}>
          <TimeCounter />
        </div>

        <div style={{ background: 'linear-gradient(to bottom, #fff1f2, #ffe4e6)' }}>
          <FallingHearts />
        </div>

        <div style={{ background: 'linear-gradient(to bottom, #ffe4e6, #fecdd3)' }}>
          <ScratchReveal />
        </div>

        <LoveLetterNew girlfriendName={girlfriendName} />
        <FooterNew />
      </main>
    </>
  );
}

export default App;
